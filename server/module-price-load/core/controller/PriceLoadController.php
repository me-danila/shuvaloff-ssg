<?php declare(strict_types=1);

namespace ModulePriceLoad\controller;

require_once __DIR__ . '/../configs/configs.php';
require_once __DIR__ . '/../handlers/error-handler.php';
require_once __DIR__ . '/../handlers/autoloader.php';

use ModulePriceLoad\models\Hotel;
use ModulePriceLoad\models\Settings;
use ModulePriceLoad\services\Api\ChannelDistributionApi\HotelAvailability\HotelAvailability;
use ModulePriceLoad\services\Api\ChannelDistributionApi\HotelInfo\HotelInfo;
use ModulePriceLoad\services\Api\ChannelDistributionApi\RatePlanBookingRules\RatePlanBookingRules;
use ModulePriceLoad\services\DataManagement\DataManagementService;
use ModulePriceLoad\utils\Logger;
use ModulePriceLoad\utils\Messages;
use ModulePriceLoad\utils\Tools;

class PriceLoadController
{
    private const CURRENCY_LOG = 'Starting upload for currency: ';
    private const HOTEL_LOG = 'Starting upload for hotel ID: ';

    private $settings;
    private $currentHotel;
    private $dataManagementService;
    private $logger;
    private $currentHotelCode;
    private $currentCurrency;
    private $hotelPrices = [];

    public function __construct(array $hotelSettings)
    {
        $this->settings = new Settings($hotelSettings);
        $this->dataManagementService = new DataManagementService();
        $this->logger = new Logger();
    }

    public function init(): bool
    {
        Messages::debugModeWarning();

        $this->logger->startWork();

        try {
            $this->settings->init();

            if ($this->dataManagementService->isAvailableToUpdate()) {
                $this->loadDataFromApi();
                $this->getDataFromCache();
                $this->saveData();

                return $this->exit();
            } else {
                return $this->exit(
                    Messages::FRESH_DATA_MESSAGE,
                    Messages::E_NOTICE
                );
            }
        } catch (\RuntimeException $error) {
            return $this->exit(
                $error->getMessage(),
                Messages::E_ERROR
            );
        }
    }

    private function getDataFromCache(): void
    {
        if ($this->settings->isCacheEnable()) {
            $this->hotelPrices = $this->dataManagementService->getData(
                $this->hotelPrices,
                $this->settings->getHotelCodes()
            );
        }
    }

    private function loadDataFromApi(): void
    {
        foreach ($this->settings->getHotelCodes() as $hotelCode) {
            Logger::logConsole(self::HOTEL_LOG . $hotelCode);

            $this->currentHotelCode = $hotelCode;
            $this->currentHotel = new Hotel($hotelCode);

            $this->settings->forEachCurrency(function ($currency, $isBaseCurrency) {
                Logger::logConsole(self::CURRENCY_LOG . $currency);

                $this->currentCurrency = $currency;

                if ($isBaseCurrency) {
                    $this->loadPrices();
                } else {
                    $this->updatePrices();
                }
            });

            $this->currentHotel->sortCapacities();
            $this->currentHotel->fillEmptyCapacitiesAfterLoad();
            $this->setHotelPrices();
        }
    }

    private function loadPrices(): void
    {
        $this->loadHotelInfo();
        $this->loadAvailableDates();
        $this->loadPricesByDates();
    }

    private function updatePrices(): void
    {
        $this->currentHotel->setMinDates();
        $this->updatePricesByDates();
    }

    private function loadHotelInfo(): void
    {
        $hotelInfoApi = new HotelInfo($this->settings, $this->currentHotel);
        $hotelInfoApi->setRoomTypes();
        $hotelInfoApi->setRates($this->settings->getRequiredRatePlans());
    }

    private function loadAvailableDates(): void
    {
        $ratePlanBookingRules = new RatePlanBookingRules($this->settings, $this->currentHotel);
        $ratePlanBookingRules->setAvailableDates();
    }

    private function collectDatePeriods(): void
    {
        for ($minLos = Settings::MIN_MINLOS; $minLos <= $this->settings->getMinLosLimit(); $minLos++) {
            $startDate = $this->settings->getStartTomorrow()
                ? Tools::addDaysToDate(1)
                : Tools::formatDate();

            for ($day = 0; $day <= $this->settings->getDays() - $minLos; $day++) {
                $endDate = Tools::addDaysToDate($minLos, $startDate);
                $this->currentHotel->setAvailablePeriod($startDate, $endDate);
                $startDate = Tools::addDaysToDate(1, $startDate);
            }
        }
    }

    private function loadPricesByDates(): void
    {
        $this->getPricesByDates($this->currentHotel->getAvailablePeriods());
    }

    private function updatePricesByDates(): void
    {
        $this->getPricesByDates($this->currentHotel->getMinDates());
    }

    private function getPricesByDates(array $periods): void
    {
        $hotelAvailabilityApi = new HotelAvailability(
            $this->settings,
            $this->currentHotel,
            $periods,
            $this->currentCurrency
        );

        $hotelAvailabilityApi->setPrices();
    }

    private function setHotelPrices(): void
    {
        $this->hotelPrices[$this->currentHotelCode] = $this->currentHotel;
    }

    private function saveData(): void
    {
        $this->dataManagementService->saveData($this->hotelPrices);
    }

    private function exit(string $message = '', string $errorLevel = ''): bool
    {
        $this->logger->endWork();
        $this->logger->setWorkStatus($message, $errorLevel);
        return true;
    }
}
