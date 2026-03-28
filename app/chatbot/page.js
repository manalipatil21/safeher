"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import T from "i18n-react";
import "../i18n";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
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

export default function ChatbotPage() {
  const [langTrigger, setLangTrigger] = useState(0);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    setCurrentLang(localStorage.getItem("app_lang") || "en");
    const handleLangChange = () => {
      setLangTrigger(prev => prev + 1);
      setCurrentLang(localStorage.getItem("app_lang") || "en");
    };
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  const [messages, setMessages] = useState([
    { role: "system", isKey: true, content: "chat_greeting" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const recognitionRef = useRef(null);

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    const langMap = {
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN",
    };
    recognition.lang = langMap[currentLang] || "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + transcript : transcript));
    };
    recognition.onerror = (event) => {
      if (event.error !== "aborted" && event.error !== "no-speech") {
        console.error("Speech recognition error:", event.error);
      }
      setIsRecording(false);
    };
    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", isKey: false, content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          previousMessages: messages,
          lang: currentLang
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        setMessages(prev => [...prev, {
          role: "system",
          isKey: false,
          content: `Error: ${data.error || "Failed to reach AI server."}`
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: "system",
          isKey: false,
          content: data.reply
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "system",
        isKey: false,
        content: "Error communicating with the network."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white/95 rounded-t-3xl shadow-sm border border-gray-200 border-b-0 p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{T.translate("chat_title")}</h1>
            <p className="text-sm text-green-600 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
              {T.translate("chat_secure")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/emergency" className="hidden sm:flex items-center gap-1 text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-3 py-1.5 rounded-full text-xs font-bold transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            {T.translate("emerg_sos")}
          </Link>
          <button
            onClick={() => setMessages([{ role: "system", isKey: true, content: "chat_greeting" }])}
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
            {T.translate("chat_encrypt")}
          </span>
        </div>

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-auto shadow-sm
                ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-pink-100 text-pink-600'}`}>
                {msg.role === 'user' ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                )}
              </div>
              <div className={`p-4 sm:p-5 rounded-2xl shadow-sm text-[15px]
                ${msg.role === 'user'
                  ? 'bg-purple-600 text-white rounded-br-sm'
                  : msg.content === 'chat_urgent'
                    ? 'bg-red-50 text-red-800 border-2 border-red-200 rounded-bl-sm font-medium'
                    : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'}`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.isKey ? T.translate(msg.content) : msg.content}</p>
              </div>
            </div>
          </div>
        ))}

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
      <div className="bg-white/95 rounded-b-3xl shadow-sm border border-gray-200 border-t p-4 flex-shrink-0">
        <form onSubmit={handleSend} className="flex gap-3 relative max-w-4xl mx-auto">
          {currentLang !== "en" ? (
            <ReactTransliterate
              value={input}
              onChangeText={(text) => setInput(text)}
              lang={currentLang}
              placeholder={T.translate("chat_placeholder")}
              containerClassName="flex-1 w-full"
              renderComponent={(props) => (
                <input
                  {...props}
                  className="bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full pl-6 pr-[6.5rem] py-4 shadow-inner transition-all"
                />
              )}
            />
          ) : (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={T.translate("chat_placeholder")}
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full pl-6 pr-[6.5rem] py-4 shadow-inner transition-all"
            />
          )}
          <button
            type="button"
            onClick={handleMicClick}
            className={`absolute right-14 top-1/2 -translate-y-1/2 p-3 text-white rounded-full transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isRecording 
                ? "bg-red-500 hover:bg-red-600 focus:ring-red-500 animate-pulse bg-opacity-90" 
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            }`}
            title="Speak"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </button>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed max-w-2xl mx-auto">
          {T.translate("chat_disclaimer")}
        </p>
      </div>
    </div>
  );
}