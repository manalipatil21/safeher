import fs from 'fs/promises';

const enChat = {
    chat_greeting: "Hello! I am your safe and private Legal Advisor AI. I'm here to help you understand your legal rights, workplace safety, and protection from domestic violence. How can I help you today?",
    chat_urgent: "URGENT: Your safety is the most important thing. If you are in danger right now, please press the SOS button or call the Police at 100/112 or the Women Helpline at 1091 immediately.",
    chat_domestic: "It sounds like you might be facing domestic violence. Under the Domestic Violence Act (2005), you have the right to stay in your home and get court protection from the abuser. You should report this to the nearest police station. You can also get a free lawyer to help you.",
    chat_harassment: "This sounds like workplace harassment, which is illegal under the POSH Act (2013). Your office must have an Internal Complaints Committee (ICC). You can file a written complaint to them within 3 months. Your boss cannot fire you for complaining, and your name will be kept a secret.",
    chat_maternity: "Under the Maternity Benefit Act, if your company has 10 or more workers, you get 26 weeks of paid leave when you have a baby. It is against the law for your boss to fire you because you are pregnant or on leave.",
    chat_equal_pay: "The Equal Remuneration Act says you must be paid the exact same as a man doing the same job. If you are being paid less because you are a woman, that is illegal, and you can complain to the Labour Commissioner.",
    chat_divorce: "If you want a divorce or need to live separately, you have the right to ask for money (maintenance) to support yourself and your children. You also have the right to ask for custody of your kids. It's best to speak with a family lawyer for exact advice.",
    chat_irrelevant: "I am a Legal Advisor AI designed to help with women's safety and rights. Please ask me questions related to legal rights, workplace harassment, domestic violence, or emergency help so I can give you the right advice.",
    chat_fallback: "Thank you for reaching out. I can help you understand your rights regarding workplace harassment, domestic violence, maternity leave, equal pay, and divorce. Could you tell me a little more about what happened or what you need help with?"
};

const hiChat = {
    chat_greeting: "नमस्ते! मैं आपकी सुरक्षित और निजी कानूनी सलाहकार AI हूँ। मैं आपके कानूनी अधिकारों, कार्यस्थल की सुरक्षा और घरेलू हिंसा से सुरक्षा को समझने में आपकी सहायता करने के लिए यहाँ हूँ। आज मैं आपकी कैसे मदद कर सकती हूँ?",
    chat_urgent: "जरूरी: आपकी सुरक्षा सबसे महत्वपूर्ण है। यदि आप अभी खतरे में हैं, तो कृपया तुरंत SOS बटन दबाएं या पुलिस को 100/112 पर या महिला हेल्पलाइन को 1091 पर कॉल करें।",
    chat_domestic: "ऐसा लगता है कि आप घरेलू हिंसा का सामना कर रही हैं। घरेलू हिंसा अधिनियम (2005) के तहत, आपको अपने घर में रहने और दुर्व्यवहार करने वाले से अदालत की सुरक्षा पाने का अधिकार है। आपको नजदीकी पुलिस स्टेशन में इसकी शिकायत करनी चाहिए।",
    chat_harassment: "यह कार्यस्थल पर उत्पीड़न जैसा लगता है, जो POSH अधिनियम (2013) के तहत अवैध है। आपके कार्यालय में एक आंतरिक शिकायत समिति (ICC) होनी चाहिए। शिकायत करने के लिए आपका बॉस आपको नौकरी से नहीं निकाल सकता है।",
    chat_maternity: "मातृत्व लाभ अधिनियम के तहत, यदि आपकी कंपनी में 10 या अधिक कर्मचारी हैं, तो बच्चा होने पर आपको 26 सप्ताह की सवैतनिक छुट्टी मिलती है। गर्भवती होने के कारण आपको नौकरी से निकालना कानून के खिलाफ है।",
    chat_equal_pay: "समान पारिश्रमिक अधिनियम कहता है कि आपको वही काम करने वाले पुरुष के समान भुगतान किया जाना चाहिए। यदि आपको कम वेतन मिल रहा है क्योंकि आप एक महिला हैं, तो यह अवैध है।",
    chat_divorce: "यदि आप तलाक चाहती हैं या अलग रहना चाहती हैं, तो आपको स्वयं और अपने बच्चों की सहायता के लिए पैसे (भरण-पोषण) मांगने का अधिकार है। आपको अपने बच्चों की कस्टडी माँगने का भी अधिकार है।",
    chat_irrelevant: "मैं महिलाओं की सुरक्षा और अधिकारों में मदद करने के लिए डिज़ाइन की गई कानूनी सलाहकार AI हूँ। कृपया मुझसे कानूनी अधिकारों, कार्यस्थल पर उत्पीड़न, घरेलू हिंसा या आपातकालीन मदद से संबंधित प्रश्न पूछें।",
    chat_fallback: "संपर्क करने के लिए धन्यवाद। मैं कार्यस्थल पर उत्पीड़न, घरेलू हिंसा, मातृत्व अवकाश, समान वेतन और तलाक के संबंध में आपके अधिकारों को समझने में आपकी सहायता कर सकती हूँ। क्या आप मुझे थोड़ा और बता सकती हैं कि क्या हुआ?"
};

