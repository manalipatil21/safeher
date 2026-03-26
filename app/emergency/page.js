"use client";
import { useState, useEffect } from "react";

export default function EmergencyPage() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [isSOSActive, setIsSOSActive] = useState(false);

  const handleSOS = () => {
    setIsSOSActive(true);
    // In a real app, this would send an API request to alert authorities/contacts
    setTimeout(() => {
      alert("Emergency alert sent to your trusted contacts and local authorities!");
      setIsSOSActive(false);
    }, 2000);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationError("");
      },
      (error) => {
        setLocationError("Unable to retrieve your location. Please check your browser permissions.");
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const emergencyContacts = [
    { name: "Police", number: "100 / 112" },
    { name: "Women Helpline", number: "1091" },
    { name: "Domestic Abuse", number: "181" },
    { name: "Ambulance", number: "102" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4 animate-pulse">Emergency Assistance</h1>
        <p className="text-lg text-gray-600">Get immediate help, share your location, or contact authorities instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: SOS and Location */}
        <div className="space-y-8">
          <div className="bg-red-50 p-8 rounded-3xl border-2 border-red-100 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
            {isSOSActive && (
              <div className="absolute inset-0 bg-red-600/10 animate-ping rounded-3xl pointer-events-none"></div>
            )}
            <button 
              onClick={handleSOS}
              disabled={isSOSActive}
              className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full text-white text-3xl sm:text-4xl font-black tracking-wider transition-all flex items-center justify-center border-[12px] border-red-100 z-10
                ${isSOSActive 
                  ? 'bg-red-800 scale-95 shadow-[0_0_60px_rgba(220,38,38,0.8)]' 
                  : 'bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(220,38,38,0.5)]'}`}
            >
              <div className="flex flex-col items-center gap-2">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                {isSOSActive ? "SENDING..." : "SOS"}
              </div>
            </button>
            <p className="mt-8 text-red-700 font-medium max-w-sm">
              Pressing this button will instantly alert your emergency contacts and local authorities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Your Location
            </h3>
            
            {locationError && <div className="text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 mb-4">{locationError}</div>}
            
            {location ? (
              <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-200">
                <p className="text-gray-700 font-mono text-sm sm:text-base"><strong>Latitude :</strong> {location.lat.toFixed(6)}</p>
                <p className="text-gray-700 font-mono text-sm sm:text-base"><strong>Longitude:</strong> {location.lng.toFixed(6)}</p>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-xl mb-4 text-gray-500 animate-pulse border border-gray-200">
                Detecting your location...
              </div>
            )}
            
            <button 
              onClick={getLocation}
              className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              Refresh Location
            </button>
          </div>
        </div>

        {/* Right Column: Maps and Contacts */}
        <div className="space-y-8 flex flex-col">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-64 lg:h-80">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
              Map View
            </h3>
            <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
              {location ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                  className="rounded-xl w-full h-full"
                ></iframe>
              ) : (
                <p className="text-gray-500">Map unavailable without location data.</p>
              )}
            </div>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-sm flex-1">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Important Helplines
            </h3>
            <ul className="space-y-4">
              {emergencyContacts.map((contact, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-800 p-4 rounded-xl border border-gray-700 gap-3">
                  <span className="font-semibold text-gray-300 text-lg">{contact.name}</span>
                  <a href={`tel:${contact.number.split(' / ')[0]}`} className="bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 px-6 py-2 rounded-lg font-bold transition-colors w-full sm:w-auto text-center">
                    {contact.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
