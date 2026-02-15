"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalComIntegration() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "30min" });
            cal("ui", {
                cssVarsPerTheme: {
                    light: { "cal-brand": "#292929" },
                    dark: { "cal-brand": "#c9915a" },
                },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, []);

    return null;
}
