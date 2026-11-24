// Bound script for the private ACADEMIA × Посейдон spreadsheet.
const spreadsheetId = '1C6YkSo6kYiXZLS3MGANannA_IAfuxwnhfAQBoqerccY';
const endpoint = 'https://academia-shuvaloff.ru/api/poseidon.php';
const headers = ['ID заявки', 'Дата и время (МСК)', 'Имя', 'Телефон', 'Email', 'Согласие на рассылку'];

function installPoseidonSync() {
    if (SpreadsheetApp.getActiveSpreadsheet().getId() !== spreadsheetId) {
        throw new Error('Откройте Apps Script из таблицы ACADEMIA × Посейдон.');
    }
    const properties = PropertiesService.getScriptProperties();
    const key = properties.getProperty('inboxToken') || Utilities.getUuid() + Utilities.getUuid();
    properties.setProperty('inboxToken', key);
    const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, key);
    const fingerprint = digest.map(byte => (byte & 255).toString(16).padStart(2, '0')).join('');
    // Only this public fingerprint is needed to authorize the script on the site.
    SpreadsheetApp.getActiveSpreadsheet().getSheetById(778083106).getRange('A1')
        .setNote('SHA-256: ' + fingerprint);
    if (!ScriptApp.getProjectTriggers().some(trigger => trigger.getHandlerFunction() === 'syncPoseidon')) {
        ScriptApp.newTrigger('syncPoseidon').timeBased().everyMinutes(5).create();
    }
}

function inboxRequest(payload, key) {
    const response = UrlFetchApp.fetch(endpoint, {
        method: 'post',
        contentType: 'application/json',
        headers: {'X-Poseidon-Token': key},
        payload: JSON.stringify(payload),
        followRedirects: false,
        muteHttpExceptions: true,
    });
    if (response.getResponseCode() !== 200) {
        throw new Error('Сайт вернул HTTP ' + response.getResponseCode());
    }
    return JSON.parse(response.getContentText());
}

function syncPoseidon() {
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(1000)) return;
    try {
        const key = PropertiesService.getScriptProperties().getProperty('inboxToken');
        const {rows} = inboxRequest({action: 'pull'}, key);
        if (!rows.length) return;
        const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetById(778083106);
        const titles = sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0];
        if (headers.some((title, i) => titles[i] !== title)) throw new Error('Проверьте заголовки листа «Заявки».');
        const last = sheet.getLastRow();
        const known = new Set(last > 1 ? sheet.getRange(2, 1, last - 1, 1).getDisplayValues().flat() : []);
        const values = rows.filter(row => !known.has(row.id)).map(row => [
            row.id, Utilities.formatDate(new Date(row.receivedAt), 'Europe/Moscow', 'yyyy-MM-dd HH:mm:ss'),
            row.name, row.phone, row.email, row.consentAds ? 'Да' : 'Нет',
        ]);
        if (values.length) {
            if (last + values.length > sheet.getMaxRows()) {
                sheet.insertRowsAfter(sheet.getMaxRows(), last + values.length - sheet.getMaxRows());
            }
            // Literal text keeps the phone prefix and prevents user input becoming a formula.
            const cells = values.map(row => row.map(text => SpreadsheetApp.newRichTextValue().setText(text).build()));
            sheet.getRange(last + 1, 1, cells.length, headers.length).setRichTextValues(cells);
            SpreadsheetApp.flush();
        }
        inboxRequest({action: 'ack', ids: rows.map(row => row.id)}, key);
    } finally {
        lock.releaseLock();
    }
}
