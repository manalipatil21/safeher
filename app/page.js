import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-purple-50 to-pink-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Your Safety and Rights,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Our Priority.
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Empowering women with instant emergency assistance, comprehensive legal knowledge, and intelligent AI guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white">
            <Link 
              href="/emergency" 
              className="bg-red-500 hover:bg-red-600 w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2 animate-bounce"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              EMERGENCY SOS
            </Link>
            <Link 
              href="/chatbot" 
              className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-purple-600/30 transition-all"
            >
              Get Legal Advice
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How We Can Help You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-purple-50 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all border border-purple-100 duration-300">
              <div className="w-14 h-14 bg-purple-200 rounded-full flex items-center justify-center mb-6 text-purple-700 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Know Your Rights</h3>
              <p className="text-gray-600 mb-6">
                Access a comprehensive, easy-to-understand database of laws and rights designed to protect and empower women in every situation.
              </p>
              <Link href="/rights" className="text-purple-600 font-semibold hover:text-purple-800 flex items-center gap-1">
                Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-pink-50 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all border border-pink-100 duration-300">
              <div className="w-14 h-14 bg-pink-200 rounded-full flex items-center justify-center mb-6 text-pink-700 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Legal Advisor</h3>
              <p className="text-gray-600 mb-6">
                Get instant, confidential guidance for your legal queries 24/7 through our smart, supportive chatbot designed to guide you safely.
              </p>
              <Link href="/chatbot" className="text-pink-600 font-semibold hover:text-pink-800 flex items-center gap-1">
                Chat now <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-red-50 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all border border-red-100 duration-300">
              <div className="w-14 h-14 bg-red-200 rounded-full flex items-center justify-center mb-6 text-red-700 shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location Help</h3>
              <p className="text-gray-600 mb-6">
                Trigger an emergency response immediately, share your live location with secure contacts, and navigate to nearby authorities.
              </p>
              <Link href="/emergency" className="text-red-600 font-semibold hover:text-red-800 flex items-center gap-1">
                View tools <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
