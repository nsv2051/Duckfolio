"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue } from "framer-motion"

export function CustomCursor() {
    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)
    const [clicked, setClicked] = useState(false)
    const [linkHovered, setLinkHovered] = useState(false)
    const [hidden, setHidden] = useState(true)
    const requestRef = useRef<number | null>(null)
    const previousTimeRef = useRef<number | null>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setHidden(false)
        }, 1000)

        let mouseX = 0
        let mouseY = 0

        const updatePosition = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            if (!requestRef.current) {
                requestRef.current = requestAnimationFrame(animateCursor)
            }
        }

        const animateCursor = (time: number) => {
            if (previousTimeRef.current !== null) {
                const currentX = cursorX.get()
                const currentY = cursorY.get()
                const speedFactor = 0.2 // 调整此值可以控制跟随速度

                cursorX.set(currentX + (mouseX - currentX) * speedFactor)
                cursorY.set(currentY + (mouseY - currentY) * speedFactor)
            }

            previousTimeRef.current = time
            requestRef.current = requestAnimationFrame(animateCursor)
        }

        const handleMouseDown = () => setClicked(true)
        const handleMouseUp = () => setClicked(false)

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest("a, button, [role=button], input, label, [data-hoverable]")) {
                setLinkHovered(true)
            } else {
                setLinkHovered(false)
            }
        }

        const handleMouseLeave = () => setHidden(true)
        const handleMouseEnter = () => setHidden(false)

        window.addEventListener("mousemove", updatePosition, { passive: true })
        window.addEventListener("mouseover", handleMouseOver, { passive: true })
        window.addEventListener("mousedown", handleMouseDown, { passive: true })
        window.addEventListener("mouseup", handleMouseUp, { passive: true })
        window.addEventListener("mouseleave", handleMouseLeave)
        window.addEventListener("mouseenter", handleMouseEnter)

        document.body.classList.add("custom-cursor")

        return () => {
            clearTimeout(timeout)
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
            window.removeEventListener("mousemove", updatePosition)
            window.removeEventListener("mouseover", handleMouseOver)
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mouseup", handleMouseUp)
            window.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("mouseenter", handleMouseEnter)
            document.body.classList.remove("custom-cursor")
        }
    }, [cursorX, cursorY])

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: -4,
                    y: -4
                }}
                animate={{
                    scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
                    opacity: hidden ? 0 : 1
                }}
                transition={{
                    scale: { type: "spring", stiffness: 300, damping: 25 },
                    opacity: { duration: 0.2 }
                }}
            />
            <motion.div
                className="cursor-ring"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: -16,
                    y: -16
                }}
                animate={{
                    scale: clicked ? 0.7 : linkHovered ? 1.3 : 1,
                    opacity: hidden ? 0 : linkHovered ? 0.4 : 0.7
                }}
                transition={{
                    scale: { type: "spring", stiffness: 150, damping: 15 },
                    opacity: { duration: 0.2 }
                }}
            />
        </>
    )
}