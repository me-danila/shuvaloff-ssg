<?php declare(strict_types=1);

namespace ModulePriceLoad\models;

use ModulePriceLoad\utils\Tools;

class DatePeriod
{
    private $startDate;
    private $endDate;

    public function __construct(string $startDate, string $endDate)
    {
        $this->startDate = Tools::formatDate($startDate);
        $this->endDate = Tools::formatDate($endDate);
    }

    public function getPeriod(): array
    {
        return [$this->startDate, $this->endDate];
    }

    public function getStartDate(): string
    {
        return $this->startDate;
    }

    public function getEndDate(): string
    {
        return $this->endDate;
    }
}
