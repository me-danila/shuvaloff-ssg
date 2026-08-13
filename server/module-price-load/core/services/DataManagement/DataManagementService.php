<?php declare(strict_types=1);

namespace ModulePriceLoad\services\DataManagement;

use ModulePriceLoad\models\Hotel;
use ModulePriceLoad\utils\Tools;

class DataManagementService implements DataManagementServiceInterface
{
    private const CACHE_FILE_PATH = MODULE_PRICE_LOAD_ROOT_FOLDER . '/cache/price.json';

    /**
     * @inheritDoc
     */
    public function isAvailableToUpdate(): bool
    {
        $fileUpdateTime = file_exists(Tools::getPath(self::CACHE_FILE_PATH))
            ? filemtime(Tools::getPath(self::CACHE_FILE_PATH))
            : null;

        return MODULE_PRICE_LOAD_DEBUG_MODE || time() - $fileUpdateTime > self::MIN_CACHE_TIME_MINUTES * 60;
    }

    /**
     * @inheritDoc
     */
    public function saveData(array $hotelModels): void
    {
        $adaptedPrices = [];

        foreach ($hotelModels as $hotelCode => $hotelModel) {
            $adaptedPrices[$hotelCode] = $hotelModel->export();
        }

        file_put_contents(Tools::getPath(self::CACHE_FILE_PATH), json_encode($adaptedPrices, JSON_UNESCAPED_UNICODE));
    }

    /**
     * @inheritDoc
     */
    public function getData(array $hotelModels, array $hotelCodes): array
    {
        $cacheHotelPrices = file_exists(Tools::getPath(self::CACHE_FILE_PATH))
            ? json_decode(file_get_contents(Tools::getPath(self::CACHE_FILE_PATH)), true)
            : [];

        foreach ($cacheHotelPrices as $cacheHotelCode => $cachePrices) {
            $cacheHotelCode = (int)$cacheHotelCode;

            if (!in_array($cacheHotelCode, $hotelCodes, true)) {
                continue;
            }

            if (!($hotelModels[$cacheHotelCode] instanceof Hotel)) {
                $hotelModels[$cacheHotelCode] = new Hotel($cacheHotelCode);
            }

            $hotelModels[$cacheHotelCode]->import($cachePrices);
        }

        return $hotelModels;
    }
}
