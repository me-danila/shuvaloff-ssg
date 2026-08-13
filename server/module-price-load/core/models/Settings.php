<?php declare(strict_types=1);

namespace ModulePriceLoad\models;

use ModulePriceLoad\utils\Messages;
use ModulePriceLoad\utils\Tools;

class Settings
{
    public const MIN_MINLOS = 1;

    private const BASE_CURRENCY_INDEX = 0;
    private const DEFAULT_LANGUAGE = 'en-US';
    private const DEFAULT_CURRENCY = 'RUB';
    private const MIN_DAYS = 1;
    private const MAX_DAYS = 100;
    private const LANG_CODE_LONG = 4;
    private const LANG_CODE_SHORT = 2;
    private const API_KEY_HEADER_REGEX = '/X-[a-zA-Z-]{0,11}ApiKey\: [a-z0-9]{32}/';
    private const DOMAINS_PLACEHOLDER = ['domain1.com', 'domain2.com', 'domain3.com'];
    private const HEADER_PLACEHOLDER = 'Header-Name: value';

    private $domains;
    private $apiKeyHeader;
    private $hotelCodes;
    private $days;
    private $minLosLimit;
    private $currencies;
    private $languages;
    private $startTomorrow;
    private $requireRatePlans;
    private $pricesAvailableDate;
    private $enableCache;

    function __construct(array $settings)
    {
        $this->domains = $settings['domains'];
        $this->apiKeyHeader = $settings['api_key_header'];
        $this->hotelCodes = $settings['hotels'];
        $this->days = $settings['days'];
        $this->minLosLimit = $settings['minLosLimit'];
        $this->currencies = $settings['currencies'];
        $this->languages = $settings['languages'];
        $this->startTomorrow = $settings['startTomorrow'];
        $this->requireRatePlans = $settings['requireOffers'];
        $this->pricesAvailableDate = $settings['pricesAvailableFromDate'];
        $this->enableCache = $settings['enableCache'];
    }

    public function init(): void
    {
        $this->checkOnErrors();

        $this->correctCurrencies();
        $this->correctLanguages();
        $this->correctAvailablePriceDate();
    }

    public function getDomains(): array
    {
        return $this->domains;
    }

    public function getApiHeader(): string
    {
        return $this->apiKeyHeader;
    }

    public function getHotelCodes(): array
    {
        return $this->hotelCodes;
    }

    public function getDays(): int
    {
        return $this->days;
    }

    public function getMinLosLimit(): int
    {
        return $this->minLosLimit;
    }

    public function forEachCurrency(callable $currencyHandler): void
    {
        foreach ($this->getCurrencies() as $index => $currency) {
            $isBaseCurrency = $index === self::BASE_CURRENCY_INDEX;
            $currencyHandler($currency, $isBaseCurrency);
        }
    }

    public function getLanguages(): array
    {
        return $this->languages;
    }

    public function getStartTomorrow(): bool
    {
        return $this->startTomorrow;
    }

    public function getRequiredRatePlans(): array
    {
        return $this->requireRatePlans;
    }

    public function getPricesAvailableDate(): string
    {
        return $this->pricesAvailableDate;
    }

    public function getCurrencies(): array
    {
        return $this->currencies;
    }

    public function isCacheEnable(): bool
    {
        return $this->enableCache;
    }

    private function checkOnErrors(): void
    {
        if (empty($this->domains)) {
            throw new \RuntimeException(Messages::S_NO_API_SOURCES);
        } elseif ($this->isDomainPlaceholder()) {
            throw new \RuntimeException(Messages::S_API_SOURCES_PLACEHOLDER);
        } elseif (!$this->isDomainCorrect()) {
            throw new \RuntimeException(Messages::S_API_SOURCES_INCORRECT);
        }

        if (empty($this->apiKeyHeader)) {
            throw new \RuntimeException(Messages::S_NO_API_HEADER);
        } elseif ($this->isHeaderPlaceholder()) {
            throw new \RuntimeException(Messages::S_API_HEADER_PLACEHOLDER);
        } elseif (!$this->isApiKeyHeaderCorrect()) {
            throw new \RuntimeException(Messages::S_API_HEADER_INCORRECT);
        }

        if (empty($this->hotelCodes)) {
            throw new \RuntimeException(Messages::S_NO_HOTELS);
        }

        if ($this->days < self::MIN_DAYS || $this->days > self::MAX_DAYS) {
            throw new \RuntimeException(Messages::daysError(self::MIN_DAYS, self::MAX_DAYS));
        }

        if ($this->minLosLimit > $this->days) {
            throw new \RuntimeException(Messages::S_MINLOS);
        }
    }

    private function correctCurrencies(): void
    {
        $this->currencies = (empty($this->currencies))
            ? [self::DEFAULT_CURRENCY]
            : array_map('strtoupper', $this->currencies);
    }

    private function correctLanguages(): void
    {
        if (empty($this->languages)) {
            $this->languages = [self::DEFAULT_LANGUAGE];
            return;
        }

        $languageCodes = [];

        foreach ($this->languages as $language) {
            if (strlen($language) === self::LANG_CODE_LONG) {
                $languageCodes[] = $language;
            } else {
                if (strlen($language) != self::LANG_CODE_SHORT) {
                    $language = substr($language, 0, self::LANG_CODE_SHORT);
                }
                $languageCodes[] = strtolower($language) . '-' . strtolower($language);
            }
        }

        $this->languages = $languageCodes;
    }

    private function correctAvailablePriceDate(): void
    {
        try {
            $this->pricesAvailableDate =
                Tools::getTimestamp($this->pricesAvailableDate) > Tools::getTimestamp()
                    ? Tools::formatDate($this->pricesAvailableDate)
                    : Tools::TODAY_DATE;
        } catch (\RuntimeException $error) {
            throw new \RuntimeException(Messages::S_AVAILABLE_DATE);
        }
    }

    private function isDomainCorrect(): bool
    {
        if (count($this->domains) != 3) {
            return false;
        }

        foreach ($this->domains as $source) {
            if (gettype($source) !== 'string') {
                return false;
            }
        }

        return true;
    }

    private function isApiKeyHeaderCorrect(): bool
    {
        preg_match(self::API_KEY_HEADER_REGEX, $this->apiKeyHeader, $matches);
        return !empty($matches);
    }

    private function isDomainPlaceholder(): bool
    {
        foreach ($this->domains as $source) {
            if (in_array($source, self::DOMAINS_PLACEHOLDER)) {
                return true;
            }
        }

        return false;
    }

    private function isHeaderPlaceholder(): bool
    {
        return $this->apiKeyHeader === self::HEADER_PLACEHOLDER;
    }
}
