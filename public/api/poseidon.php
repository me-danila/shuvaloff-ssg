<?php
declare(strict_types=1);

// Google confirms each batch only after the rows have been written to Sheets.
const INBOX = '/var/lib/academia-shuvaloff/poseidon';
const BATCH_SIZE = 50;
const ID_PATTERN = '/^[0-9]{13}-[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/D';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
ini_set('display_errors', '0');
umask(0077);

function reply(int $status, array $payload = []): never {
    http_response_code($status);
    echo json_encode($payload, JSON_THROW_ON_ERROR);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405);
}
if (explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0] !== 'application/json') {
    reply(415);
}
$body = file_get_contents('php://input', false, null, 0, 8193);
if ($body === false || strlen($body) > 8192) reply(413);
$data = json_decode($body, true);
if (!is_array($data)) reply(400);

try {
    $action = $data['action'] ?? 'submit';
    if ($action !== 'submit') {
        $hashFile = INBOX . '/sync.sha256';
        $token = $_SERVER['HTTP_X_POSEIDON_TOKEN'] ?? '';
        if ($token === '' || !is_file($hashFile)
            || !hash_equals(trim(file_get_contents($hashFile)), hash('sha256', $token))) reply(403);
        if ($action !== 'pull' && $action !== 'ack') reply(400);
    } else {
        if (($_SERVER['HTTP_ORIGIN'] ?? '') !== 'https://academia-shuvaloff.ru') reply(403);
        foreach (['id', 'name', 'phone', 'email'] as $field) {
            if (!is_string($data[$field] ?? null)) reply(422);
        }
        if (!preg_match(ID_PATTERN, $data['id'])
            || trim($data['name']) === '' || mb_strlen($data['name']) > 100
            || !preg_match('/^\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/D', $data['phone'])
            || mb_strlen($data['email']) > 120 || !preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/uD', $data['email'])
            || ($data['consentData'] ?? null) !== true || !is_bool($data['consentAds'] ?? null)
            || ($data['botcheck'] ?? null) !== false) reply(422);
    }

    $dir = INBOX . '/pending';
    $lock = fopen($dir . '/.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) reply(503);

    if ($action === 'ack') {
        $ids = $data['ids'] ?? null;
        if (!is_array($ids) || count($ids) > BATCH_SIZE) reply(422);
        foreach ($ids as $id) {
            if (!is_string($id) || !preg_match(ID_PATTERN, $id)) reply(422);
        }
        foreach ($ids as $id) {
            $path = "$dir/$id.json";
            if (is_file($path) && !unlink($path)) reply(503);
        }
    } elseif ($action === 'pull') {
        $rows = [];
        foreach (array_slice(glob("$dir/*.json") ?: [], 0, BATCH_SIZE) as $path) {
            $rows[] = json_decode(file_get_contents($path), true, 8, JSON_THROW_ON_ERROR);
        }
        reply(200, ['rows' => $rows]);
    } else {
        $entry = array_intersect_key($data, array_flip(['id', 'name', 'phone', 'email', 'consentAds']));
        $path = "$dir/{$entry['id']}.json";
        if (!is_file($path)) {
            if (count(glob("$dir/*.json") ?: []) >= 10000) reply(503);
            $entry['receivedAt'] = gmdate(DATE_ATOM);
            $json = json_encode($entry, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
            $temp = "$dir/.incoming";
            if (file_put_contents($temp, $json) !== strlen($json) || !rename($temp, $path)) reply(503);
        } else {
            $existing = json_decode(file_get_contents($path), true, 8, JSON_THROW_ON_ERROR);
            unset($existing['receivedAt']);
            if ($existing != $entry) reply(409);
        }
    }
    reply(200, ['ok' => true]);
} catch (Throwable $error) {
    reply(503);
}
