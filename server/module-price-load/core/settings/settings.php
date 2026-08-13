<?php declare(strict_types=1);

$api = json_decode(file_get_contents(__DIR__ . '/common/api.json'), true);
$hotels = json_decode(file_get_contents(__DIR__ . '/common/hotels.json'), true);
$basicSettings = json_decode(file_get_contents(__DIR__ . '/common/basic.json'), true);
$extraSettings = json_decode(file_get_contents(__DIR__ . '/common/extra.json'), true);

return array_merge($api, $hotels, $basicSettings, $extraSettings);
