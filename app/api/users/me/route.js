import { NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// GET /api/users/me — fetch current user profile
export async function GET(request) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    const decoded = await adminAuth.verifyIdToken(token);
    const doc = await adminDb.collection("users").doc(decoded.uid).get();

    if (!doc.exists) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ uid: decoded.uid, ...doc.data() });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

// POST /api/users/me — update user profile
export async function POST(request) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    const decoded = await adminAuth.verifyIdToken(token);
    const body = await request.json();

    const allowedFields = ["name", "phone", "city", "language"];
    const updates = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) updates[key] = body[key];
    }
    updates.updatedAt = new Date().toISOString();

    await adminDb.collection("users").doc(decoded.uid).set(updates, { merge: true });
    return NextResponse.json({ success: true, ...updates });
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
