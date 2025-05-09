"use client"

import { useProfileStore } from "@/lib/store"
import { useState, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/layout/Navigation"
import { Profile } from "@/components/layout/Profile"
import { Links } from "@/components/links/Links"
import { Footer } from "@/components/layout/Footer"

export const runtime = "edge"

export default function Home() {
  const { profile, socialLinks, websiteLinks } = useProfileStore()
  const [activeSection, setActiveSection] = useState("profile")
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full text-[#121212] dark:text-[#f0f0f0] overflow-hidden flex flex-col"
    >
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main content */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 md:px-8 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto flex flex-col">
        <AnimatePresence mode="wait">
          {activeSection === "profile" ? (
            <Profile profile={profile} socialLinks={socialLinks} />
          ) : (
            <Links websiteLinks={websiteLinks} />
          )}
        </AnimatePresence>
      </main>

      <Footer name={profile.name} />
    </div>
  )
}
