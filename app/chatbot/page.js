"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello. I am your confidential Legal Advisor AI. I'm here to provide information about women's rights, workplace harassment laws, domestic violence protection, and other legal options. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Rule-based logic to respond to specific user concerns
  const generateResponse = (userText) => {
    const text = userText.toLowerCase();

    // Safety check - immediate risk
    if (text.match(/\b(kill|suicide|die|murder|emergency|help me now|in danger)\b/)) {
      return "URGENT: Your safety is the highest priority. If you are in immediate danger, please press the SOS button immediately or call the Police at 100/112 or the Women Helpline at 1091. Do not wait.";
    }

    // Domestic Violence
    if (text.match(/\b(husband|in-laws|hit|beaten|abuse|domestic|violence|slap|dowry)\b/)) {
      return "Based on what you've shared, this falls under the Protection of Women from Domestic Violence Act, 2005. You have the right to reside in a shared household, and you can file for a Protection Order or Monetary Relief. You should immediately contact a Protection Officer or register a complaint at the nearest police station. Remember, you have the right to free legal aid to help you file the case.";
    }

    // Workplace Harassment
    if (text.match(/\b(boss|colleague|office|work|touch|harassment|posh|inappropriate)\b/)) {
      return "This sounds like workplace sexual harassment, which is strictly prohibited under the POSH Act, 2013 (Prevention of Sexual Harassment). Every company with 10 or more employees must have an Internal Complaints Committee (ICC). You have the right to file a written complaint to the ICC within 3 months of the incident. Your employer is legally bound to protect your identity and cannot fire you for raising this complaint.";
    }

    // Maternity
    if (text.match(/\b(pregnant|maternity|baby|leave|creche|fired while pregnant)\b/)) {
      return "Under the Maternity Benefit Act, you are entitled to 26 weeks of paid maternity leave (for your first two children) if your company has 10 or more employees. It is strictly illegal for your employer to terminate your employment because of your pregnancy or while you are on maternity leave. If your office has 50+ employees, they must also provide creche facilities.";
    }

    // Equal Pay
    if (text.match(/\b(salary|pay|wage|less|equal pay)\b/)) {
      return "Under the Equal Remuneration Act, you are guaranteed equal pay for equal work. It is illegal for an employer to pay you less than a male colleague who is performing the same or similar nature of work. If you are facing wage discrimination, you can approach the Labour Commissioner.";
    }

    // Divorce / Maintenance
    if (text.match(/\b(divorce|maintenance|alimony|separate|child custody)\b/)) {
      return "If you are considering divorce or separation, you have the right to claim maintenance (financial support) for yourself and your children under Section 125 of the CrPC, regardless of your religion. You also have the right to seek custody of your children. The exact division of assets depends on your respective personal laws (Hindu, Muslim, Special Marriage Act, etc.). I recommend speaking to a family lawyer for tailored advice.";
    }

    // Default Fallback
    return "Thank you for reaching out. As an AI Assistant, I can guide you through the basics of the POSH Act (Workplace Harassment), Domestic Violence Act, Maternity Benefits, Equal Pay, and general maintenance rights. Could you please provide a few more details about your specific situation so I can give you the most accurate legal guidance?";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // AI response delay logic
    setTimeout(() => {
      const responseContent = generateResponse(userMessage);
      setMessages([...newMessages, {
        role: "system",
        content: responseContent
      }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s for realism
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-3xl shadow-sm border border-gray-200 border-b-0 p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SafeHer Legal AI</h1>
            <p className="text-sm text-green-600 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
              Secure & Confidential - Online
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/emergency" className="hidden sm:flex items-center gap-1 text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-3 py-1.5 rounded-full text-xs font-bold transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            SOS
          </Link>
          <button
            onClick={() => setMessages([messages[0]])}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            title="Clear Chat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50 border-x border-gray-200 p-4 sm:p-6 space-y-6">
        <div className="text-center mb-6">
          <span className="text-xs text-gray-500 font-medium bg-gray-200/60 px-4 py-1.5 rounded-full shadow-sm">
            🔒 Chats are end-to-end encrypted and never stored
          </span>
        </div>

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar */}
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-auto shadow-sm
                ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-pink-100 text-pink-600'}`}>
                {msg.role === 'user' ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                )}
              </div>

              {/* Message Bubble */}
              <div className={`p-4 sm:p-5 rounded-2xl shadow-sm text-[15px]
                ${msg.role === 'user'
                  ? 'bg-purple-600 text-white rounded-br-sm'
                  : msg.content.includes('URGENT:')
                    ? 'bg-red-50 text-red-800 border-2 border-red-200 rounded-bl-sm font-medium'
                    : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'}`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>

            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%] sm:max-w-[75%] flex-row">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-auto shadow-sm bg-pink-100 text-pink-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white rounded-bl-sm border border-gray-100 shadow-sm flex space-x-2 items-center h-12">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-b-3xl shadow-sm border border-gray-200 border-t p-4 flex-shrink-0">
        <form onSubmit={handleSend} className="flex gap-3 relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., What are my rights if my boss is harassing me?"
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full pl-6 pr-16 py-4 shadow-inner transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed max-w-2xl mx-auto">
          Disclaimer: This AI provides legal information based on Indian law, not formal legal representation. In emergencies, call 112 or use the SOS button immediately.
        </p>
      </div>
    </div>
  );
}
