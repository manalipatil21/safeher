"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import T from "i18n-react";
import "../app/i18n";

export default function Footer() {
  const [langTrigger, setLangTrigger] = useState(0);

  useEffect(() => {
    const handleLangChange = () => setLangTrigger(prev => prev + 1);
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              SafeHer
            </span>
            <p className="mt-4 text-gray-400 max-w-sm">
              {T.translate("footer_desc")}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">{T.translate("quick_links")}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">{T.translate("nav_home")}</Link></li>
              <li><Link href="/emergency" className="text-gray-400 hover:text-purple-400 transition-colors">{T.translate("nav_emergency")}</Link></li>
              <li><Link href="/rights" className="text-gray-400 hover:text-purple-400 transition-colors">{T.translate("nav_rights")}</Link></li>
              <li><Link href="/chatbot" className="text-gray-400 hover:text-purple-400 transition-colors">{T.translate("nav_chatbot")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">{T.translate("contact")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: help@safeher.org</li>
              <li>Emergency: 1091 / 112</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SafeHer Legal Advisor. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">{T.translate("privacy")}</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">{T.translate("terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
