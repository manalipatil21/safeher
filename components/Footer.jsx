import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              SafeHer
            </span>
            <p className="mt-4 text-gray-400 max-w-sm">
              Empowering women with legal knowledge, immediate emergency assistance, and AI-driven guidance for a safer tomorrow.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link href="/emergency" className="text-gray-400 hover:text-purple-400 transition-colors">Emergency Help</Link></li>
              <li><Link href="/rights" className="text-gray-400 hover:text-purple-400 transition-colors">Legal Rights</Link></li>
              <li><Link href="/chatbot" className="text-gray-400 hover:text-purple-400 transition-colors">Chatbot</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: help@safeher.org</li>
              <li>Emergency: 1091 / 112</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SafeHer Legal Advisor. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
