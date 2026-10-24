// Маска российского телефона «+7 (999) 999-99-99» без сторонних библиотек.
// Код страны +7 фиксирован: пользователь вводит только 10 цифр номера.

export const RU_PHONE_PREFIX = "+7 (";
export const RU_PHONE_MAX_LENGTH = "+7 (999) 999-99-99".length;

/** 10 цифр номера без кода страны из любого ввода (набор, вставка 8…/+7…). */
export const getRuPhoneDigits = (raw: string): string => {
    let digits = raw.replace(/\D/g, "");
    // Значение поля начинается с «+7» — эта семерка не часть номера.
    if (raw.trimStart().startsWith("+7")) digits = digits.slice(1);
    // Вставили номер целиком: 8XXXXXXXXXX или 7XXXXXXXXXX.
    if (digits.length > 10 && /^[78]/.test(digits)) digits = digits.slice(1);
    return digits.slice(0, 10);
};

export const formatRuPhone = (digits: string): string => {
    let out = RU_PHONE_PREFIX + digits.slice(0, 3);
    if (digits.length > 3) out += `) ${digits.slice(3, 6)}`;
    if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
    if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
    return out;
};

/**
 * Новое значение поля после ввода. Если пользователь стер символ маски
 * («)», пробел, дефис), цифры не изменились бы и маска вернула бы символ
 * обратно — в этом случае стираем последнюю цифру.
 */
export const nextRuPhoneValue = (prev: string, raw: string): string => {
    let digits = getRuPhoneDigits(raw);
    if (raw.length < prev.length && digits === getRuPhoneDigits(prev)) {
        digits = digits.slice(0, -1);
    }
    return formatRuPhone(digits);
};

export const isRuPhoneComplete = (value: string): boolean =>
    getRuPhoneDigits(value).length === 10;
