<?php declare(strict_types=1);

namespace ModulePriceLoad\services\Api\ChannelDistributionApi\HotelAvailability;

use ModulePriceLoad\models\Hotel;
use ModulePriceLoad\models\DatePeriod;
use ModulePriceLoad\models\Settings;
use ModulePriceLoad\prototype\ApiServiceAbstract;
use ModulePriceLoad\utils\Logger;
use ModulePriceLoad\utils\Tools;
use ModulePriceLoad\utils\Loader;

class HotelAvailability extends ApiServiceAbstract
{
    private const API_NAME = 'ChannelDistributionApi';
    private const METHOD_NAME = '/BookingForm/hotel_availability';
    private const PRICE_ROUNDING_PRECISION = 2;
    private const INCLUDE_RATES = 'true';
    private const INCLUDE_TRANSFER = 'false';
    private const INCLUDE_ALL_PLACEMENT = 'true';
    private const INCLUDE_PROMO_RESTRICTED = 'false';
    private const LANGUAGE = 'en-US'; /* may be ignored */
    private const PROPERTIES_LIMIT = 3; /* max 10 */

    private $hotelCode;
    private $currency;
    private $periods;
    private $ratePlanCodes;

    public function __construct(Settings $settings, Hotel $hotelModel, array $periods, string $currency)
    {
        $this->hotelCode = $hotelModel->getHotelCode();
        $this->periods = $periods;
        $this->currency = $currency;
        $this->ratePlanCodes = $hotelModel->getRatePlans();
        parent::__construct($settings, $hotelModel, self::METHOD_NAME);
    }

    public function setPrices(): void
    {
        foreach ($this->responses as $response) {
            if (empty($response['room_stays'])) {
                continue;
            }

            foreach ($response['room_stays'] as $roomStay) {
                $roomType = $this->getRoomType($roomStay);
                $startDate = $this->getStartDate($roomStay);
                $capacity = $this->getCapacity($roomStay);
                $price = $this->getPrice($roomStay);
                $discountPrice = $this->getDiscountPrice($roomStay);
                $minLos = $this->getMinLos($roomStay);
                $ratePlan = $this->getRatePlan($roomStay);

                if (in_array($ratePlan, $this->ratePlanCodes, true)) {
                    $pricePerDay = round($price / $minLos, self::PRICE_ROUNDING_PRECISION, PHP_ROUND_HALF_DOWN);

                    $this->setCapacityPrice($roomType, $startDate, $capacity, $pricePerDay, $minLos, $ratePlan);
                    $this->setMinPrice($roomType, $startDate, $pricePerDay, $minLos, $ratePlan);
                    $this->setHotelMinPrice($startDate, $pricePerDay, $minLos, $ratePlan);

                    if ($discountPrice !== null) {
                        $discountPricePerDay = round($discountPrice / $minLos, self::PRICE_ROUNDING_PRECISION, PHP_ROUND_HALF_DOWN);

                        $this->setCapacityDiscountPrice($roomType, $startDate, $capacity, $discountPricePerDay, $minLos, $ratePlan);
                        $this->setMinDiscountPrice($roomType, $startDate, $discountPricePerDay, $minLos, $ratePlan);
                        $this->setHotelMinDiscountPrice($startDate, $discountPricePerDay, $minLos, $ratePlan);
                    }

                    $extraPlacementPrice = $this->getExtraPlacementPrice($roomStay);
                    if ($extraPlacementPrice !== null) {
                        $extraPlacementPricePerDay = round($extraPlacementPrice / $minLos, self::PRICE_ROUNDING_PRECISION, PHP_ROUND_HALF_DOWN);
                        $this->setExtraPlacementPrice($roomType, $startDate, $extraPlacementPricePerDay, $minLos, $ratePlan);
                    }
                }
            }
        }
    }

    protected function collectUrls(): array
    {
        $urls = [];
        $periodPackages = array_chunk($this->periods, self::PROPERTIES_LIMIT);

        foreach ($periodPackages as $periodPackage) {
            $dateUrlParams = '';

            foreach ($periodPackage as $index => $period) {
                $dateUrlParams .= $this->getDateParams($index, $period);
            }

            $urls[] = $this->getUrl($dateUrlParams);
        }

        return $urls;
    }

    protected function getUrl(string $dateUrlParams): string
    {
        return $this->host . self::API_NAME . self::METHOD_NAME
            . '?include_rates=' . self::INCLUDE_RATES
            . '&include_transfers=' . self::INCLUDE_TRANSFER
            . '&include_all_placements=' . self::INCLUDE_ALL_PLACEMENT
            . '&include_promo_restricted=' . self::INCLUDE_PROMO_RESTRICTED
            . '&language=' . self::LANGUAGE
            . '&currency=' . $this->currency
            . $dateUrlParams;
    }

    private function getDateParams(int $index, DatePeriod $period): string
    {
        $dateUrlParams = "&criterions%5B{$index}%5D.hotels%5B0%5D.code={$this->hotelCode}";
        $dateUrlParams .= "&criterions%5B{$index}%5D.dates={$this->hotelModel->getStartDatePeriod($period)}%3B{$this->hotelModel->getEndDatePeriod($period)}";

        return $dateUrlParams;
    }

