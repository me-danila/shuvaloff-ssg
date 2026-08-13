<?php declare(strict_types=1);


namespace ModulePriceLoad\prototype;


use ModulePriceLoad\models\Hotel;
use ModulePriceLoad\models\Settings;
use ModulePriceLoad\utils\Loader;
use ModulePriceLoad\utils\Logger;
use ModulePriceLoad\utils\Messages;

abstract class ApiServiceAbstract
{
    protected const API_LOG = 'Uploading from API: ';

    /**
     * @return array - array of urls
     */
    abstract protected function collectUrls(): array;

    /**
     * @param string $param - any information you need to use in url generation
     * @return string - generated url
     */
    abstract protected function getUrl(string $param): string;

    protected $responses = [];
    protected $host;
    protected $hotelModel;

    public function __construct(Settings $settings, Hotel $hotelModel, string $methodName)
    {
        $this->hotelModel = $hotelModel;

        if (!$this->hotelModel->getHost()) {
            foreach ($settings->getDomains() as $index => $domain) {
                try {
                    $this->host = $this->getBaseHost($domain);
                    $this->loadData($methodName, $settings->getApiHeader());
                } catch (\RuntimeException $exception) {
                    continue;
                }
            }

            if (empty($this->responses)) {
                throw new \RuntimeException(Messages::A_INVALID_RESPONSE);
            }

            foreach ($this->responses as $response) {
                if (isset($response['errors'])) {
                    throw new \RuntimeException("\"" . $response['errors'][0]['message'] . "\"" . Messages::A_ERROR_RESPONSE);
                }
            }

            $this->hotelModel->setHost($this->host);
        } else {
            $this->host = $this->hotelModel->getHost();
            $this->loadData($methodName, $settings->getApiHeader());
        }
    }

    private function loadData(string $methodName, string $apiKeyHeader): void
    {
        $loader = new Loader();
        $loader->setHeader([$apiKeyHeader]);
        $this->responses = [];
        $urls = $this->collectUrls();
        Logger::logConsole(self::API_LOG . $methodName . ', total URLs to load: ' . count($urls));
        $this->responses = $loader->loadData($urls);
    }

    private function getBaseHost(string $domain): string
    {
        return 'https://' . $domain . '/';
    }
}
