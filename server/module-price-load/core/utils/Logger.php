<?php declare(strict_types=1);

namespace ModulePriceLoad\utils;

class Logger
{
    private const LOG_FILE_FORMAT = '.txt';
    private const EXCLUDES = ['.', '..', '.gitignore', 'log.txt'];
    private const LOG_DIR_PATH = MODULE_PRICE_LOAD_CORE_FOLDER . '/logs/';
    private const LOG_FILE_PATH = MODULE_PRICE_LOAD_CORE_FOLDER . '/logs/log.txt';
    private const MODEL_LOG_DIR_PATH = MODULE_PRICE_LOAD_CORE_FOLDER . '/logs/model/';
    private const REQUEST_URLS_LOG_DIR_PATH = MODULE_PRICE_LOAD_CORE_FOLDER . '/logs/request_urls/';
    private const RESPONSE_LOG_DIR_PATH = MODULE_PRICE_LOAD_CORE_FOLDER . '/logs/responses/';

    private $startTime;
    private $endTime;

    public function __construct()
    {
        $this->prepareLogDir();
    }

    public function startWork(): void
    {
        $this->startTime = Tools::getTimestamp();
    }

    public function endWork(): void
    {
        $this->endTime = Tools::getTimestamp();
    }

    public function setWorkStatus(string $message = '', string $errorLevel = ''): void
    {
        self::logConsole($message ? $errorLevel . $message : Messages::SUCCESS_MESSAGE);

        if (empty($errorLevel)) {
            $this->logSuccess();
        } else {
            $this->logError($message, $errorLevel);
        }
    }

    public function prepareLogDir(): void
    {
        $this->clearLogs();

        if (MODULE_PRICE_LOAD_DEBUG_MODE) {
            $this->createBaseLogDirs();
        }
    }

    public static function logLoaderUrls(array $urls): void
    {
        if (!MODULE_PRICE_LOAD_DEBUG_MODE) {
            return;
        }

        $logFileName = self::getLogNameForUrls($urls[0]);

        file_put_contents(Tools::getPath($logFileName), print_r($urls, true));
    }

    public static function logLoaderResponse($url, $data, int $tryNumber): void
    {
        if (!MODULE_PRICE_LOAD_DEBUG_MODE) {
            return;
        }

        $logFileName = self::getLogNameForResponse($url, (string)$tryNumber);

        file_put_contents(Tools::getPath($logFileName), $data);
    }

    public static function logBadUrls(array $urls): void
    {
        $timestamp = Tools::formatDate(Tools::TODAY_DATE, Tools::FULL_DATE_FORMAT);

        file_put_contents(Tools::getPath(self::LOG_FILE_PATH), $timestamp . "\n", FILE_APPEND);
        file_put_contents(Tools::getPath(self::LOG_FILE_PATH), print_r($urls, true), FILE_APPEND);
        file_put_contents(Tools::getPath(self::LOG_FILE_PATH), "\n", FILE_APPEND);
    }

    public static function logModelData(array $data, int $hotelCode, string $dataType): void
    {
        if (!MODULE_PRICE_LOAD_DEBUG_MODE) {
            return;
        }

        $logPath = self::MODEL_LOG_DIR_PATH . $hotelCode . '_' . $dataType . self::LOG_FILE_FORMAT;

        file_put_contents(Tools::getPath($logPath), print_r($data, true));
    }

    public static function logConsole(string $text): void
    {
        if (MODULE_PRICE_LOAD_CONSOLE_LOG_MODE) {
            print_r($text . PHP_EOL);
        }
    }

    private function logSuccess(): void
    {
        $timestamp = Tools::formatDate(Tools::TODAY_DATE, Tools::FULL_DATE_FORMAT);
        $message = Messages::SUCCESS_MESSAGE . Tools::getDatesDiffInTime($this->startTime, $this->endTime);

        file_put_contents(
            Tools::getPath(self::LOG_FILE_PATH),
            $timestamp . "\n"
        );
        file_put_contents(
            Tools::getPath(self::LOG_FILE_PATH),
            $message . "\n\n",
            FILE_APPEND
        );
    }

    private function logError(string $message, string $errorLevel): void
    {
        file_put_contents(
            Tools::getPath(self::LOG_FILE_PATH),
            Tools::formatDate(Tools::TODAY_DATE, Tools::FULL_DATE_FORMAT . "\n"),
            FILE_APPEND
        );
        file_put_contents(
            Tools::getPath(self::LOG_FILE_PATH),
            $errorLevel . $message . "\n\n",
            FILE_APPEND
        );
    }

