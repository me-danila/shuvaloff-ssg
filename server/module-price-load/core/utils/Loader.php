<?php declare(strict_types=1);

namespace ModulePriceLoad\utils;

class Loader
{
    private const LOADER_BAD_URLS_ERROR_MESSAGE = 'Can\'t execute some urls';
    private const LOADER_JSON_PARSE_ERROR_MESSAGE = 'Unable to parse json.';
    private const LOG_BAD_URLS_MESSAGE = '---Failed to load URLs: ';
    private const LOG_TRY_MESSAGE = '---Retrying failed URLs';
    private const LOG_URL_RANGE_MESSAGE = '---Attempting to load URL: ';
    private const RETRIES_NUMBER = 10;
    private const RETRY_DELAY_MICROSECONDS = 1000000; /* 1s */
    private const SEND_DELAY_MICROSECONDS = 200000; /* 0.2s */
    private const LOADING_URLS_PER_ONE_MOMENT_LIMIT = 1;

    /* curl settings */

    private const CURLOPT_RETURNTRANSFER_VALUE = true; /* return the response as a string instead of showing it all at once */
    private const CURLOPT_TIMEOUT_VALUE = 300; /* how many seconds will the cURL request take to execute */
    private const CURLOPT_PIPEWAIT_VALUE = true;
    private const CURLOPT_FAILONERROR_VALUE = true;
    private const CURLOPT_CONNECTTIMEOUT_VALUE = 15; /* how long to wait for an answer */

    /* multi curl settings */

    /* private const CURLMOPT_PIPELINING_VALUE = 1; */
    private const CURLMOPT_MAXCONNECTS_VALUE = 10;
    private const CURLMOPT_MAX_HOST_CONNECTIONS_VALUE = 10;
    private const CURLMOPT_MAX_TOTAL_VALUE = 10;

    private $retryUrls = [];
    private $badUrls = [];
    private $result = [];
    private $currentTryNumber;
    private $headers = [
        "Content-Type: application/json",
        "Accept: application/json, text/plain, */*"
    ];

    public function loadData(array $urls): array
    {
        if (empty($urls)) {
            return $urls;
        }

        Logger::logLoaderUrls($urls);

        $urlsRanges = array_chunk($urls, self::LOADING_URLS_PER_ONE_MOMENT_LIMIT);

        if (count($urlsRanges) > 1) {
            Logger::logConsole('---Starting batch upload for ' . count($urls) . ' URLs');
        } else {
            Logger::logConsole('---Starting upload for ' . count($urls) . ' URLs');
        }

        foreach ($urlsRanges as $rangeIndex => $urlsRange) {
            if (self::LOADING_URLS_PER_ONE_MOMENT_LIMIT > 1) {
                $this->logConsoleUrlRange($rangeIndex, count($urlsRange));
            } else {
                Logger::logConsole(self::LOG_URL_RANGE_MESSAGE . ($rangeIndex + 1)  . ' of ' . count($urls));
            }

            $this->retryUrls = $urlsRange;
            $this->currentTryNumber = 0;

            while ($this->currentTryNumber < self::RETRIES_NUMBER) {

                if (count($this->retryUrls) > 0) {

                    if ($this->currentTryNumber > 0) {
                        Logger::logConsole(self::LOG_BAD_URLS_MESSAGE . count($this->retryUrls));
                        Logger::logConsole(self::LOG_TRY_MESSAGE);

                        usleep(self::RETRY_DELAY_MICROSECONDS);
                    }

                    $this->multiSend($this->retryUrls);
                }

                if (empty($this->badUrls)) {
                    break;
                }

                $this->retryUrls = $this->badUrls;
                $this->badUrls = [];
                $this->currentTryNumber++;

            }
        }

        if (!empty($this->badUrls)) {
            Logger::logBadUrls($this->badUrls);
            throw new \RuntimeException(self::LOADER_BAD_URLS_ERROR_MESSAGE);
        }

        return $this->result;
    }

    public function setHeader(array $headers): void
    {
        $this->headers = Tools::mergeArrays($this->headers, $headers);
    }

    private function multiSend(array $urls): void
    {
        $curlHandlers = [];
        $multiHandler = curl_multi_init();

        /* curl_multi_setopt($multiHandler, CURLMOPT_PIPELINING, self::CURLMOPT_PIPELINING_VALUE); */
        curl_multi_setopt($multiHandler, CURLMOPT_MAXCONNECTS, self::CURLMOPT_MAXCONNECTS_VALUE);
        curl_multi_setopt($multiHandler, CURLMOPT_MAX_HOST_CONNECTIONS, self::CURLMOPT_MAX_HOST_CONNECTIONS_VALUE);
        curl_multi_setopt($multiHandler, CURLMOPT_MAX_TOTAL_CONNECTIONS, self::CURLMOPT_MAX_TOTAL_VALUE);

        foreach ($urls as $index => $url) {
            $curlHandlers[$index] = curl_init();

            curl_setopt($curlHandlers[$index], CURLOPT_URL, $url);
            curl_setopt($curlHandlers[$index], CURLOPT_RETURNTRANSFER, self::CURLOPT_RETURNTRANSFER_VALUE);
            curl_setopt($curlHandlers[$index], CURLOPT_HTTPHEADER, $this->headers);
            curl_setopt($curlHandlers[$index], CURLOPT_TIMEOUT, self::CURLOPT_TIMEOUT_VALUE);

            curl_setopt($curlHandlers[$index], CURLOPT_PIPEWAIT, self::CURLOPT_PIPEWAIT_VALUE);
            curl_setopt($curlHandlers[$index], CURLOPT_FAILONERROR, self::CURLOPT_FAILONERROR_VALUE);
            curl_setopt($curlHandlers[$index], CURLOPT_CONNECTTIMEOUT, self::CURLOPT_CONNECTTIMEOUT_VALUE);

            curl_multi_add_handle($multiHandler, $curlHandlers[$index]);
        }

        do {
            $status = curl_multi_exec($multiHandler, $running);
            if ($running) {
                curl_multi_select($multiHandler);
            }
        } while ($running && $status === CURLM_OK);

        foreach ($urls as $index => $url) {
            $response = curl_multi_getcontent($curlHandlers[$index]);
            $this->responseHandler($url, $response);

            curl_multi_remove_handle($multiHandler, $curlHandlers[$index]);
            curl_close($curlHandlers[$index]);

            Logger::logLoaderResponse($url, $response, $this->currentTryNumber);
        }

        curl_multi_close($multiHandler);
        usleep(self::SEND_DELAY_MICROSECONDS);
    }

    private function responseHandler($url, $response): void
    {
        if ($this->isBadResponse($response)) {
            $this->badUrls[] = $url;
        } else {
            $this->result[] = json_decode($response, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Logger::logBadUrls([$url]);
                throw new \RuntimeException(self::LOADER_JSON_PARSE_ERROR_MESSAGE);
            }
        }
    }

    private function isBadResponse($response): bool
    {
        return !(strpos($response, '{') === 0);
    }

    private function logConsoleUrlRange(int $currentRangeIndex, int $currentRangeUrlCount): void
    {
        Logger::logConsole(self::LOG_URL_RANGE_MESSAGE . 'from ' . ($currentRangeIndex * self::LOADING_URLS_PER_ONE_MOMENT_LIMIT + 1) . ' to ' . (($currentRangeIndex + 1) * self::LOADING_URLS_PER_ONE_MOMENT_LIMIT - (self::LOADING_URLS_PER_ONE_MOMENT_LIMIT - $currentRangeUrlCount)));
    }
}
