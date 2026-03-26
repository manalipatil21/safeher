"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function RightsPage() {
  const [selectedRight, setSelectedRight] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedRight) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedRight]);

  const rightsCategories = [
    {
      id: "domestic-violence",
      title: "Protection from Domestic Violence",
      shortDesc: "The Protection of Women from Domestic Violence Act, 2005 ensures civil remedies to stop violence and get protection orders.",
      fullDetails: [
        "What it covers: Physical, emotional, verbal, sexual, and economic abuse by any male member or relatives in a shared household.",
        "Your Rights: Right to reside in a shared household, protection orders, monetary relief, and custody of children.",
        "How to act: You can file a complaint with the Protection Officer or the nearest police station. You have the right to free legal aid.",
        "Key aspect: It provides urgent civil relief (like a restraining order) alongside criminal proceedings if necessary."
      ],
      icon: "🏠",
      color: "bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-400"
    },
    {
      id: "workplace-harassment",
      title: "Workplace Harassment",
      shortDesc: "The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 mandates internal complaints committees.",
      fullDetails: [
        "What it covers: Any unwelcome sexual behavior, whether direct or implied, including physical contact, demands for sexual favors, or sexually colored remarks.",
        "Your Rights: Every workplace with 10+ employees must have an Internal Complaints Committee (ICC).",
        "How to act: File a written complaint to the ICC within 3 months of the incident. Conciliation is an option before formal inquiry.",
        "Protection: Employer cannot fire you for raising a complaint. Identity of the complainant must be kept strictly confidential."
      ],
      icon: "💼",
      color: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400"
    },
    {
      id: "maternity",
      title: "Maternity Benefits",
      shortDesc: "Maternity Benefit Act provides 26 weeks of paid maternity leave for women working in establishments with 10 or more employees.",
      fullDetails: [
        "What it covers: Financial and employment protection during pregnancy and after childbirth.",
        "Your Rights: 26 weeks of paid leave for the first two children (12 weeks for subsequent children).",
        "Additions: Creche facilities are mandatory for establishments with 50+ employees.",
        "Protection: It is illegal for an employer to dismiss a woman while she is on maternity leave."
      ],
      icon: "👶",
      color: "bg-green-50 text-green-700 border-green-200 hover:border-green-400"
    },
    {
      id: "equal-pay",
      title: "Right to Equal Pay",
      shortDesc: "Equal Remuneration Act guarantees equal pay for equal work for both men and women without discrimination in employment.",
      fullDetails: [
        "What it covers: Prevents discrimination in wages on the basis of gender.",
        "Your Rights: You must be paid exactly the same as a male colleague doing the same or similar nature of work.",
        "How to act: If facing discrimination, report it to the Labour Commissioner or a dedicated tribunal.",
        "Key Aspect: This applies to basic wages as well as all other allowances and bonuses."
      ],
      icon: "💰",
      color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:border-yellow-400"
    },
    {
      id: "anonymity",
      title: "Right to Anonymity",
      shortDesc: "Victims of sexual assault have the right to anonymity to protect their privacy and dignity during and after trial proceedings.",
      fullDetails: [
        "What it covers: Total protection of identity for victims of sexual offenses under IPC Section 228A.",
        "Your Rights: No person can print or publish the name or any matter which may make known the identity of a sexual assault victim.",
        "Media Restrictions: The media cannot publish even the slightest detail that could lead to identification.",
        "Trials: Trials for rape and sexual assault must ideally be conducted in private (in-camera proceedings)."
      ],
      icon: "🛡️",
      color: "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-400"
    },
    {
      id: "legal-aid",
      title: "Free Legal Aid",
      shortDesc: "Under the Legal Services Authorities Act, female victims have the right to seek free legal aid from the state regardless of income.",
      fullDetails: [
        "What it covers: Representation by a lawyer in legal proceedings at the cost of the state.",
        "Your Rights: Any woman, regardless of her financial status or income, is entitled to free legal aid.",
        "What's included: Drafting of legal documents, representation in court, and payment of court fees.",
        "How to claim: Approach the District Legal Services Authority (DLSA) present in every district court complex."
      ],
      icon: "⚖️",
      color: "bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full relative">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Know Your Legal Rights</h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed px-4">
          Knowledge is power. Understanding your legal rights is the first step towards protecting yourself and pursuing justice. Select a category below to learn in detail.
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
              Learn In Detail 
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
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Need personalized legal advice?</h2>
          <p className="text-indigo-100 mb-10 max-w-2xl mx-auto text-base md:text-lg">
            Our AI-powered legal advisor chatbot can help answer your specific questions confidentially and point you in the right direction.
          </p>
          <Link 
            href="/chatbot" 
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 md:px-12 rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            Talk to AI Legal Assistant
          </Link>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedRight && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedRight(null)}
          ></div>
          
          <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in-up">
            
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
                Detailed Information
              </h3>
              
              <ul className="space-y-4 md:space-y-6">
                {selectedRight.fullDetails.map((detail, idx) => {
                  const [boldPart, restPart] = detail.split(': ');
                  return (
                    <li key={idx} className="flex items-start bg-gray-50 rounded-2xl p-4 md:p-5 border border-gray-100">
                      <div className="mt-1 mr-4 bg-purple-100 text-purple-700 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
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
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
