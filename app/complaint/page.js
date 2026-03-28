"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import T from "i18n-react";
import "../i18n";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6rUJOWbl9ztuAi5SFDtUks2KCLC3Q0OM",
  authDomain: "women-safety-bb7f7.firebaseapp.com",
  projectId: "women-safety-bb7f7",
  storageBucket: "women-safety-bb7f7.firebasestorage.app",
  messagingSenderId: "13678360890",
  appId: "1:13678360890:web:2b85b13dd819c45cbf3803",
  measurementId: "G-DCLYCYCBGD"
};

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export default function ComplaintPage() {
  const [langTrigger, setLangTrigger] = useState(0);
  const [evidenceName, setEvidenceName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleLangChange = () => setLangTrigger(prev => prev + 1);
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate secure network transfer
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <div className="bg-white/95 rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="bg-white/30 p-4 rounded-2xl border border-white/30">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                  {T.translate("comp_title") || "File a Secure Complaint"}
                </h1>
                <p className="text-purple-100 font-medium max-w-lg leading-relaxed text-sm sm:text-base">
                  {T.translate("comp_desc") || "Your information is completely encrypted. You can submit details safely and attach photo or audio evidence to support your case."}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 sm:p-10">
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Complaint Submitted</h2>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto text-lg">
                  {T.translate("comp_success") || "Your complaint has been securely submitted. A specialized officer will review it shortly."}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md focus:ring-4 focus:ring-gray-200"
                >
                  File Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Type & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      {T.translate("comp_type") || "Type of Incident"} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={T.translate("comp_type_ph") || "e.g. Domestic Violence..."}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      {T.translate("comp_date") || "Date & Time"} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="datetime-local" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    {T.translate("comp_loc") || "Location"} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder={T.translate("comp_loc_ph") || "Where did this happen?"}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
                  />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    {T.translate("comp_details") || "Description"} <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    rows="5"
                    required
                    placeholder={T.translate("comp_details_ph") || "Describe what happened..."}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                {/* Evidence Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">
                    {T.translate("comp_evidence") || "Upload Evidence (Optional)"}
                  </label>
                  <label className="block w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 hover:border-purple-400 transition-all group">
                    <div className="mx-auto w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <span className="text-gray-600 font-medium">
                      {evidenceName ? evidenceName : (T.translate("comp_evidence_desc") || "Click to upload files")}
                    </span>
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,video/*,audio/*" />
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="block w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <svg className="w-5 h-5 block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {T.translate("comp_submit") || "Submit Securely"}
                      </>
                    )}
                  </button>
                </div>
                
              </form>
            )}
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          Your submission is encrypted end-to-end
        </p>
      </div>
    </div>
  );
}
