"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            // User exists in Auth but not Firestore yet — use Auth data
            setUserProfile({ name: user.displayName || user.email?.split("@")[0], email: user.email });
          }
        } catch (err) {
          if (err.code === "permission-denied") {
            // Firestore rules not yet updated — fall back to Auth data gracefully
            console.warn("Firestore rules need updating in Firebase Console. Using Auth data as fallback.");
            setUserProfile({ name: user.displayName || user.email?.split("@")[0], email: user.email });
          } else {
            setUserProfile({ name: user.email?.split("@")[0], email: user.email });
          }
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
