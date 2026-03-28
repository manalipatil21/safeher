import fs from 'fs/promises';

const enComplaints = {
    nav_complaint: "File Complaint",
    comp_title: "File a Secure Complaint",
    comp_desc: "Your information is completely encrypted. You can submit details safely and attach photo or audio evidence to support your case.",
    comp_type: "Type of Incident",
    comp_type_ph: "e.g. Domestic Violence, Harassment, Cybercrime...",
    comp_date: "Date & Time of Incident",
    comp_loc: "Location",
    comp_loc_ph: "Where did this happen? (City, Street or Online)",
    comp_details: "Describe the Situation",
    comp_details_ph: "Please explain what happened in as much detail as you feel comfortable with...",
    comp_evidence: "Upload Evidence (Optional)",
    comp_evidence_desc: "Click here to upload photos, screenshots, or audio (Max 10MB)",
    comp_submit: "Submit Complaint Securely"
};

const hiComplaints = {
    nav_complaint: "शिकायत दर्ज करें",
    comp_title: "सुरक्षित शिकायत दर्ज करें",
    comp_desc: "आपकी जानकारी पूरी तरह से एन्क्रिप्टेड है। आप सुरक्षित रूप से विवरण जमा कर सकती हैं और अपने मामले का समर्थन करने के लिए फोटो या ऑडियो साक्ष्य संलग्न कर सकती हैं।",
    comp_type: "घटना का प्रकार",
    comp_type_ph: "जैसे, घरेलू हिंसा, उत्पीड़न, साइबर अपराध...",
    comp_date: "घटना की दिनांक और समय",
    comp_loc: "स्थान",
    comp_loc_ph: "यह कहाँ हुआ? (शहर, गली या ऑनलाइन)",
    comp_details: "स्थिति का वर्णन करें",
    comp_details_ph: "कृपया बताएं कि क्या हुआ, जितना आप सहज महसूस करें...",
    comp_evidence: "सबूत अपलोड करें (वैकल्पिक)",
    comp_evidence_desc: "फ़ोटो, स्क्रीनशॉट या ऑडियो अपलोड करने के लिए यहां क्लिक करें (अधिकतम 10MB)",
    comp_submit: "सुरक्षित रूप से शिकायत भेजें"
};

const mrComplaints = {
    nav_complaint: "तक्रार नोंदवा",
    comp_title: "सुरक्षित तक्रार नोंदवा",
    comp_desc: "तुमची माहिती पूर्णपणे एनक्रिप्टेड आहे. तुम्ही सुरक्षितपणे तपशील सबमिट करू शकता आणि तुमच्या प्रकरणाला पुष्टी देण्यासाठी फोटो किंवा ऑडिओ पुरावे जोडू शकता.",
    comp_type: "घटनेचा प्रकार",
    comp_type_ph: "उदा. कौटुंबिक हिंसाचार, छळ, सायबर गुन्हेगारी...",
    comp_date: "घटनेची तारीख आणि वेळ",
    comp_loc: "ठिकाण",
    comp_loc_ph: "हे कुठे घडले? (शहर, रस्ता किंवा ऑनलाइन)",
    comp_details: "परिस्थितीचे वर्णन करा",
    comp_details_ph: "कृपया तुम्हाला शक्य तितक्या तपशीलात काय घडले ते सांगा...",
    comp_evidence: "पुरावे अपलोड करा (ऐच्छिक)",
    comp_evidence_desc: "फोटो, स्क्रीनशॉट किंवा ऑडिओ अपलोड करण्यासाठी येथे क्लिक करा (कमाल 10MB)",
    comp_submit: "सुरक्षितपणे तक्रार जमा करा"
};

async function updateFile(filename, compObj) {
  const content = await fs.readFile(filename, 'utf-8');
  const json = JSON.parse(content);
  Object.assign(json, compObj);
  await fs.writeFile(filename, JSON.stringify(json, null, 4));
}

async function run() {
  await updateFile('./app/translations/en.json', enComplaints);
  await updateFile('./app/translations/hi.json', hiComplaints);
  await updateFile('./app/translations/mr.json', mrComplaints);
  console.log("Complaints translated");
}

run();
