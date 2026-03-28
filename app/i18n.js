"use client";
import T from "i18n-react";
import en from "./translations/en.json";
import hi from "./translations/hi.json";
import mr from "./translations/mr.json";

export const translations = { en, hi, mr };

// Initialize default language STRICTLY to 'en' to match Server-side generation and prevent hydration mismatch errors.
// The actual saved language will be injected by the LanguageSwitcher after component mount.
T.setTexts(translations["en"]);

export const changeLanguage = (lang) => {
    T.setTexts(translations[lang]);
    if (typeof document !== "undefined") {
        localStorage.setItem("app_lang", lang);
        // Dispatch event to re-render components listening to language changes
        window.dispatchEvent(new Event("languageChanged"));
    }
};