"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import Image from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/routing";
import { localizeHref } from "@/lib/i18n/routing";

type SpecialOfferBaseItem = {
    title: string;
    subtitle: string;
    mediaObjectPosition?: string;
    /**
     * Deprecated alias kept for existing image cards.
     * Use mediaObjectPosition for both image and video backgrounds.
     */
    imgObjectPosition?: string;
    modal: {
        content: React.ReactNode;
        buttonText: string;
        buttonHref: string;
        price?: string;
    };
};

export type SpecialOfferItem = SpecialOfferBaseItem &
    (
        | {
              imgUrl: string;
              videoUrl?: never;
          }
        | {
              videoUrl: string;
              imgUrl?: never;
          }
    );

type Props = {
    offers: SpecialOfferItem[];
    locale: Locale;
};

function SpecialOfferBackground({ offer }: { offer: SpecialOfferItem }) {
    const objectPosition =
        offer.mediaObjectPosition ?? offer.imgObjectPosition ?? undefined;
    const style = objectPosition ? { objectPosition } : undefined;

    if ("videoUrl" in offer && offer.videoUrl) {
        return (
            <video
                src={offer.videoUrl}
                className="absolute inset-0 h-full w-full object-cover"
                style={style}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                tabIndex={-1}
                aria-hidden="true"
            />
        );
    }

    const imageUrl = "imgUrl" in offer ? offer.imgUrl : undefined;

    if (!imageUrl) {
        return null;
    }

    return (
        <Image
            src={imageUrl}
            alt={offer.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover"
            style={style}
        />
    );
}

export default function SpecialOffersSection({ offers, locale }: Props) {
    const [selectedOffer, setSelectedOffer] = useState<SpecialOfferItem | null>(
        null,
    );

    return (
        <>
            <StaggerContainer className="grid grid-cols-1 gap-4 md:flex md:overflow-x-auto md:gap-4 md:pb-2 rounded-lg">
                {offers.map((offer) => (
                    <StaggerItem
                        key={offer.title}
                        className="relative aspect-square rounded-md overflow-hidden group flex cursor-pointer md:w-100 md:shrink-0"
                        onClick={() => setSelectedOffer(offer)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedOffer(offer);
                            }
                        }}
                        tabIndex={0}
                        aria-haspopup="dialog"
                        aria-expanded={selectedOffer?.title === offer.title}
                    >
                        <SpecialOfferBackground offer={offer} />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/50" />
                        <div className="absolute inset-0 flex flex-col justify-between text-white p-6 xl:p-8">
                            <h2 className="font-baskerville uppercase leading-tight xl:text-2xl">
                                {offer.title}
                            </h2>
                            {offer.subtitle && (
                                <p className="text-sm text-white/90">
                                    {offer.subtitle}
                                </p>
                            )}
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <Modal
                open={Boolean(selectedOffer)}
                onClose={() => setSelectedOffer(null)}
            >
                {selectedOffer && (
                    <div className="flex flex-col gap-6 m-6 xl:m-8">
                        <h2 className="font-baskerville text-xl xl:text-2xl uppercase">
                            {selectedOffer.title}:
                        </h2>
                        <div className="space-y-2">
                            {selectedOffer.modal.content}
                        </div>
                        <div className="flex items-center gap-4 mt-2 xl:mt-4">
                            <Button
                                href={localizeHref(
                                    selectedOffer.modal.buttonHref,
                                    locale,
                                )}
                                target="_blank"
                            >
                                {selectedOffer.modal.buttonText}
                            </Button>
                            {selectedOffer.modal.price && (
                                <span className="text-sm text-gray-600">
                                    {selectedOffer.modal.price}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
