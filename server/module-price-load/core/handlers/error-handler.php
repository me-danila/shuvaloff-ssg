<?php declare(strict_types=1);

try {
    set_error_handler(function ($errno, $errstr, $errfile, $errline) {
        $errorTypes = [
            E_ERROR => 'Fatal error',
            E_WARNING => 'Warning',
            E_PARSE => 'Parse error',
            E_NOTICE => 'Notice',
            E_CORE_ERROR => 'Fatal error',
            E_CORE_WARNING => 'Warning',
            E_COMPILE_ERROR => 'Fatal error',
            E_COMPILE_WARNING => 'Warning',
            E_USER_ERROR => 'Fatal error',
            E_USER_WARNING => 'Warning',
            E_USER_NOTICE => 'Notice',
            E_RECOVERABLE_ERROR => 'Fatal error',
            E_DEPRECATED => 'Deprecated',
            E_USER_DEPRECATED => 'Deprecated',
        ];

        if (MODULE_PRICE_LOAD_ERROR_LEVELS_LOG & $errno) {
            $errorText = date("Y-m-d H:i:s" . PHP_EOL);
            $errorText .= $errorTypes[$errno] . ': ' . $errstr . PHP_EOL;
            $errorText .= $errline . ' line, in ' . $errfile . PHP_EOL;
            $errorText .= PHP_EOL;

            file_put_contents(MODULE_PRICE_LOAD_ERRORS_FOLDER, $errorText, FILE_APPEND);
        }

        return false;
    });
} catch (Exception $e) {
    echo $e->getMessage(), "\n";
}
