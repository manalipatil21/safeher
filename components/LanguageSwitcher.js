"use client";
import { useState, useEffect } from "react";
import { changeLanguage } from "../app/i18n";
import T from "i18n-react";

export default function LanguageSwitcher() {
    const [currentLang, setCurrentLang] = useState("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("app_lang") || "en";
        setCurrentLang(savedLang);
        if (savedLang !== "en") {
            changeLanguage(savedLang);
        }

        const handleLangChange = () => {
            setCurrentLang(localStorage.getItem("app_lang") || "en");
        };
        window.addEventListener("languageChanged", handleLangChange);
        return () => window.removeEventListener("languageChanged", handleLangChange);
    }, []);

    const handleLanguageSelect = (lang) => {
        setCurrentLang(lang);
        changeLanguage(lang);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/50 backdrop-blur-md px-6 py-3 rounded-full border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <span className="text-gray-600 font-medium flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                {T.translate("language")}:
            </span>
            <div className="flex bg-gray-100/80 p-1 rounded-full border border-gray-200">
                <button 
                    onClick={() => handleLanguageSelect("en")}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${currentLang === 'en' ? 'bg-white text-purple-700 shadow-sm scale-105' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    English
                </button>
                <button 
                    onClick={() => handleLanguageSelect("hi")}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${currentLang === 'hi' ? 'bg-white text-purple-700 shadow-sm scale-105' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    हिंदी
                </button>
                <button 
                    onClick={() => handleLanguageSelect("mr")}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${currentLang === 'mr' ? 'bg-white text-purple-700 shadow-sm scale-105' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    मराठी
                </button>
            </div>
        </div>
    );
}