    /**
     * There is the duplication of functionality in `Logger::clearLogs()` method from the `Tools::removeDir()` method.
     * It's done intentionally for not to use the recursive `Tools::removeDir()` method.
     */

    private function clearLogs(): void
    {
        $path = Tools::getPath(self::LOG_DIR_PATH);
        $includes = array_diff(scandir($path), self::EXCLUDES);

        foreach ($includes as $include) {
            $includeFullPath = $path . $include;

            if (is_dir($includeFullPath) && !is_link($includeFullPath)) {
                $subIncludes = array_diff(scandir($includeFullPath), self::EXCLUDES);

                foreach ($subIncludes as $subInclude) {
                    $subIncludeFullPath = $includeFullPath . DIRECTORY_SEPARATOR . $subInclude;

                    Tools::removeDir($subIncludeFullPath);
                    Tools::removeFile($subIncludeFullPath);
                }

                Tools::removeDir($includeFullPath);
            }

            Tools::removeFile($includeFullPath);
        }
    }

    private function createBaseLogDirs(): void
    {
        Tools::createDir(self::MODEL_LOG_DIR_PATH);
        Tools::createDir(self::REQUEST_URLS_LOG_DIR_PATH);
        Tools::createDir(self::RESPONSE_LOG_DIR_PATH);
    }

    private static function getMethodName(string $url): ?string
    {
        preg_match('/([a-z_]+)\?/', $url, $output_array);

        return $output_array[1] ?? null;
    }

    private static function getHotelByMethod(string $url, string $method): ?string
    {
        preg_match('/hotels%5B0%5D.code=(\d+)/', $url, $output_array);

        switch ($method) {
            case 'nearest_available_dates':
            case 'rate_plan_booking_rules':
                preg_match('/hotel=(\d+)/', $url, $output_array);
                break;
            case 'host':
                preg_match('/hotel_code=(\d+)/', $url, $output_array);
                break;
            default:
                break;
        }

        return $output_array[1] ?? null;
    }

    private static function getCurrencyByMethod(string $url, string $method): ?string
    {
        if ($method === 'hotel_availability') {
            preg_match('/currency=([A-Z]+)/', $url, $output_array);
        }

        return $output_array[1] ?? null;
    }

    private static function getUrlName(string $url, string $method): ?string
    {
        $replaceRules = [
            '/(\d{4})-(\d{2})-(\d{2})%3B(\d{4})-(\d{2})-(\d{2})/' => '$1$2$3$4$5$6',
            '/(\d{4})-(\d{2})-(\d{2})/' => '$1$2$3',
            '/([^?]+\?|&shared=false|_|hotel=\d+&|hotel_code=|hotels%5B0%5D.code=\d+|include_rates=[a-z]+&include_transfers=[a-z]+&include_all_placements=[a-z]+&include_promo_restricted=[a-z]+&language=[A-Za-z-]+&currency=|criterions%5B\d+%5D\.|dates|rate_plans%5B\d+%5D.code=)/' => '',
            '/(&|=|%3B|%5B|%5D)/' => '_',
            '/[_]+/' => '_',
        ];

        return preg_replace(array_keys($replaceRules), array_values($replaceRules), $url);
    }

    private static function getLogNameForUrls(string $url): string
    {
        $logFileName = self::REQUEST_URLS_LOG_DIR_PATH;

        if ($method = self::getMethodName($url)) {
            $logFileName .= $method . DIRECTORY_SEPARATOR;
            Tools::createDir($logFileName);
        }

        if ($hotelId = self::getHotelByMethod($url, $method)) {
            $logFileName .= $hotelId;
        }

        if ($currency = self::getCurrencyByMethod($url, $method)) {
            $logFileName .= '_' . $currency;
        }

        return $logFileName . self::LOG_FILE_FORMAT;
    }

    private static function getLogNameForResponse(string $url, string $tryNumber): string
    {
        $logFileName = self::RESPONSE_LOG_DIR_PATH;

        if ($method = self::getMethodName($url)) {
            $logFileName .= $method . DIRECTORY_SEPARATOR;
            Tools::createDir($logFileName);
        }

        if ($hotelId = self::getHotelByMethod($url, $method)) {
            $logFileName .= "{$hotelId}_try{$tryNumber}";
        }

        if ($method !== 'hotel_info') {
            if ($name = self::getUrlName($url, $method)) {
                $logFileName .= "_{$name}";
            }
        }

        return $logFileName . self::LOG_FILE_FORMAT;
    }
}
