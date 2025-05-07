"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { getConfig } from "@/lib/config"
import { useDynamicTheme } from '@/lib/useDynamicTheme';

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const config = getConfig()
    useDynamicTheme(config.basic.avatar)

    return <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        forcedTheme={props.forcedTheme}
        themes={["light", "dark"]}
        {...props}
    >
        {children}
    </NextThemesProvider>
}
