"use client"

import type React from "react"

import { useLanguage } from "../contexts/LanguageContext"
import { Button } from "@/components/ui/button"

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button onClick={() => setLanguage(language === "de" ? "en" : "de")} variant="outline" size="sm">
        {language === "de" ? "EN" : "DE"}
      </Button>
    </div>
  )
}

