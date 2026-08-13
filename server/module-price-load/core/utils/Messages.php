<?php declare(strict_types=1);

namespace ModulePriceLoad\utils;

class Messages
{
    /* module exit */

    public const FRESH_DATA_MESSAGE = 'The pricing data is fresh so it was not updated. You should delete the price file manually \'/module-price-load/cache/price.json\' to make force update.';
    public const SUCCESS_MESSAGE = 'Successful program completion ';

    /* error levels */

    public const E_ERROR = 'Error: ';
    public const E_NOTICE = 'Notice: ';

    /* settings errors */

    public const S_NO_API_SOURCES = 'The \'domains\' parameter is empty in settings.';
    public const S_NO_API_HEADER = 'The \'api_key_header\' parameter is empty in settings.';
    public const S_API_SOURCES_PLACEHOLDER = 'The \'domains\' parameter has a default value. Please set the real data. It\'s available from the product developer.';
    public const S_API_HEADER_PLACEHOLDER = 'The \'api_key_header\' parameter has a default value. Please set the real data. It\'s available from the product developer.';
    public const S_API_SOURCES_INCORRECT = 'The \'domains\' parameter is specified incorrectly. Please contact the module developer for details.';
    public const S_API_HEADER_INCORRECT = 'The \'api_key_header\' parameter is specified incorrectly. Please contact the module developer for details.';
    public const S_NO_HOTELS = 'No hotels in settings.';
    public const S_DAYS = 'Option value \'days\' must be between ';
    public const S_MINLOS = 'Option value \'minLosLimit\' can\'t be more than option value \'days\'.';
    public const S_AVAILABLE_DATE = 'Incorrect option value \'pricesAvailableFromDate\'. It must be in format ';

    /* api errors */

    public const A_INVALID_RESPONSE = 'Invalid response from the server. Contact the product developer.';
    public const A_ERROR_RESPONSE = ' error occurred while retrieving data. Contact the product developer.';

    /* debug mode warning */

    private const DEBUG_CONFIRM_ANSWER = 'Y';
    private const DEBUG_REJECTION_ANSWER = 'N';
    private const DEBUG_WARNING = 'You are running this module in DEBUG MODE. Do you know what you\'re doing? (' . self::DEBUG_CONFIRM_ANSWER . '/' . self::DEBUG_REJECTION_ANSWER . ')';
    private const DEBUG_CONFIRM = self::DEBUG_CONFIRM_ANSWER . ': Yes, I agree with the consequences of using this mode.';
    private const DEBUG_REJECTION = self::DEBUG_REJECTION_ANSWER . ': No, I need to learn more about this mode in the README.md.';
    private const DEBUG_CONFIRM_REACTION = 'I hope you know what you\'re doing.';
    private const DEBUG_REJECTION_REACTION = 'Excellent!';

    public static function debugModeWarning(): void
    {
        if (MODULE_PRICE_LOAD_DEBUG_MODE) {
            print_r(PHP_EOL . Messages::DEBUG_WARNING . PHP_EOL . PHP_EOL . Messages::DEBUG_CONFIRM . PHP_EOL . Messages::DEBUG_REJECTION . PHP_EOL);

            do {
                $answer = trim(fgets(STDIN));

                if (isset($answer[0]) && $answer[0] === Messages::DEBUG_CONFIRM_ANSWER) {
                    print_r(Messages::DEBUG_CONFIRM_REACTION . PHP_EOL . PHP_EOL);
                    break;
                }

                if (isset($answer[0]) && $answer[0] === Messages::DEBUG_REJECTION_ANSWER) {
                    print_r(Messages::DEBUG_REJECTION_REACTION . PHP_EOL . PHP_EOL);
                    exit(0);
                }

                $answer = '';
            } while (!$answer);
        }
    }

    public static function daysError(int $minDay, int $maxDay): string
    {
        return self::S_DAYS . $minDay . ' and ' . $maxDay;
    }
}
