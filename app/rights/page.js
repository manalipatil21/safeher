"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import T from "i18n-react";
import { translations } from "../i18n";

export default function RightsPage() {
  const [selectedRight, setSelectedRight] = useState(null);
  const [langTrigger, setLangTrigger] = useState(0);

  useEffect(() => {
    const handleLangChange = () => setLangTrigger(prev => prev + 1);
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedRight) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedRight]);

  const lang = typeof window !== "undefined" ? (localStorage.getItem("app_lang") || "en") : "en";
  const rightsCategories = translations[lang]?.rights_list || translations["en"].rights_list;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full relative border-t-4 border-transparent">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">{T.translate("rights_title")}</h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed px-4">
          {T.translate("rights_desc")}
        </p>
      </div>

      {/* Grid of Rights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {rightsCategories.map((right) => (
          <button
            key={right.id}
            onClick={() => setSelectedRight(right)}
            className={`rounded-3xl p-6 md:p-8 border text-left flex flex-col h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-200 cursor-pointer ${right.color}`}
          >
            <div className="text-4xl mb-6 bg-white/60 w-16 h-16 rounded-2xl flex justify-center items-center shadow-sm">{right.icon}</div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">{right.title}</h3>
            <p className="opacity-90 leading-relaxed flex-grow text-sm md:text-base">
              {right.shortDesc}
            </p>
            <div className="mt-8 text-sm font-bold uppercase tracking-wider flex items-center gap-2 group opacity-80 hover:opacity-100">
              {T.translate("rights_learn")}
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
            </div>
          </button>
        ))}
      </div>

      {/* Call to action */}
      <div className="mt-16 md:mt-24 bg-gradient-to-br from-gray-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">{T.translate("rights_cta_title")}</h2>
          <p className="text-indigo-100 mb-10 max-w-2xl mx-auto text-base md:text-lg">
            {T.translate("rights_cta_desc")}
          </p>
          <Link
            href="/chatbot"
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 md:px-12 rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            {T.translate("rights_cta_btn")}
          </Link>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedRight && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/80 transition-opacity">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedRight(null)}
          ></div>

          <div className="relative bg-white/95 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl animate-fade-in-up">

            {/* Modal Header */}
            <div className={`px-6 py-6 md:px-8 border-b flex items-start justify-between ${selectedRight.color.split(' ')[0]} ${selectedRight.color.split(' ')[1]}`}>
              <div className="flex items-center gap-4">
                <div className="text-4xl bg-white/60 w-14 h-14 rounded-full flex justify-center items-center shadow-sm">
                  {selectedRight.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold pr-4">{selectedRight.title}</h2>
              </div>
              <button
                onClick={() => setSelectedRight(null)}
                className="bg-black/5 hover:bg-black/10 p-2 rounded-full transition-colors flex-shrink-0"
                aria-label="Close details"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <p className="text-gray-600 text-lg mb-8 font-medium border-l-4 border-gray-200 pl-4 py-1">
                {selectedRight.shortDesc}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {T.translate("rights_detail")}
              </h3>

              <ul className="space-y-4 md:space-y-6">
                {selectedRight.fullDetails.map((detail, idx) => {
                  const [boldPart, restPart] = detail.split(': ');
                  return (
                    <li key={idx} className="flex items-start bg-gray-50 rounded-2xl p-4 md:p-5 border border-gray-100">
                      <div className="mt-1 mr-4 bg-purple-100 text-purple-700 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <p className="text-gray-700 text-base md:text-lg">
                        {restPart ? (
                          <>
                            <span className="font-bold text-gray-900">{boldPart}: </span>
                            {restPart}
                          </>
                        ) : (
                          <span className="font-bold text-gray-900">{detail}</span>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedRight(null)}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-colors w-full sm:w-auto"
              >
                {T.translate("rights_close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
