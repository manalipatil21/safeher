import fs from 'fs/promises';

const enAuth = {
    auth_welcome: "Welcome Back",
    auth_join: "Join SafeHer",
    auth_login_sub: "Sign in to access your secure profile.",
    auth_signup_sub: "Create a protected account for personalized legal safety.",
    auth_name: "Full Name",
    auth_email: "Email address",
    auth_pass: "Password",
    auth_confirm_pass: "Confirm Password",
    auth_remember: "Remember me",
    auth_forgot: "Forgot password?",
    auth_signin_btn: "Sign in",
    auth_signup_btn: "Create Account",
    auth_new_user: "New to SafeHer?",
    auth_create_link: "Create an account",
    auth_existing: "Already have an account?",
    auth_signin_link: "Sign in instead",
    auth_pwd_mismatch: "Passwords do not match!",
    auth_logging_in: "Logging in as",
    auth_signing_up: "Signing up"
};

const hiAuth = {
    auth_welcome: "वापसी पर स्वागत है",
    auth_join: "SafeHer से जुड़ें",
    auth_login_sub: "अपनी सुरक्षित प्रोफ़ाइल तक पहुंचने के लिए साइन इन करें।",
    auth_signup_sub: "व्यक्तिगत कानूनी सुरक्षा के लिए एक सुरक्षित खाता बनाएं।",
    auth_name: "पूरा नाम",
    auth_email: "ईमेल पता",
    auth_pass: "पासवर्ड",
    auth_confirm_pass: "पासवर्ड की पुष्टि करें",
    auth_remember: "मुझे याद रखें",
    auth_forgot: "पासवर्ड भूल गए?",
    auth_signin_btn: "साइन इन करें",
    auth_signup_btn: "खाता बनाएं",
    auth_new_user: "SafeHer पर नए हैं?",
    auth_create_link: "एक खाता बनाएं",
    auth_existing: "क्या आपके पास पहले से एक खाता है?",
    auth_signin_link: "इसके बजाय साइन इन करें",
    auth_pwd_mismatch: "पासवर्ड मेल नहीं खाते!",
    auth_logging_in: "लॉग इन कर रहे हैं",
    auth_signing_up: "साइन अप कर रहे हैं"
};

const mrAuth = {
    auth_welcome: "पुन्हा स्वागत आहे",
    auth_join: "SafeHer मध्ये सामील व्हा",
    auth_login_sub: "तुमच्या सुरक्षित प्रोफाइलमध्ये प्रवेश करण्यासाठी साइन इन करा.",
    auth_signup_sub: "वैयक्तिकृत कायदेशीर सुरक्षिततेसाठी संरक्षित खाते तयार करा.",
    auth_name: "पूर्ण नाव",
    auth_email: "ईमेल पत्ता",
    auth_pass: "पासवर्ड",
    auth_confirm_pass: "पासवर्डची पुष्टी करा",
    auth_remember: "मला लक्षात ठेवा",
    auth_forgot: "पासवर्ड विसरलात?",
    auth_signin_btn: "साइन इन करा",
    auth_signup_btn: "खाते तयार करा",
    auth_new_user: "SafeHer वर नवीन आहात?",
    auth_create_link: "खाते तयार करा",
    auth_existing: "आधीपासूनच खाते आहे का?",
    auth_signin_link: "त्याऐवजी साइन इन करा",
    auth_pwd_mismatch: "पासवर्ड जुळत नाहीत!",
    auth_logging_in: "लॉग इन करत आहे",
    auth_signing_up: "साइन अप करत आहे"
};

async function updateFile(filename, authObj) {
  const content = await fs.readFile(filename, 'utf-8');
  const json = JSON.parse(content);
  Object.assign(json, authObj);
  await fs.writeFile(filename, JSON.stringify(json, null, 4));
}

async function run() {
  await updateFile('./app/translations/en.json', enAuth);
  await updateFile('./app/translations/hi.json', hiAuth);
  await updateFile('./app/translations/mr.json', mrAuth);
  console.log("Auth translated");
}

run();
