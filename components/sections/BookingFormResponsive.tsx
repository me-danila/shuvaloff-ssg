"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";

export function BookingFormDesktop() {
    const isDesktop = useMediaQuery("(min-width: 1280px)");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // По умолчанию на сервере и до гидратации рендерим как для десктопа
    if (!mounted) return <BookingForm />;

    if (!isDesktop) return null;

    return <BookingForm />;
}

export function BookingFormMobile() {
    const isDesktop = useMediaQuery("(min-width: 1280px)");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || isDesktop) return null;

    return <BookingForm />;
}
