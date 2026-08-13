<?php declare(strict_types=1);

namespace ModulePriceLoad\models;

use ModulePriceLoad\models\Price;
use ModulePriceLoad\models\DatePeriod;
use ModulePriceLoad\models\RoomType;
use ModulePriceLoad\utils\Logger;
use ModulePriceLoad\utils\Tools;

class Hotel
{
    private $hotelCode;
    private $roomTypes = [];
    private $ratePlans = [];
    private $availableDates = [];
    private $minDatePeriods = [];
    private $prices;
    private $hotelMinPrice;
    private $hotelMinDiscountPrice;
    private $host;

    public function __construct(int $hotelCode)
    {
        $this->hotelCode = $hotelCode;
    }

    public function getInfo(): void
    {
        echo '<pre>';
        print_r($this->hotelCode);
        echo '<pre>';
        echo '<pre>';
        print_r($this->roomTypes);
        echo '<pre>';
        echo '<pre>';
        print_r($this->ratePlans);
        echo '<pre>';
        echo '<pre>';
        print_r($this->availableDates);
        echo '<pre>';
        echo '<pre>';
        print_r($this->minDatePeriods);
        echo '<pre>';
        echo '<pre>';
        print_r($this->prices);
        echo '<pre>';
        die();
    }

    public function getHotelCode(): int
    {
        return $this->hotelCode;
    }

    public function setRoomTypes(array $roomTypes): void
    {
        $this->roomTypes = $roomTypes;
        $this->setEmptyPrices();
        Logger::logModelData($this->roomTypes, $this->hotelCode, 'rooms');
    }

    public function getRoomTypes(): array
    {
        Logger::logModelData($this->roomTypes, $this->hotelCode, 'rooms');
        return $this->roomTypes;
    }

    public function setRatePlans(array $ratePlans): void
    {
        $this->ratePlans = $ratePlans;
    }

    public function getRatePlans(): array
    {
        Logger::logModelData($this->ratePlans, $this->hotelCode, 'rates');
        return array_keys($this->ratePlans);
    }

    public function setAvailablePeriods(array $datePeriods): void
    {
        $this->availableDates = $datePeriods;
    }

    public function setAvailablePeriod(string $startDate, string $endDate): void
    {
        $this->availableDates[] = new DatePeriod($startDate, $endDate);
    }

    public function getAvailablePeriods(): array
    {
        Logger::logModelData($this->availableDates, $this->hotelCode, 'available_periods');
        return $this->availableDates;
    }

    public function getStartDatePeriod(DatePeriod $datePeriod): string
    {
        return $datePeriod->getStartDate();
    }

    public function getEndDatePeriod(DatePeriod $datePeriod): string
    {
        return $datePeriod->getEndDate();
    }

