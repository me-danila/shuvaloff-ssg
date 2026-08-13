<?php declare(strict_types=1);

namespace ModulePriceLoad\services\Api\ChannelDistributionApi\RatePlanBookingRules;

use ModulePriceLoad\models\Hotel;
use ModulePriceLoad\models\DatePeriod;
use ModulePriceLoad\models\Settings;
use ModulePriceLoad\prototype\ApiServiceAbstract;
use ModulePriceLoad\utils\Logger;
use ModulePriceLoad\utils\Tools;
use ModulePriceLoad\utils\Loader;

class RatePlanBookingRules extends ApiServiceAbstract
{
    private const API_NAME = 'ChannelDistributionApi';
    private const METHOD_NAME = '/AvailabilityCalendar/rate_plan_booking_rules';
    private const RATE_PLAN_LIMIT = 10; /* not because of API limits */

    private $hotelCode;
    private $days;
    private $minLosLimit;
    private $ratePlanCodes;
    private $startDate;
    private $endDate;

    public function __construct(Settings $settings, Hotel $hotelModel)
    {
        $this->hotelCode = $hotelModel->getHotelCode();
        $this->days = $settings->getDays();
        $this->minLosLimit = $settings->getMinLosLimit();
        $this->ratePlanCodes = $hotelModel->getRatePlans();

        $this->startDate = $settings->getStartTomorrow()
            ? Tools::addDaysToDate(1, $settings->getPricesAvailableDate())
            : Tools::formatDate($settings->getPricesAvailableDate());

        $this->endDate = $settings->getStartTomorrow()
            ? Tools::addDaysToDate($this->days + 1, $settings->getPricesAvailableDate())
            : Tools::addDaysToDate($this->days, $settings->getPricesAvailableDate());

        parent::__construct($settings, $hotelModel, self::METHOD_NAME);
    }

    public function setAvailableDates(): void
    {
        $datePeriods = [];

        foreach ($this->responses as $response) {
            if (isset($response['booking_rules']) && is_array($response['booking_rules'])) {
                foreach ($response['booking_rules'] as $bookingRule) {
                    $isForbidden = $this->isForbidden($bookingRule);
                    $minLos = $this->getMinLos($bookingRule);
                    $arrivalDate = $this->getArrivalDate($bookingRule);
                    $hasRoomTypes = $this->hasRoomTypes($bookingRule);

                    $isAvailable = !$isForbidden && $hasRoomTypes;

                    if ($isAvailable && ($this->minLosLimit === 0 || $minLos <= $this->minLosLimit)) {
                        $departureDate = ($minLos)
                            ? Tools::addDaysToDate($minLos, $arrivalDate)
                            : Tools::addDaysToDate(1, $arrivalDate);

                        if ($departureDate <= $this->endDate) {
                            $datePeriods[] = new DatePeriod($arrivalDate, $departureDate);
                        }
                    }
                }
            }
        }

        $this->hotelModel->setAvailablePeriods(Tools::uniqueArrayItems($datePeriods));
    }

    protected function collectUrls(): array
    {
        $urls = [];
        $ratesPackages = array_chunk($this->ratePlanCodes, self::RATE_PLAN_LIMIT);

        foreach ($ratesPackages as $ratesPackage) {
            $ratePlanParams = '';

            foreach ($ratesPackage as $index => $rateCode) {
                $ratePlanParams .= $this->getRatePlanParams($index, $rateCode);
            }

            $urls[] = $this->getUrl($ratePlanParams);
        }

        return $urls;
    }

    protected function getUrl(string $ratePlanParams): string
    {
        return $this->host . self::API_NAME . self::METHOD_NAME
            . "?hotel=" . $this->hotelCode
            . "&start_date=" . $this->startDate
            . "&end_date=" . Tools::addDaysToDate($this->days, $this->startDate)
            . $ratePlanParams;
    }

    private function getRatePlanParams(int $index, int $rateCode): string
    {
        return "&rate_plans%5B{$index}%5D.code={$rateCode}";
    }

    private function isForbidden(array $bookingRule): bool
    {
        return isset($bookingRule['forbidden']) && $bookingRule['forbidden'] === true;
    }

    private function getMinLos(array $bookingRule): ?int
    {
        return isset($bookingRule['min_los']) ? (int)$bookingRule['min_los'] : null;
    }

    private function getRatePlan(array $bookingRule): int
    {
        return (int)$bookingRule['code'];
    }

    private function getArrivalDate(array $bookingRule): string
    {
        return $bookingRule['date'];
    }

    private function hasRoomTypes(array $bookingRule): bool
    {
        return isset($bookingRule['room_types']);
    }
}