const mrChat = {
    chat_greeting: "नमस्कार! मी तुमची सुरक्षित आणि खाजगी कायदेशीर सल्लागार AI आहे. तुमचे कायदेशीर अधिकार, कामाच्या ठिकाणची सुरक्षितता आणि कौटुंबिक हिंसाचारापासून संरक्षण समजून घेण्यात मी तुम्हाला मदत करण्यासाठी येथे आहे. आज मी तुम्हाला कशी मदत करू शकेन?",
    chat_urgent: "तातडीचे: तुमची सुरक्षितता सर्वात महत्त्वाची आहे. तुम्ही आत्ता संकटात असल्यास, कृपया त्वरित SOS बटण दाबा किंवा 100/112 वर पोलिसांना किंवा 1091 वर महिला हेल्पलाईनला कॉल करा.",
    chat_domestic: "असे दिसते की तुम्ही कौटुंबिक हिंसाचाराला सामोरे जात आहात. कौटुंबिक हिंसाचार कायदा (2005) अंतर्गत, तुम्हाला तुमच्या घरात राहण्याचा आणि अत्याचार करणाऱ्यापासून न्यायालयाचे संरक्षण मिळवण्याचा अधिकार आहे. तुम्ही जवळच्या पोलिस स्टेशनमध्ये याची तक्रार करावी.",
    chat_harassment: "हे कामाच्या ठिकाणी छळवणुकीसारखे दिसते, जे POSH कायदा (2013) अंतर्गत बेकायदेशीर आहे. तुमच्या कार्यालयात एक अंतर्गत तक्रार निवारण समिती (ICC) असावी. तक्रार केल्याबद्दल तुमचा बॉस तुम्हाला कामावरून काढू शकत नाही.",
    chat_maternity: "मातृत्व लाभ कायद्यांतर्गत, जर तुमच्या कंपनीत 10 किंवा अधिक कर्मचारी असतील, तर बाळ झाल्यावर तुम्हाला 26 आठवड्यांची पगारी रजा मिळते. तुम्ही गरोदर असल्यामुळे तुम्हाला कामावरून काढणे बेकायदेशीर आहे.",
    chat_equal_pay: "समान मोबदला कायद्यानुसार पुरुषासारखेच काम करणाऱ्या महिलेला तेवढाच पगार मिळाला पाहिजे. जर तुम्ही महिला आहात म्हणून तुम्हाला कमी पगार दिला जात असेल, तर ते बेकायदेशीर आहे.",
    chat_divorce: "जर तुम्हाला घटस्फोट घ्यायचा असेल किंवा वेगळे राहायचे असेल, तर तुम्हाला स्वतःच्या आणि मुलांच्या संगोपनासाठी पैसे (पोटगी) मागण्याचा अधिकार आहे. तुमच्या मुलांची कस्टडी मागण्याचा अधिकारही तुम्हाला आहे.",
    chat_irrelevant: "मी महिलांची सुरक्षा आणि अधिकारांसाठी मदत करण्यासाठी डिझाइन केलेली कायदेशीर सल्लागार AI आहे. कृपया मला कायदेशीर अधिकार, कामाच्या ठिकाणी छळ, कौटुंबिक हिंसाचार किंवा आपत्कालीन मदतीशी संबंधित प्रश्न विचारा.",
    chat_fallback: "संपर्क साधल्याबद्दल धन्यवाद. कामाच्या ठिकाणी होणारा छळ, कौटुंबिक हिंसाचार, प्रसूती रजा, समान वेतन आणि घटस्फोट यासंबंधीचे तुमचे हक्क समजून घेण्यास मी मदत करू शकते. काय झाले याबद्दल तुम्ही थोडी अधिक माहिती देऊ शकाल का?"
};

async function updateFile(filename, chatObj) {
  const content = await fs.readFile(filename, 'utf-8');
  const json = JSON.parse(content);
  Object.assign(json, chatObj);
  await fs.writeFile(filename, JSON.stringify(json, null, 4));
}

async function run() {
  await updateFile('./app/translations/en.json', enChat);
  await updateFile('./app/translations/hi.json', hiChat);
  await updateFile('./app/translations/mr.json', mrChat);
  console.log("Chat translated");
}

run();
