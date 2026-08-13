<?php declare(strict_types=1);

namespace ModulePriceLoad\models;

class Price
{
    private $value;
    private $date;
    private $minLos;
    private $ratePlanCode;
    private $isRestored;
    private $isFilled;

    public function setPrice(float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->value[$currency] = $price;
        $this->date = $date;
        $this->minLos = $minLos;
        $this->ratePlanCode = $ratePlanCode;
        $this->isRestored = $isRestored;
        $this->isFilled = $isFilled;
    }

    public function getPrice(string $currency): ?float
    {
        return $this->value[$currency] ?? null;
    }

    public function getPriceValues(): ?array
    {
        return $this->value ?? null;
    }

    public function getDate(): string
    {
        return $this->date;
    }

    public function getMinLos(): int
    {
        return $this->minLos;
    }

    public function getRatePlanCode(): int
    {
        return $this->ratePlanCode;
    }

    public function setRestoreStatus(): void
    {
        $this->isRestored = true;
    }

    public function getRestoreStatus(): bool
    {
        return $this->isRestored;
    }

    public function setFilledStatus(): void
    {
        $this->isFilled = true;
    }

    public function getFilledStatus(): bool
    {
        return $this->isFilled;
    }
}
