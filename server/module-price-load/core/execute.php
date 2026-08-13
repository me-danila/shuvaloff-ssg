<?php declare(strict_types=1);

require_once __DIR__ . '/controller/PriceLoadController.php';
use ModulePriceLoad\controller\PriceLoadController;

$hotelSettings = include(__DIR__ . '/settings/settings.php');
$priceLoadController = new PriceLoadController($hotelSettings);
$priceLoadController->init();
