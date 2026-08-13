<?php declare(strict_types=1);

namespace ModulePriceLoad\models;

class RoomType
{
    private $guests;
    private $guestsDiscount;
    private $minPrice;
    private $minDiscountPrice;
    private $extraPlacementPrice;

    public function __construct()
    {
        $this->minPrice = new Price();
        $this->minDiscountPrice = new Price();
        $this->extraPlacementPrice = new Price();
    }

    public function setMinPrice(float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->minPrice->setPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function setMinDiscountPrice(float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->minDiscountPrice->setPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function getMinPrice(string $currency): ?float
    {
        return $this->minPrice->getPrice($currency);
    }

    public function getMinDiscountPrice(string $currency): ?float
    {
        return $this->minDiscountPrice->getPrice($currency);
    }

    public function getMinPriceValues(): ?array
    {
        return $this->minPrice->getPriceValues();
    }

    public function getMinDiscountPriceValues(): ?array
    {
        return $this->minDiscountPrice->getPriceValues();
    }

    public function getMinPriceDate(): string
    {
        return $this->minPrice->getDate();
    }

    public function getMinPriceMinLos(): int
    {
        return $this->minPrice->getMinLos();
    }

    public function getMinPriceRatePlaneCode(): int
    {
        return $this->minPrice->getRatePlanCode();
    }

    public function getMinPriceRestoreStatus(): bool
    {
        return $this->minPrice->getRestoreStatus();
    }

    public function getMinPriceFillStatus(): bool
    {
        return $this->minPrice->getFilledStatus();
    }

    public function setPrice(int $capacity, float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        if (!isset($this->guests[$capacity]) || !($this->guests[$capacity] instanceof Price)) {
            $this->guests[$capacity] = new Price();
        }

        $this->guests[$capacity]->setPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function setDiscountPrice(int $capacity, float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        if (!isset($this->guestsDiscount[$capacity]) || !($this->guestsDiscount[$capacity] instanceof Price)) {
            $this->guestsDiscount[$capacity] = new Price();
        }

        $this->guestsDiscount[$capacity]->setPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function getPrice(int $capacity, string $currency): ?float
    {
        if (isset($this->guests[$capacity])) {
            return ($this->guests[$capacity] instanceof Price)
                ? $this->guests[$capacity]->getPrice($currency)
                : null;
        } else {
            return null;
        }
    }

    public function getDiscountPrice(int $capacity, string $currency): ?float
    {
        if (isset($this->guestsDiscount[$capacity])) {
            return ($this->guestsDiscount[$capacity] instanceof Price)
                ? $this->guestsDiscount[$capacity]->getPrice($currency)
                : null;
        } else {
            return null;
        }
    }

    public function getCapacities(): ?array
    {
        return $this->guests;
    }

    public function getCapacity(int $capacity): ?Price
    {
        return $this->guests[$capacity] ?? null;
    }

    public function getDiscountCapacity(int $capacity): ?Price
    {
        return $this->guestsDiscount[$capacity] ?? null;
    }

    public function sortCapacities(): void
    {
        ksort($this->guests);
        if ($this->guestsDiscount) {
            ksort($this->guestsDiscount);
        }
    }

    public function getPriceValues(Price $priceModel): ?array
    {
        return $priceModel->getPriceValues();
    }

    public function getDiscountPriceValues(Price $priceModel): ?array
    {
        return $priceModel->getPriceValues();
    }

    public function getPriceDate(Price $priceModel): string
    {
        return $priceModel->getDate();
    }

    public function getPriceMinLos(Price $priceModel): int
    {
        return $priceModel->getMinLos();
    }

    public function getPriceRatePlanCode(Price $priceModel): int
    {
        return $priceModel->getRatePlanCode();
    }

    public function setPriceRestoreStatus(Price $priceModel): void
    {
        $priceModel->setRestoreStatus();
    }

    public function getPriceRestoreStatus(Price $priceModel): bool
    {
        return $priceModel->getRestoreStatus();
    }

    public function setPriceFillStatus(Price $priceModel): void
    {
        $priceModel->setFilledStatus();
    }

    public function getPriceFillStatus(Price $priceModel): bool
    {
        return $priceModel->getFilledStatus();
    }

    public function setExtraPlacementPrice(float $price, string $currency, string $date, int $minLos, int $ratePlanCode, bool $isRestored = false, bool $isFilled = false): void
    {
        $this->extraPlacementPrice->setPrice($price, $currency, $date, $minLos, $ratePlanCode, $isRestored, $isFilled);
    }

    public function getExtraPlacementPrice(string $currency): ?float
    {
        return $this->extraPlacementPrice->getPrice($currency);
    }

    public function getExtraPlacementPriceValues(): ?array
    {
        return $this->extraPlacementPrice->getPriceValues();
    }
}