    private function setCapacityPrice(int $roomType, string $startDate, int $capacity, float $price, int $minLos, int $ratePlanCode): void
    {
        $oldCapacityPrice = $this->hotelModel->getPrice(
            $roomType,
            $capacity,
            $this->currency
        );

        if ($oldCapacityPrice === null || $price < $oldCapacityPrice) {
            $this->hotelModel->setPrice(
                $roomType,
                $capacity,
                $price,
                $this->currency,
                $startDate,
                $minLos,
                $ratePlanCode
            );
        }
    }

    private function setCapacityDiscountPrice(int $roomType, string $startDate, int $capacity, float $discountPrice, int $minLos, int $ratePlanCode): void
    {
        $oldCapacityDiscountPrice = $this->hotelModel->getDiscountPrice(
            $roomType,
            $capacity,
            $this->currency
        );

        if ($oldCapacityDiscountPrice === null || $discountPrice < $oldCapacityDiscountPrice) {
            $this->hotelModel->setDiscountPrice(
                $roomType,
                $capacity,
                $discountPrice,
                $this->currency,
                $startDate,
                $minLos,
                $ratePlanCode
            );
        }
    }

    private function setMinPrice(int $roomType, string $startDate, float $price, int $minLos, int $ratePlanCode): void
    {
        $oldMinPrice = $this->hotelModel->getMinPrice($roomType, $this->currency);

        if ($oldMinPrice === null || $price < $oldMinPrice) {
            $this->hotelModel->setMinPrice(
                $roomType,
                $price,
                $this->currency,
                $startDate,
                $minLos,
                $ratePlanCode
            );
        }
    }

    private function setMinDiscountPrice(int $roomType, string $startDate, float $discountPrice, int $minLos, int $ratePlanCode): void
    {
        $oldMinDiscountPrice = $this->hotelModel->getMinDiscountPrice($roomType, $this->currency);

        if ($oldMinDiscountPrice === null || $discountPrice < $oldMinDiscountPrice) {
            $this->hotelModel->setMinDiscountPrice(
                $roomType,
                $discountPrice,
                $this->currency,
                $startDate,
                $minLos,
                $ratePlanCode
            );
        }
    }

    private function setHotelMinPrice(string $startDate, float $price, int $minLos, int $ratePlanCode): void
    {
        $oldMinPrice = $this->hotelModel->getHotelMinPrice($this->currency);

        if ($oldMinPrice === null || $price < $oldMinPrice) {
            $this->hotelModel->setHotelMinPrice(
                $price,
                $this->currency,
                $startDate,
                $minLos,
                $ratePlanCode
            );
        }
    }

    private function setHotelMinDiscountPrice(string $startDate, float $discountPrice, int $minLos, int $ratePlanCode): void
    {
        $oldMinDiscountPrice = $this->hotelModel->getHotelMinDiscountPrice($this->currency);

        if ($oldMinDiscountPrice === null || $discountPrice < $oldMinDiscountPrice) {
            $this->hotelModel->setHotelMinDiscountPrice(
                $discountPrice,
                $this->currency,
                $startDate,
                $minLos,
                $ratePlanCode
            );
        }
    }

    private function getPrice(array $roomStay): float
    {
        return (float)$roomStay['total']['price_after_tax'];
    }

    private function getDiscountPrice(array $roomStay): ?float
    {
        if (isset($roomStay['loyalty_closed_total']['price_after_tax'])) {
            return (float)$roomStay['loyalty_closed_total']['price_after_tax'];
        }

        return null;
    }

    private function getRoomType(array $roomStay): int
    {
        return (int)$roomStay['room_types'][0]['code'];
    }

    private function getStartDate(array $roomStay): string
    {
        return Tools::formatDate($roomStay['stay_dates']['start_date']);
    }

    private function getCapacity(array $roomStay): int
    {
        return count($roomStay['guests']);
    }

    private function getMinLos(array $roomStay): int
    {
        return Tools::getDatesDiffInDays(
            $roomStay['stay_dates']['start_date'],
            $roomStay['stay_dates']['end_date']
        );
    }

    private function getRatePlan(array $roomStay): int
    {
        return (int)$roomStay['rate_plans'][0]['code'];
    }

    private function getExtraPlacementPrice(array $roomStay): ?float
    {
        if (!isset($roomStay['room_types'][0]['placements'])) {
            return null;
        }

        foreach ($roomStay['room_types'][0]['placements'] as $placement) {
            if (isset($placement['kind']) && $placement['kind'] === 'extra_adult') {
                return (float)$placement['price_after_tax'];
            }
        }

        return null;
    }

    private function setExtraPlacementPrice(int $roomType, string $startDate, float $price, int $minLos, int $ratePlanCode): void
    {
        $oldExtraPlacementPrice = $this->hotelModel->getExtraPlacementPrice($roomType, $this->currency);

        if ($oldExtraPlacementPrice === null || $price < $oldExtraPlacementPrice) {
            $this->hotelModel->setExtraPlacementPrice(
                $roomType,
                $price,
                $this->currency,
                $startDate,
                $minLos,
                $ratePlanCode
            );
        }
    }
}
