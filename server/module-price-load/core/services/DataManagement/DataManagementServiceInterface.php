<?php declare(strict_types=1);

namespace ModulePriceLoad\services\DataManagement;

interface DataManagementServiceInterface
{
    public const MIN_CACHE_TIME_MINUTES = 50;

    /**
     * @return bool
     */
    public function isAvailableToUpdate(): bool;

    /**
     * @param array $hotelModels - array of HotelModel
     */
    public function saveData(array $hotelModels): void;

    /**
     * @param array $hotelModels - empty array, but should become an array of HotelModel
     * @param array $hotelCodes - array of int
     * @return array - array of HotelModel
     */
    public function getData(array $hotelModels, array $hotelCodes): array;
}
