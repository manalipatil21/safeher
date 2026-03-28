import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Lazy initialization — only runs when getAdminDb/getAdminAuth are first called,
// NOT at module import time. This prevents build failures when env vars are missing.
let _adminApp = null;
let _adminDb = null;
let _adminAuth = null;

function getAdminApp() {
  if (_adminApp) return _adminApp;

  const existingApps = getApps();
  if (existingApps.length > 0) {
    _adminApp = existingApps[0];
    return _adminApp;
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin environment variables. " +
      "Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in Vercel settings."
    );
  }

  _adminApp = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return _adminApp;
}

function getAdminDb() {
  if (!_adminDb) _adminDb = getFirestore(getAdminApp());
  return _adminDb;
}

function getAdminAuth() {
  if (!_adminAuth) _adminAuth = getAuth(getAdminApp());
  return _adminAuth;
}

export { getAdminDb, getAdminAuth };
