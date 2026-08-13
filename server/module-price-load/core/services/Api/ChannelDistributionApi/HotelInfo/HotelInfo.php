<?php declare(strict_types=1);

namespace ModulePriceLoad\services\Api\ChannelDistributionApi\HotelInfo;

use ModulePriceLoad\models\Hotel;
use ModulePriceLoad\models\Settings;
use ModulePriceLoad\prototype\ApiServiceAbstract;

class HotelInfo extends ApiServiceAbstract
{
    private const API_NAME = 'ChannelDistributionApi';
    private const METHOD_NAME = '/BookingForm/hotel_info';

    private $hotelCode;
    private $languages;

    public function __construct(Settings $settings, Hotel $hotelModel)
    {
        $this->languages = $settings->getLanguages();
        $this->hotelCode = $hotelModel->getHotelCode();

        parent::__construct($settings, $hotelModel, self::METHOD_NAME);
    }

    public function setRoomTypes(): void
    {
        $roomTypes = [];

        foreach ($this->responses[0]['hotels'] as $hotel) {
            foreach ($hotel['room_types'] as $roomType) {
                $roomTypes[] = $roomType['code'];
            }
        }

        $this->hotelModel->setRoomTypes($roomTypes);
    }

    public function setRates(array $requireRatePlanCodes): void
    {
        $rates = [];

        foreach ($this->responses as $index => $response) {
            foreach ($response['hotels'] as $hotel) {
                foreach ($hotel['rate_plans'] as $ratePlan) {
                    $ratePlanCode = $this->getRatePlanCode($ratePlan);
                    $ratePlanName = $this->getRatePlanName($ratePlan);
                    $hasPromo = $this->hasPromo($ratePlan);
                    $language = self::simplifyLanguage($this->languages[$index]);

                    if (!$hasPromo && (empty($requireRatePlanCodes) || in_array($ratePlanCode, $requireRatePlanCodes, true))) {
                        $rates[$ratePlanCode][$language] = $ratePlanName;
                    }
                }
            }
        }

        $this->hotelModel->setRatePlans($rates);
    }

    protected function collectUrls(): array
    {
        $urls = [];

        foreach ($this->languages as $language) {
            $urls[] = $this->getUrl($language);
        }

        return $urls;
    }

    protected function getUrl(string $language): string
    {
        return $this->host . self::API_NAME . self::METHOD_NAME
            . "?language=" . $language
            . "&hotels%5B0%5D.code=" . $this->hotelCode;
    }

    private static function simplifyLanguage(string $language): string
    {
        preg_match('/(.+)-/', $language, $result);
        return $result[1];
    }

    private function getRatePlanCode(array $ratePlan): int
    {
        return (int)$ratePlan['code'];
    }

    private function getRatePlanName(array $ratePlan): string
    {
        return $ratePlan['name'];
    }

    private function hasPromo(array $ratePlan): bool
    {
        return isset($ratePlan['promo']) && $ratePlan['promo'] === true;
    }
}
