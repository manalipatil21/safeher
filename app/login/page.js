"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import T from "i18n-react";
import "../i18n";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [langTrigger, setLangTrigger] = useState(0);

  useEffect(() => {
    const handleLangChange = () => setLangTrigger(prev => prev + 1);
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  const friendlyError = (code) => {
    const map = {
      "auth/email-already-in-use": "An account with this email already exists. Please sign in.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Password must be at least 6 characters.",
      "auth/user-not-found": "No account found with this email. Please sign up.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-credential": "Incorrect email or password. Please try again.",
      "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    };
    return map[code] || "Something went wrong. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // --- SIGN IN ---
        const userCred = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        let name = formData.email.split("@")[0];
        try {
          const docSnap = await getDoc(doc(db, "users", userCred.user.uid));
          if (docSnap.exists()) name = docSnap.data().name;
        } catch { /* Firestore may not be set up yet */ }
        setSuccessMsg(`Welcome back to SafeHer, ${name}! 💜`);
        setTimeout(() => router.push("/"), 2000);

      } else {
        // --- SIGN UP ---
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          setLoading(false);
          return;
        }
        const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        // Save profile to Firestore (non-blocking — won't fail signup if Firestore not ready)
        try {
          await setDoc(doc(db, "users", userCred.user.uid), {
            name: formData.name,
            email: formData.email,
            uid: userCred.user.uid,
            createdAt: serverTimestamp(),
          });
        } catch {
          // Firestore may need enabling in Firebase Console — auth still works
          console.warn("Firestore write failed — enable Firestore in Firebase Console");
        }

        setSuccessMsg(`Welcome to SafeHer, ${formData.name}! Your account has been created. 💜`);
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full space-y-8 bg-white/90 p-10 rounded-[2.5rem] shadow-2xl border border-white/50 relative z-10">

        {/* Success Banner */}
        {successMsg && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl p-6 text-center animate-fade-in-up shadow-lg">
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-bold text-xl">{successMsg}</p>
            <p className="text-white/80 text-sm mt-2">Redirecting you to home...</p>
            <div className="mt-4 w-full bg-white/20 rounded-full h-1.5">
              <div className="bg-white h-1.5 rounded-full animate-[shrink_2s_linear]" style={{ animation: "width 2s linear" }}></div>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm font-medium flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            {error}
          </div>
        )}

        {!successMsg && (
          <>
            <div>
              <div className="mx-auto h-24 w-24 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(219,39,119,0.4)] transform hover:scale-110 hover:rotate-12 transition-all duration-500 relative group">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-xl transition-all"></div>
                <svg className="h-12 w-12 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isLogin ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  )}
                </svg>
              </div>
              <h2 className="mt-8 text-center text-4xl font-black text-gray-900 tracking-tight">
                {isLogin ? (T.translate("auth_welcome") || "Welcome Back") : (T.translate("auth_join") || "Join SafeHer")}
              </h2>
              <p className="mt-3 text-center text-base text-gray-600 font-medium">
                {isLogin
                  ? (T.translate("auth_login_sub") || "Sign in to access your secure profile.")
                  : (T.translate("auth_signup_sub") || "Create a protected account for personalized legal safety.")}
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input id="name" name="name" type="text" required={!isLogin}
                    className="block w-full px-4 py-4 pl-12 bg-white/80 border-2 border-purple-100 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-lg"
                    placeholder={T.translate("auth_name") || "Full Name"}
                    value={formData.name} onChange={handleChange} />
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                </div>
                <input id="email" name="email" type="email" autoComplete="email" required
                  className="block w-full px-4 py-4 pl-12 bg-white/80 border-2 border-purple-100 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-lg"
                  placeholder={T.translate("auth_email") || "Email address"}
                  value={formData.email} onChange={handleChange} />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input id="password" name="password" type="password" autoComplete="current-password" required
                  className="block w-full px-4 py-4 pl-12 bg-white/80 border-2 border-purple-100 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-lg"
                  placeholder={T.translate("auth_pass") || "Password"}
                  value={formData.password} onChange={handleChange} />
              </div>

              {!isLogin && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400 group-focus-within:text-purple-600 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <input id="confirmPassword" name="confirmPassword" type="password" required={!isLogin}
                    className="block w-full px-4 py-4 pl-12 bg-white/80 border-2 border-purple-100 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-lg"
                    placeholder={T.translate("auth_confirm_pass") || "Confirm Password"}
                    value={formData.confirmPassword} onChange={handleChange} />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    {T.translate("auth_remember") || "Remember me"}
                  </label>
                  <a href="#" className="font-semibold text-purple-600 hover:text-purple-500">
                    {T.translate("auth_forgot") || "Forgot password?"}
                  </a>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : (
                  <>
                    {isLogin ? (T.translate("auth_signin_btn") || "Sign In") : (T.translate("auth_signup_btn") || "Create Account")}
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>
            </form>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-center text-sm text-gray-600">
                {isLogin ? (T.translate("auth_new_user") || "New to SafeHer?") : (T.translate("auth_existing") || "Already have an account?")}
                <button onClick={switchMode} className="ml-2 font-bold text-purple-600 hover:text-purple-500 transition-colors">
                  {isLogin ? (T.translate("auth_create_link") || "Create an account") : (T.translate("auth_signin_link") || "Sign in instead")}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
