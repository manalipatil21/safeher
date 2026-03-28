import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase-admin";

// GET /api/complaints — fetch all complaints for logged-in user
export async function GET(request) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const snapshot = await adminDb
      .collection("complaints")
      .where("userId", "==", decoded.uid)
      .orderBy("createdAt", "desc")
      .get();

    const complaints = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({ complaints });
  } catch {
    return NextResponse.json({ error: "Unauthorized or server error" }, { status: 401 });
  }
}

// POST /api/complaints — save a new complaint
export async function POST(request) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    let userId = "anonymous";
    let userEmail = "anonymous";

    if (token) {
      try {
        const decoded = await adminAuth.verifyIdToken(token);
        userId = decoded.uid;
        userEmail = decoded.email || "anonymous";
      } catch { /* allow anonymous */ }
    }

    const body = await request.json();
    const { type, date, location, description, witnessName, witnessContact } = body;

    if (!type || !date || !location || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = await adminDb.collection("complaints").add({
      userId,
      userEmail,
      type,
      date,
      location,
      description,
      witnessName: witnessName || null,
      witnessContact: witnessContact || null,
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch {
    return NextResponse.json({ error: "Failed to submit complaint" }, { status: 500 });
  }
}
