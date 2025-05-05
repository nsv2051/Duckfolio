"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/packages/ui/button"

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // 确保组件挂载后才渲染，避免水合不匹配
    useEffect(() => {
        setMounted(true)
    }, [])

    // 点击切换主题
    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    if (!mounted) {
        return null
    }

    return (

        <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
            <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-primary/20 hover:border-primary/40 hover:scale-105 transition-all duration-300 ease-in-out"
            >
                {resolvedTheme === "dark" ? (
                    <Sun className="h-[1.2rem] w-[1.2rem] text-primary" />
                ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
                )}
            </Button>
        </motion.div>

    )
}