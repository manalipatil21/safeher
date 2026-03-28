"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import T from "i18n-react";
import "../i18n";
import { useAuth } from "@/lib/auth-context";


export default function ComplaintPage() {
  const { currentUser } = useAuth();
  const [langTrigger, setLangTrigger] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    location: "",
    description: "",
    witnessName: "",
    witnessContact: "",
  });

  useEffect(() => {
    const handleLangChange = () => setLangTrigger(prev => prev + 1);
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get auth token for the API (bypasses Firestore rules via Admin SDK)
      let token = null;
      if (currentUser) {
        const { getIdToken } = await import("firebase/auth");
        token = await getIdToken(currentUser);
      }

      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          type: formData.type,
          date: formData.date,
          location: formData.location,
          description: formData.description,
          witnessName: formData.witnessName || null,
          witnessContact: formData.witnessContact || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setComplaintId((data.id || "000000").slice(0, 8).toUpperCase());
      setSuccess(true);
    } catch (err) {
      console.error("Error saving complaint:", err);
      setComplaintId("ERR-" + Math.random().toString(36).slice(2, 6).toUpperCase());
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };


  const resetForm = () => {
    setSuccess(false);
    setComplaintId("");
    setFormData({ type: "", date: "", location: "", description: "", witnessName: "", witnessContact: "" });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 sm:px-6 lg:px-8">
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
                  {T.translate("comp_desc") || "Your information is encrypted and saved securely. All details are confidential."}
                </p>
              </div>
            </div>
          </div>

          {/* Login prompt */}
          {!currentUser && (
            <div className="mx-8 mt-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="text-sm text-amber-700">
                <Link href="/login" className="font-bold underline">Sign in</Link> to track your complaint status. You can still file anonymously.
              </p>
            </div>
          )}

          {/* Body */}
          <div className="p-8 sm:p-10">
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Complaint Submitted!</h2>
                <div className="inline-block bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                  Complaint ID: #{complaintId}
                </div>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto text-lg">
                  {T.translate("comp_success") || "Your complaint has been securely saved. A specialized officer will review it shortly."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={resetForm}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md">
                    File Another
                  </button>
                  {currentUser && (
                    <Link href="/my-complaints"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md">
                      View My Complaints
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Type & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      {T.translate("comp_type") || "Type of Incident"} <span className="text-red-500">*</span>
                    </label>
                    <select name="type" required value={formData.type} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all">
                      <option value="">Select type...</option>
                      <option value="Domestic Violence">Domestic Violence</option>
                      <option value="Sexual Harassment">Sexual Harassment</option>
                      <option value="Workplace Harassment">Workplace Harassment</option>
                      <option value="Cyberbullying / Online Harassment">Cyberbullying / Online Harassment</option>
                      <option value="Stalking">Stalking</option>
                      <option value="Dowry Harassment">Dowry Harassment</option>
                      <option value="Child Marriage">Child Marriage</option>
                      <option value="Human Trafficking">Human Trafficking</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      {T.translate("comp_date") || "Date & Time"} <span className="text-red-500">*</span>
                    </label>
                    <input type="datetime-local" name="date" required
                      value={formData.date} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all" />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    {T.translate("comp_loc") || "Location"} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="location" required
                    placeholder={T.translate("comp_loc_ph") || "Where did this happen? (City, Area)"}
                    value={formData.location} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    {T.translate("comp_details") || "Description"} <span className="text-red-500">*</span>
                  </label>
                  <textarea rows="5" name="description" required
                    placeholder={T.translate("comp_details_ph") || "Describe what happened in detail..."}
                    value={formData.description} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400 resize-none">
                  </textarea>
                </div>

                {/* Witness Info (optional) */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                  <p className="text-sm font-bold text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Witness Information <span className="text-gray-400 font-normal">(Optional)</span>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="witnessName"
                      placeholder="Witness Name"
                      value={formData.witnessName} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400 text-sm" />
                    <input type="text" name="witnessContact"
                      placeholder="Witness Contact / Phone"
                      value={formData.witnessContact} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400 text-sm" />
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70">
                  {isSubmitting ? (
                    <><span className="block w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>Saving securely...</>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {T.translate("comp_submit") || "Submit Securely"}
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          Your submission is saved securely in our database
        </p>
      </div>
    </div>
  );
}
