import type { Metadata } from "next";
import NotFoundPage from "@/components/pages/NotFoundPage";

export const metadata: Metadata = {
    title: "Page not found — ACADEMIA Mansion Shuvaloff — Official website",
};

export default function EnNotFound() {
    return <NotFoundPage locale="en" />;
}
