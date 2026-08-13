<?php declare(strict_types=1);

namespace ModulePriceLoad\utils;

use DateTime;

class Tools
{
    public const TODAY_DATE = '';
    public const FULL_DATE_FORMAT = 'Y-m-d H:i:s';
    public const DEFAULT_DATE_FORMAT = 'Y-m-d';

    public static function mergeArrays(array $arr1, array $arr2): array
    {
        return array_merge($arr1, $arr2);
    }

    public static function uniqueArrayItems(array $arr): array
    {
        $newArray = array_unique(
            array_map('serialize', $arr)
        );

        sort($newArray);

        return array_map('unserialize', $newArray);
    }

    public static function formatDate(string $date = Tools::TODAY_DATE, string $format = Tools::DEFAULT_DATE_FORMAT): string
    {
        return (new DateTime($date))->format($format);
    }

    public static function getDatesDiffInDays(string $date1, string $date2): int
    {
        $newDate1 = new DateTime($date1);
        $newDate2 = new DateTime($date2);

        $newDate1->setTime(0, 0, 0);
        $newDate2->setTime(0, 0, 0);

        return $newDate2->diff($newDate1)->days;
    }

    public static function getDatesDiffInTime(int $date1, int $date2): string
    {
        $objectDate1 = new DateTime();
        $objectDate1->setTimestamp($date1);

        $objectDate2 = new DateTime();
        $objectDate2->setTimestamp($date2);

        $objectDiff = $objectDate1->diff($objectDate2);

        return "{$objectDiff->h}h {$objectDiff->i}m {$objectDiff->s}s";
    }

    public static function addDaysToDate(int $days, string $date = Tools::TODAY_DATE): string
    {
        $newDate = new DateTime($date);
        $newDate->modify("+{$days} day");

        return $newDate->format(Tools::DEFAULT_DATE_FORMAT);
    }

    public static function getTimestamp(string $date = ''): int
    {
        return (new DateTime($date))->getTimestamp();
    }

    public static function getPath(string $path): string
    {
        return str_replace('/', DIRECTORY_SEPARATOR, $path);
    }

    public static function createDir(string $path): void
    {
        $path = Tools::getPath($path);

        if (!is_dir($path)) {
            mkdir($path);
        }
    }

    public static function removeDir(string $path, array $excludes = ['.', '..']): void
    {
        $path = Tools::getPath($path);

        if (is_dir($path) && !is_link($path)) {
            $includes = array_diff(scandir($path), $excludes);

            foreach ($includes as $include) {
                Tools::removeFile($path . DIRECTORY_SEPARATOR . $include);
            }

            rmdir($path);
        }
    }

    public static function removeFile(string $path): void
    {
        $path = Tools::getPath($path);

        if (is_file($path) && !is_link($path)) {
            unlink($path);
        }
    }
}
