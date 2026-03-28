"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import T from "i18n-react";
import "../i18n";

export default function AuthPage() {
  const [langTrigger, setLangTrigger] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const handleLangChange = () => setLangTrigger(prev => prev + 1);
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`${T.translate("auth_logging_in") || "Logging in as"} ${formData.email}...`);
      // In a real app, integrate authentication here
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert(T.translate("auth_pwd_mismatch") || "Passwords do not match!");
        return;
      }
      alert(`${T.translate("auth_signing_up") || "Signing up"} ${formData.name} ...`);
      // In a real app, integrate user registration here
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full space-y-8 bg-white/90 p-10 rounded-[2.5rem] shadow-2xl border border-white/50 relative z-10 transition-all duration-500">
        <div>
          <div className="mx-auto h-24 w-24 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(219,39,119,0.4)] transform hover:scale-110 hover:rotate-12 transition-all duration-500 relative group">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-xl transition-all"></div>
            <svg className="h-12 w-12 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isLogin ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              )}
            </svg>
          </div>
          <h2 className="mt-8 text-center text-4xl font-black text-gray-900 tracking-tight">
            {isLogin ? (T.translate("auth_welcome") || "Welcome Back") : (T.translate("auth_join") || "Join SafeHer")}
          </h2>
          <p className="mt-3 text-center text-base text-gray-600 font-medium">
            {isLogin ? (T.translate("auth_login_sub") || "Sign in to access your secure profile.") : (T.translate("auth_signup_sub") || "Create a protected account for personalized legal safety.")}
          </p>
        </div>
        
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {!isLogin && (
              <div className="animate-fade-in-up">
                <label className="sr-only" htmlFor="name">{T.translate("auth_name")}</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    className="block w-full px-4 py-4 pl-12 bg-white/80 border-2 border-purple-100 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-0 focus:border-purple-500 focus:bg-white transition-all shadow-sm hover:border-purple-300 text-lg"
                    placeholder={T.translate("auth_name") || "Full Name"}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            
            <div className="animate-fade-in-up" style={{animationDelay: "0.1s"}}>
              <label className="sr-only" htmlFor="email">{T.translate("auth_email")}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-4 pl-12 bg-white/80 border-2 border-purple-100 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-0 focus:border-purple-500 focus:bg-white transition-all shadow-sm hover:border-purple-300 text-lg"
                  placeholder={T.translate("auth_email") || "Email address"}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="animate-fade-in-up" style={{animationDelay: "0.2s"}}>
              <label className="sr-only" htmlFor="password">{T.translate("auth_pass")}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-4 pl-12 bg-white/80 border-2 border-purple-100 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-0 focus:border-purple-500 focus:bg-white transition-all shadow-sm hover:border-purple-300 text-lg"
                  placeholder={T.translate("auth_pass") || "Password"}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="animate-fade-in-up" style={{animationDelay: "0.3s"}}>
                <label className="sr-only" htmlFor="confirmPassword">{T.translate("auth_confirm_pass")}</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    className="block w-full px-4 py-4 pl-12 bg-white/80 border-2 border-purple-100 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-0 focus:border-purple-500 focus:bg-white transition-all shadow-sm hover:border-purple-300 text-lg"
                    placeholder={T.translate("auth_confirm_pass") || "Confirm Password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer transition-colors"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                {T.translate("auth_remember") || "Remember me"}
              </label>
            </div>

            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                  {T.translate("auth_forgot") || "Forgot password?"}
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transform transition-all active:scale-[0.98]"
            >
              {isLogin ? (T.translate("auth_signin_btn") || "Sign in") : (T.translate("auth_signup_btn") || "Create Account")}
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-600">
            {isLogin ? (T.translate("auth_new_user") || "New to SafeHer?") : (T.translate("auth_existing") || "Already have an account?")}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-purple-600 hover:text-purple-500 transition-colors focus:outline-none focus:underline"
            >
              {isLogin ? (T.translate("auth_create_link") || "Create an account") : (T.translate("auth_signin_link") || "Sign in instead")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
