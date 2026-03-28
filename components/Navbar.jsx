"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import T from "i18n-react";
import "../app/i18n";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langTrigger, setLangTrigger] = useState(0);
  const { currentUser, userProfile, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleLangChange = () => setLangTrigger(prev => prev + 1);
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const firstName = userProfile?.name?.split(" ")[0] || currentUser?.email?.split("@")[0] || "User";

  const navLinks = [
    {
      name: T.translate("nav_home"),
      path: "/",
      icon: <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    {
      name: T.translate("nav_emergency"),
      path: "/emergency",
      icon: <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    },
    {
      name: T.translate("nav_rights") || "Rights",
      path: "/rights",
      icon: <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    {
      name: T.translate("nav_chatbot") || "Chatbot",
      path: "/chatbot",
      icon: <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
    },
    ...(currentUser ? [{
      name: "My Complaints",
      path: "/my-complaints",
      icon: <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    }] : []),
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 relative">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-1.5 rounded-xl shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                Safe<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Her</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}
                className="flex items-center text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                {link.icon}{link.name}
              </Link>
            ))}

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-purple-50 border border-purple-100 px-3 py-2 rounded-full">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {firstName[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-purple-700">{firstName}</span>
                </div>
                <button onClick={handleLogout}
                  className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-full hover:bg-red-50">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login"
                className="bg-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {T.translate("nav_login")}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                {link.icon}{link.name}
              </Link>
            ))}
            {currentUser ? (
              <div className="flex items-center justify-between px-3 py-3 mt-2 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {firstName[0].toUpperCase()}
                  </div>
                  <span className="font-bold text-purple-700">{firstName}</span>
                </div>
                <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700">Logout</button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-3 mt-4 rounded-xl text-base font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-md">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {T.translate("nav_login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
