"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import T from "i18n-react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import "../app/i18n";

export default function Home() {
  const [langTrigger, setLangTrigger] = useState(0);
  const [contactTab, setContactTab] = useState("ngo");

  useEffect(() => {
    const handleLangChange = () => setLangTrigger(prev => prev + 1);
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  const ngos = [
    { name: "iCall – TISS", phone: "+91-9152987821", type: "Mental Health & Legal Support", city: "Pan India", color: "purple" },
    { name: "Majlis Law", phone: "+91-22-23702787", type: "Women's Legal Rights", city: "Mumbai", color: "pink" },
    { name: "Sakhi – Women's Aid", phone: "+91-11-26517295", type: "Domestic Violence Support", city: "Delhi", color: "rose" },
    { name: "Snehi Foundation", phone: "+91-44-24640050", type: "Crisis Counselling", city: "Chennai", color: "blue" },
    { name: "Vimochana", phone: "+91-80-25496501", type: "Women's Rights Advocacy", city: "Bengaluru", color: "indigo" },
  ];

  const lawyers = [
    { name: "Adv. Flavia Agnes", phone: "+91-22-23702787", spec: "Family & Domestic Violence Law", city: "Mumbai", color: "purple" },
    { name: "Adv. Kamini Jaiswal", phone: "+91-11-23385700", spec: "Supreme Court – Women's Rights", city: "Delhi", color: "pink" },
    { name: "Adv. Indira Jaising", phone: "+91-11-24116427", spec: "Constitutional & Human Rights", city: "Delhi", color: "rose" },
    { name: "Adv. Meenakshi Arora", phone: "+91-11-23383714", spec: "Criminal & POCSO Law", city: "Delhi", color: "blue" },
    { name: "Legal Aid Helpline", phone: "15100", spec: "Free Legal Aid – NALSA", city: "Pan India", color: "green" },
    { name: "Bar Council Referral", phone: "+91-11-23382384", spec: "Lawyer Referral Service", city: "Pan India", color: "indigo" },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto animate-fade-in-up">
        <div className="bg-transparent flex flex-col">

          {/* Hero Section */}
          <div className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center mt-4">
              <div className="flex justify-center mb-10 w-full relative z-20">
                <LanguageSwitcher />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                {T.translate("hero_title_1")}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  {T.translate("hero_title_2")}
                </span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                {T.translate("hero_desc")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white">
                <Link href="/emergency" className="bg-red-500 hover:bg-red-600 w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2 animate-bounce">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  {T.translate("emergency_btn")}
                </Link>
                <Link href="/chatbot" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-purple-600/30 transition-all">
                  {T.translate("chatbot_btn")}
                </Link>
              </div>

              {/* Quick Actions Row */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
                  <Link href="/complaint" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-6 py-3 rounded-full text-base font-bold text-white shadow-lg hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    {T.translate("nav_complaint") || "File Complaint"}
                  </Link>
                  <Link href="/chatbot" className="bg-white/90 hover:bg-white w-full sm:w-auto px-6 py-3 rounded-full text-base font-bold text-purple-700 border border-purple-200 shadow-lg hover:shadow-purple-300/40 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    Chat with Lawyer
                  </Link>
                  <a href="#ngo-section" className="bg-white/90 hover:bg-white w-full sm:w-auto px-6 py-3 rounded-full text-base font-bold text-pink-600 border border-pink-200 shadow-lg hover:shadow-pink-300/40 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    NGO Help
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-1">All consultations are free &amp; confidential</p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Features Section */}
          <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{T.translate("features_title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/20 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all border border-purple-100/30 duration-300">
                  <div className="w-14 h-14 bg-purple-200 rounded-full flex items-center justify-center mb-6 text-purple-700 shadow-inner">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{T.translate("feat1_title")}</h3>
                  <p className="text-gray-600 mb-6">{T.translate("feat1_desc")}</p>
                  <Link href="/rights" className="text-purple-600 font-semibold hover:text-purple-800 flex items-center gap-1">
                    {T.translate("feat1_link")} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </Link>
                </div>
                <div className="bg-white/20 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all border border-pink-100/30 duration-300">
                  <div className="w-14 h-14 bg-pink-200 rounded-full flex items-center justify-center mb-6 text-pink-700 shadow-inner">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{T.translate("feat2_title")}</h3>
                  <p className="text-gray-600 mb-6">{T.translate("feat2_desc")}</p>
                  <Link href="/chatbot" className="text-pink-600 font-semibold hover:text-pink-800 flex items-center gap-1">
                    {T.translate("feat2_link")} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </Link>
                </div>
                <div className="bg-white/20 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all border border-red-100/30 duration-300">
                  <div className="w-14 h-14 bg-red-200 rounded-full flex items-center justify-center mb-6 text-red-700 shadow-inner">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{T.translate("feat3_title")}</h3>
                  <p className="text-gray-600 mb-6">{T.translate("feat3_desc")}</p>
                  <Link href="/emergency" className="text-red-600 font-semibold hover:text-red-800 flex items-center gap-1">
                    {T.translate("feat3_link")} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* NGO & Legal Contacts Section */}
          <div id="ngo-section" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block bg-purple-100/60 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">Legal Support Network</span>
                <h2 className="text-3xl font-bold text-gray-900">NGOs &amp; Legal Help Contacts</h2>
                <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">Connect directly with verified legal professionals and women&#39;s rights organizations across India.</p>
              </div>

              {/* Helplines */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Women Helpline", number: "1091", color: "pink", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                  { label: "Police Emergency", number: "112", color: "red", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
                  { label: "NCW Helpline", number: "7827170170", color: "purple", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 5h.01" },
                  { label: "Legal Aid", number: "15100", color: "blue", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
                ].map(({ label, number, color, icon }) => (
                  <a key={label} href={`tel:${number}`}
                    className={`bg-white/30 border border-${color}-100/40 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group`}>
                    <div className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center mb-3 text-${color}-600 group-hover:scale-110 transition-transform`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}></path></svg>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
                    <p className={`text-${color}-700 font-bold text-lg tracking-wide`}>{number}</p>
                  </a>
                ))}
              </div>

              {/* Tabbed Panel + Side Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Tabbed NGO / Lawyers */}
                <div className="lg:col-span-2 bg-white/30 border border-gray-100/40 rounded-2xl p-6">
                  <div className="flex gap-2 mb-6">
                    <button onClick={() => setContactTab("ngo")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${contactTab === "ngo" ? "bg-pink-500 text-white shadow" : "bg-white/50 text-gray-600 hover:bg-white/80"}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      NGOs
                    </button>
                    <button onClick={() => setContactTab("lawyers")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${contactTab === "lawyers" ? "bg-purple-600 text-white shadow" : "bg-white/50 text-gray-600 hover:bg-white/80"}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
                      Lawyers
                    </button>
                  </div>

                  {contactTab === "ngo" && (
                    <div className="space-y-3">
                      {ngos.map(({ name, phone, type, city, color }) => (
                        <div key={name} className="flex items-center justify-between p-3.5 bg-white/40 rounded-xl border border-gray-100/30 hover:bg-white/70 transition-all">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 bg-${color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                              <span className={`text-${color}-600 font-bold text-sm`}>{name[0]}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{name}</p>
                              <p className="text-xs text-gray-400">{type} · {city}</p>
                            </div>
                          </div>
                          <a href={`tel:${phone.replace(/[\s-]/g, "")}`}
                            className="flex items-center gap-1.5 bg-green-50 hover:bg-green-500 text-green-700 hover:text-white border border-green-200 text-xs font-bold px-3 py-1.5 rounded-full transition-all flex-shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            Call
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {contactTab === "lawyers" && (
                    <div className="space-y-3">
                      {lawyers.map(({ name, phone, spec, city, color }) => (
                        <div key={name} className="flex items-center justify-between p-3.5 bg-white/40 rounded-xl border border-gray-100/30 hover:bg-white/70 transition-all">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 bg-${color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                              <svg className={`w-4 h-4 text-${color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{name}</p>
                              <p className="text-xs text-gray-400">{spec} · {city}</p>
                              <p className={`text-xs font-bold text-${color}-600 mt-0.5`}>{phone}</p>
                            </div>
                          </div>
                          <a href={`tel:${phone.replace(/[\s-]/g, "")}`}
                            className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 text-xs font-bold px-3 py-1.5 rounded-full transition-all flex-shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            Call
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side: Chat + File Complaint */}
                <div className="flex flex-col gap-4">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-6 text-white flex flex-col shadow-lg">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Chat with a Lawyer</h3>
                    <p className="text-white/80 text-sm mb-6">Get instant legal guidance from our AI Legal Advisor, trained on Indian women&#39;s rights and safety laws.</p>
                    <Link href="/chatbot" className="bg-white text-purple-700 hover:bg-purple-50 font-bold text-center py-3 px-6 rounded-full transition-all hover:shadow-lg text-sm">
                      Start Free Consultation →
                    </Link>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-white/70 text-xs text-center">🔒 Confidential &amp; Secure</p>
                    </div>
                  </div>

                  <Link href="/complaint" className="bg-white/30 border border-blue-100/40 hover:bg-white/60 rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">File a Complaint</p>
                      <p className="text-xs text-gray-500">Document your case securely</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}