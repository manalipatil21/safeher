"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getIdToken } from "firebase/auth";


const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700 border border-amber-200",
  reviewing: "bg-blue-100 text-blue-700 border border-blue-200",
  resolved: "bg-green-100 text-green-700 border border-green-200",
  closed: "bg-gray-100 text-gray-600 border border-gray-200",
};

export default function MyComplaintsPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchComplaints = async () => {
      try {
        // Use Admin SDK API route — bypasses Firestore security rules entirely
        const token = await getIdToken(currentUser);
        const res = await fetch("/api/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        const formatted = (data.complaints || []).map(c => ({
          ...c,
          shortId: (c.id || "").slice(0, 8).toUpperCase(),
          createdAt: c.createdAt
            ? new Date(c.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })
            : "Just now",
        }));
        setComplaints(formatted);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchComplaints();
  }, [currentUser]);


  if (loading || fetching) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading your complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-fade-in-up">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">My Complaints</h1>
            <p className="text-gray-500 mt-1">Track the status of your filed complaints</p>
          </div>
          <Link href="/complaint"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-md w-fit">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
            File New Complaint
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Filed", value: complaints.length, color: "purple" },
            { label: "Pending", value: complaints.filter(c => c.status === "pending").length, color: "amber" },
            { label: "Reviewing", value: complaints.filter(c => c.status === "reviewing").length, color: "blue" },
            { label: "Resolved", value: complaints.filter(c => c.status === "resolved").length, color: "green" },
          ].map(({ label, value, color }) => (
            <div key={label} className={`bg-white/60 border border-${color}-100 rounded-2xl p-4 text-center`}>
              <p className={`text-3xl font-black text-${color}-600`}>{value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Complaints List */}
        {complaints.length === 0 ? (
          <div className="bg-white/60 rounded-3xl border border-gray-100 p-16 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No complaints yet</h3>
            <p className="text-gray-500 mb-6">You haven&#39;t filed any complaints yet. If you need help, file one now.</p>
            <Link href="/complaint" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition-all">
              File a Complaint
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="bg-white/70 border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:bg-white/90 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900">{complaint.type}</p>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${STATUS_STYLES[complaint.status] || STATUS_STYLES.pending}`}>
                          {complaint.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">#{complaint.shortId} · {complaint.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>{complaint.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>{complaint.date ? new Date(complaint.date).toLocaleString("en-IN") : "N/A"}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-xl p-3 line-clamp-2">{complaint.description}</p>

                {complaint.witnessName && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Witness: {complaint.witnessName}
                    {complaint.witnessContact && <span>· {complaint.witnessContact}</span>}
                  </div>
                )}
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}
