"use client";

import { useState, useEffect } from "react";

/**
 * useMobile — Detects if the viewport is mobile-sized.
 * Used to disable heavy 3D effects on mobile for performance.
 *
 * @param breakpoint - Max width considered mobile (default: 768)
 */
export function useMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();

        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);

    return isMobile;
}
