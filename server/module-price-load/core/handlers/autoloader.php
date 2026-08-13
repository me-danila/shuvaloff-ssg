<?php declare(strict_types=1);

try {
    spl_autoload_register(function ($className) {
        $modulePriceLoadNamespace = 'ModulePriceLoad';

        if (strpos($className, $modulePriceLoadNamespace) === 0) {
            $className = str_replace('\\', DIRECTORY_SEPARATOR, $className);
            require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . str_replace($modulePriceLoadNamespace, '', $className) . '.php';
        }
    });
} catch (Exception $e) {
    echo $e->getMessage(), "\n";
}
