import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import NotFoundPage from "@/components/pages/NotFoundPage";

export const metadata: Metadata = {
    title: "Page not found — ACADEMIA Mansion Shuvaloff — Official website",
};

// app/en/layout.tsx no longer holds the chrome (it moved to app/en/(site)), so
// the EN 404 wraps itself in the EN shell explicitly.
export default function EnNotFound() {
    return (
        <SiteShell locale="en">
            <NotFoundPage locale="en" />
        </SiteShell>
    );
}