    public function setHotelMinPrice(float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->hotelMinPrice->setPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function setHotelMinDiscountPrice(float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->hotelMinDiscountPrice->setPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function getHotelMinPrice(string $currency): ?float
    {
        return $this->hotelMinPrice->getPrice($currency);
    }

    public function getHotelMinDiscountPrice(string $currency): ?float
    {
        return $this->hotelMinDiscountPrice->getPrice($currency);
    }

    public function setMinPrice(int $roomType, float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->prices[$roomType]->setMinPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function setMinDiscountPrice(int $roomType, float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->prices[$roomType]->setMinDiscountPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function getMinPrice(int $roomType, string $currency): ?float
    {
        return $this->prices[$roomType]->getMinPrice($currency);
    }

    public function getMinDiscountPrice(int $roomType, string $currency): ?float
    {
        return $this->prices[$roomType]->getMinDiscountPrice($currency);
    }

    public function setPrice(int $roomType, int $capacity, float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->prices[$roomType]->setPrice($capacity, $price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function setDiscountPrice(int $roomType, int $capacity, float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->prices[$roomType]->setDiscountPrice($capacity, $price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function getPrice(int $roomType, int $capacity, string $currency): ?float
    {
        return $this->prices[$roomType]->getPrice($capacity, $currency);
    }

    public function getDiscountPrice(int $roomType, int $capacity, string $currency): ?float
    {
        return $this->prices[$roomType]->getDiscountPrice($capacity, $currency);
    }

    public function setExtraPlacementPrice(int $roomType, float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->prices[$roomType]->setExtraPlacementPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function getExtraPlacementPrice(int $roomType, string $currency): ?float
    {
        return $this->prices[$roomType]->getExtraPlacementPrice($currency);
    }

    public function setHost(string $host): void
    {
        $this->host = $host;
    }

    public function getHost(): ?string
    {
        return $this->host;
    }

    public function getRoomTypeInfo(int $roomType): RoomType
    {
        return $this->prices[$roomType];
    }

    public function setMinDates(): void
    {
        if (!empty($this->minDatePeriods)) {
            return;
        }

        foreach ($this->prices as $roomTypeModel) {
            $capacityPrices = $roomTypeModel->getCapacities();

            if ($capacityPrices === null) continue;

            foreach ($capacityPrices as $capacityPriceInfo) {
                $startDate = $capacityPriceInfo->getDate();
                $minLos = $capacityPriceInfo->getMinLos();
                $endDate = Tools::addDaysToDate($minLos, $startDate);

                $this->minDatePeriods[] = new DatePeriod($startDate, $endDate);
            }
        }

        $this->minDatePeriods = Tools::uniqueArrayItems($this->minDatePeriods);
    }

    public function getMinDates(): array
    {
        Logger::logModelData($this->minDatePeriods, $this->hotelCode, 'min_dates');
        return $this->minDatePeriods;
    }

    public function sortCapacities(): void
    {
        foreach ($this->prices as $roomTypeCode => $roomTypeModel) {
            if ($roomTypeModel->getCapacities()) {
                $roomTypeModel->sortCapacities();
            }
        }
    }

    public function fillEmptyCapacitiesAfterLoad(): void
    {
        foreach ($this->prices as $roomTypeCode => $roomTypeModel) {
            $currentCapacity = 1;
            $capacities = $roomTypeModel->getCapacities();

            if (is_array($capacities)) {
                foreach ($capacities as $capacity => $priceModel) {
                    $capacity = (int)$capacity;

                    if ($capacity !== $currentCapacity) {
                        for (
                            $index = $currentCapacity;
                            $index < $capacity;
                            $index++
                        ) {
                            foreach ($priceModel->getPriceValues() as $currency => $priceValue) {
                                $this->setPrice(
                                    $roomTypeCode,
                                    $index,
                                    $priceValue,
                                    $currency,
                                    $priceModel->getDate(),
                                    $priceModel->getMinLos(),
                                    $priceModel->getRatePlanCode(),
                                    $priceModel->getRestoreStatus(),
                                    true
                                );
                            }
                        }
                    }

                    $currentCapacity = $capacity + 1;
                }
            }
        }
    }

    public function export(): array
    {
        $prices = [];

        $prices['hotelMinPrice'] = null;
        $prices['hotelMinDiscountPrice'] = null;

        if ($this->hotelMinPrice->getPriceValues()) {
            $hotelMinLosMinPrice = $this->hotelMinPrice->getMinLos();
            $hotelRatePlanMinPrice = $this->hotelMinPrice->getRatePlanCode();

            $prices['hotelMinPrice'] = [
                'price' => $this->hotelMinPrice->getPriceValues(),
                'date' => $this->hotelMinPrice->getDate(),
                'minLos' => $hotelMinLosMinPrice !== 0 ? $hotelMinLosMinPrice : '',
                'ratePlan' => $hotelRatePlanMinPrice !== 0
                    ? [
                        'code' => $hotelRatePlanMinPrice,
                        'names' => $this->ratePlans[$hotelRatePlanMinPrice],
                    ]
                    : null,
                'isRestored' => $this->hotelMinPrice->getRestoreStatus(),
                'isFilled' => $this->hotelMinPrice->getFilledStatus(),
            ];
        }

        if ($this->hotelMinDiscountPrice->getPriceValues()) {
            $hotelMinLosMinDiscountPrice = $this->hotelMinDiscountPrice->getMinLos();
            $hotelRatePlanMinDiscountPrice = $this->hotelMinDiscountPrice->getRatePlanCode();

            $prices['hotelMinDiscountPrice'] = [
                'price' => $this->hotelMinDiscountPrice->getPriceValues(),
                'date' => $this->hotelMinDiscountPrice->getDate(),
                'minLos' => $hotelMinLosMinDiscountPrice !== 0 ? $hotelMinLosMinDiscountPrice : '',
                'ratePlan' => $hotelRatePlanMinDiscountPrice !== 0
                    ? [
                        'code' => $hotelRatePlanMinDiscountPrice,
                        'names' => $this->ratePlans[$hotelRatePlanMinDiscountPrice],
                    ]
                    : null,
                'isRestored' => $this->hotelMinDiscountPrice->getRestoreStatus(),
                'isFilled' => $this->hotelMinDiscountPrice->getFilledStatus(),
            ];
        }

        foreach ($this->prices as $roomTypeCode => $roomTypeModel) {
            $prices['rooms'][$roomTypeCode] = null;

            $capacityPrices = $roomTypeModel->getCapacities();

            if ($capacityPrices === null) continue;

            foreach ($capacityPrices as $capacity => $priceModel) {
                $minLos = $roomTypeModel->getPriceMinLos($priceModel);
                $ratePlanCode = $roomTypeModel->getPriceRatePlanCode($priceModel);
                $discountPriceModel = $roomTypeModel->getDiscountCapacity($capacity);

                $prices['rooms'][$roomTypeCode]['guests'][$capacity] = [
                    'price' => $roomTypeModel->getPriceValues($priceModel),
                    'discountPrice' => $discountPriceModel ? $roomTypeModel->getDiscountPriceValues($discountPriceModel) : null,
                    'date' => $roomTypeModel->getPriceDate($priceModel),
                    'minLos' => $minLos !== 0 ? $minLos : '',
                    'ratePlan' => $ratePlanCode !== 0
                        ? [
                            'code' => $ratePlanCode,
                            'names' => $this->ratePlans[$ratePlanCode],
                        ]
                        : null,
                    'isRestored' => $roomTypeModel->getPriceRestoreStatus($priceModel),
                    'isFilled' => $roomTypeModel->getPriceFillStatus($priceModel),
                ];
            }

            $minLosMinPrice = $roomTypeModel->getMinPriceMinLos();
            $ratePlanMinPrice = $roomTypeModel->getMinPriceRatePlaneCode();

            $prices['rooms'][$roomTypeCode]['minPrice'] = [
                'price' => $roomTypeModel->getMinPriceValues(),
                'discountPrice' => $roomTypeModel->getMinDiscountPriceValues(),
                'extraPlacementPrice' => $roomTypeModel->getExtraPlacementPriceValues(),
                'date' => $roomTypeModel->getMinPriceDate(),
                'minLos' => $minLosMinPrice !== 0 ? $minLosMinPrice : '',
                'ratePlan' => $ratePlanMinPrice !== 0
                    ? [
                        'code' => $ratePlanMinPrice,
                        'names' => $this->ratePlans[$ratePlanMinPrice],
                    ]
                    : null,
                'isRestored' => $roomTypeModel->getMinPriceRestoreStatus(),
                'isFilled' => $roomTypeModel->getMinPriceFillStatus(),
            ];
        }

        return $prices;
    }

    public function import(array $cachePrices): void
    {
        $cacheHotelMinPrice = $cachePrices['hotelMinPrice'];

        if (is_array($cacheHotelMinPrice) && $this->hotelMinPrice->getPriceValues() === null) {
            foreach ($cacheHotelMinPrice['price'] as $currency => $priceValue) {
                $this->setHotelMinPrice(
                    $priceValue,
                    $currency,
                    '',
                    0,
                    0,
                    true,
                    $cacheHotelMinPrice['isFilled']
                );
            }
        }

        $cacheHotelMinDiscountPrice = $cachePrices['hotelMinDiscountPrice'] ?? null;

        if (is_array($cacheHotelMinDiscountPrice) && $this->hotelMinDiscountPrice->getPriceValues() === null) {
            foreach ($cacheHotelMinDiscountPrice['price'] as $currency => $priceValue) {
                $this->setHotelMinDiscountPrice(
                    $priceValue,
                    $currency,
                    '',
                    0,
                    0,
                    true,
                    $cacheHotelMinDiscountPrice['isFilled']
                );
            }
        }

        foreach ($cachePrices['rooms'] as $cacheRoomTypeCode => $cacheRoomTypeInfo) {
            $cacheRoomTypeCode = (int)$cacheRoomTypeCode;
            $cacheRoomCapacities = $cacheRoomTypeInfo['guests'] ?? null;
            $cacheRoomMinPrice = $cacheRoomTypeInfo['minPrice'] ?? null;

            if (isset($this->prices[$cacheRoomTypeCode])) {
                if (!($this->prices[$cacheRoomTypeCode] instanceof RoomType)) {
                    $this->prices[$cacheRoomTypeCode] = new RoomType();
                }

                if (is_array($cacheRoomCapacities)) {
                    foreach ($cacheRoomCapacities as $capacity => $cacheCapacityPriceInfo) {
                        $capacity = (int)$capacity;

                        $hasMainCapacity = $this->prices[$cacheRoomTypeCode]->getCapacity($capacity) !== null;
                        $hasDiscountCapacity = $this->prices[$cacheRoomTypeCode]->getDiscountCapacity($capacity) !== null;

                        if (!$hasMainCapacity || !$hasDiscountCapacity) {
                            $cacheCapacityPrices = $cacheCapacityPriceInfo['price'];

                            if (is_array($cacheCapacityPrices) && !$hasMainCapacity) {
                                foreach ($cacheCapacityPrices as $currency => $cacheCapacityPriceValue) {
                                    $this->setPrice(
                                        $cacheRoomTypeCode,
                                        $capacity,
                                        (float)$cacheCapacityPriceValue,
                                        $currency,
                                        '',
                                        0,
                                        0,
                                        true,
                                        $cacheCapacityPriceInfo['isFilled']
                                    );
                                }
                            }

                            $cacheDiscountPrices = $cacheCapacityPriceInfo['discountPrice'] ?? null;
                            if (is_array($cacheDiscountPrices) && !$hasDiscountCapacity) {
                                foreach ($cacheDiscountPrices as $currency => $cacheDiscountPriceValue) {
                                    $this->setDiscountPrice(
                                        $cacheRoomTypeCode,
                                        $capacity,
                                        (float)$cacheDiscountPriceValue,
                                        $currency,
                                        '',
                                        0,
                                        0,
                                        true,
                                        $cacheCapacityPriceInfo['isFilled']
                                    );
                                }
                            }
                        }
                    }
                }

                if ($this->prices[$cacheRoomTypeCode]->getMinPriceValues() === null ||
                    $this->prices[$cacheRoomTypeCode]->getMinDiscountPriceValues() === null) {

                    $cacheMinPricePrices = $cacheRoomMinPrice['price'] ?? null;
                    if (is_array($cacheMinPricePrices) &&
                        $this->prices[$cacheRoomTypeCode]->getMinPriceValues() === null) {
                        foreach ($cacheMinPricePrices as $currency => $cacheMinPriceValue) {
                            $this->setMinPrice(
                                $cacheRoomTypeCode,
                                (float)$cacheMinPriceValue,
                                $currency,
                                '',
                                0,
                                0,
                                true,
                                $cacheRoomMinPrice['isFilled']
                            );
                        }
                    }

                    $cacheMinDiscountPrices = $cacheRoomMinPrice['discountPrice'] ?? null;
                    if (is_array($cacheMinDiscountPrices) &&
                        $this->prices[$cacheRoomTypeCode]->getMinDiscountPriceValues() === null) {
                        foreach ($cacheMinDiscountPrices as $currency => $cacheMinDiscountPriceValue) {
                            $this->setMinDiscountPrice(
                                $cacheRoomTypeCode,
                                (float)$cacheMinDiscountPriceValue,
                                $currency,
                                '',
                                0,
                                0,
                                true,
                                $cacheRoomMinPrice['isFilled']
                            );
                        }
                    }
                }

                $cacheExtraPlacementPrices = $cacheRoomMinPrice['extraPlacementPrice'] ?? null;
                if (is_array($cacheExtraPlacementPrices) &&
                    $this->prices[$cacheRoomTypeCode]->getExtraPlacementPriceValues() === null) {
                    foreach ($cacheExtraPlacementPrices as $currency => $cacheExtraPlacementPriceValue) {
                        $this->setExtraPlacementPrice(
                            $cacheRoomTypeCode,
                            (float)$cacheExtraPlacementPriceValue,
                            $currency,
                            '',
                            0,
                            0,
                            true,
                            $cacheRoomMinPrice['isFilled'] ?? false
                        );
                    }
                }
            }
        }
    }

    private function setEmptyPrices(): void
    {
        $this->hotelMinPrice = new Price();
        $this->hotelMinDiscountPrice = new Price();

        foreach ($this->roomTypes as $roomType) {
            $this->prices[$roomType] = new RoomType();
        }
    }
}
