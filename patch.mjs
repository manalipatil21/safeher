import fs from 'fs/promises';

const enRights = [
  {
    id: "domestic-violence",
    title: "Protection from Domestic Violence",
    shortDesc: "The Protection of Women from Domestic Violence Act (2005) gives you legal ways to stop abuse at home and get court protection.",
    fullDetails: [
      "What it covers: Any physical, emotional, sexual, or financial abuse by a family member living with you.",
      "Your Rights: You can stay in your shared home, get court orders to keep the abuser away, receive financial support, and keep custody of your children.",
      "How to act: Report the abuse to a Protection Officer or your local police station. You can also get a free lawyer.",
      "Important: The court can quickly issue a restraining order to keep you safe while other legal steps are taken."
    ],
    icon: "🏠",
    color: "bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-400"
  },
  {
    id: "workplace-harassment",
    title: "Workplace Harassment",
    shortDesc: "The Sexual Harassment of Women at Workplace Act (2013) makes it mandatory for offices to have a committee to handle harassment complaints.",
    fullDetails: [
      "What it covers: Any unwanted sexual behavior, such as touching, asking for sexual favors, or making inappropriate comments.",
      "Your Rights: Every workplace with 10 or more workers must have an Internal Complaints Committee (ICC) to help you.",
      "How to act: Submit a written complaint to the ICC within 3 months of the incident happening.",
      "Protection: Your boss cannot fire you for complaining, and your identity will be kept completely secret."
    ],
    icon: "💼",
    color: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400"
  },
  {
    id: "maternity",
    title: "Maternity Benefits",
    shortDesc: "The Maternity Benefit Act gives working mothers 26 weeks of paid leave in companies with 10 or more employees.",
    fullDetails: [
      "What it covers: It protects your job and income while you are pregnant and after you have your baby.",
      "Your Rights: You get 26 weeks of paid time off for your first two children (and 12 weeks for any children after that).",
      "Additions: If your company has 50 or more employees, they must provide a day-care (creche) facility.",
      "Protection: It is against the law for your boss to fire you while you are on maternity leave."
    ],
    icon: "👶",
    color: "bg-green-50 text-green-700 border-green-200 hover:border-green-400"
  },
  {
    id: "equal-pay",
    title: "Right to Equal Pay",
    shortDesc: "The Equal Remuneration Act makes sure that men and women get paid the exact same amount for doing the same work.",
    fullDetails: [
      "What it covers: It stops employers from paying women less than men just because of their gender.",
      "Your Rights: You must receive the same salary, bonuses, and allowances as a male coworker doing a similar job.",
      "How to act: If you are being paid less, you can complain to the Labour Commissioner.",
      "Important: This rule applies to your base salary as well as any extra benefits."
    ],
    icon: "💰",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:border-yellow-400"
  },
  {
    id: "anonymity",
    title: "Right to Anonymity",
    shortDesc: "Under IPC Section 228A, victims of sexual assault have the right to keep their identity completely secret.",
    fullDetails: [
      "What it covers: It protects the privacy and dignity of sexual assault survivors.",
      "Your Rights: No one is allowed to print or publish your name or any details that could reveal who you are.",
      "Media Restrictions: Newspapers, TV, and social media cannot share any hints about your identity.",
      "Trials: Court hearings for sexual assault cases should ideally happen in private, without the public present."
    ],
    icon: "🛡️",
    color: "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-400"
  },
  {
    id: "legal-aid",
    title: "Free Legal Aid",
    shortDesc: "The Legal Services Authorities Act gives female victims the right to a free lawyer, no matter how much money they make.",
    fullDetails: [
      "What it covers: The government will pay for your lawyer and other court costs.",
      "Your Rights: Every woman is entitled to free legal help, regardless of her income.",
      "What's included: This covers writing legal documents, having a lawyer argue your case in court, and paying court fees.",
      "How to claim: You can go to the District Legal Services Authority (DLSA) office located in any district court."
    ],
    icon: "⚖️",
    color: "bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400"
  }
];

const hiRights = [
  {
    id: "domestic-violence",
    title: "घरेलू हिंसा से सुरक्षा",
    shortDesc: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम (2005) आपको घर में दुर्व्यवहार रोकने और अदालत से सुरक्षा पाने के कानूनी तरीके देता है।",
    fullDetails: [
      "इसमें क्या शामिल है: आपके साथ रहने वाले परिवार के किसी सदस्य द्वारा कोई भी शारीरिक, भावनात्मक, यौन या वित्तीय दुर्व्यवहार।",
      "आपके अधिकार: आप अपने साझा घर में रह सकती हैं, दुर्व्यवहार करने वाले को दूर रखने के लिए अदालत से आदेश प्राप्त कर सकती हैं, वित्तीय सहायता प्राप्त कर सकती हैं और अपने बच्चों की कस्टडी रख सकती हैं।",
      "क्या करें: दुर्व्यवहार की रिपोर्ट सुरक्षा अधिकारी या अपने स्थानीय पुलिस स्टेशन में करें। आपको एक मुफ्त वकील भी मिल सकता है।",
      "महत्वपूर्ण: अदालत आपको सुरक्षित रखने के लिए तुरंत एक निरोधक आदेश जारी कर सकती है।"
    ],
    icon: "🏠",
    color: "bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-400"
  },
  {
    id: "workplace-harassment",
    title: "कार्यस्थल पर उत्पीड़न",
    shortDesc: "कार्यस्थल पर महिलाओं का यौन उत्पीड़न अधिनियम (2013) के तहत कार्यालयों में उत्पीड़न की शिकायतों को संभालने के लिए एक समिति होना अनिवार्य है।",
    fullDetails: [
      "इसमें क्या शामिल है: कोई भी अवांछित यौन व्यवहार, जैसे छूना, यौन अनुग्रह मांगना, या अनुचित टिप्पणी करना।",
      "आपके अधिकार: 10 या अधिक कर्मचारियों वाले प्रत्येक कार्यस्थल में आपकी मदद के लिए एक आंतरिक शिकायत समिति (ICC) होनी चाहिए।",
      "क्या करें: घटना होने के 3 महीने के भीतर ICC को लिखित शिकायत दर्ज करें।",
      "सुरक्षा: शिकायत करने के लिए आपका बॉस आपको नौकरी से नहीं निकाल सकता है, और आपकी पहचान पूरी तरह से गुप्त रखी जाएगी।"
    ],
    icon: "💼",
    color: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400"
  },
  {
    id: "maternity",
    title: "मातृत्व लाभ",
    shortDesc: "मातृत्व लाभ अधिनियम 10 या अधिक कर्मचारियों वाली कंपनियों में कामकाजी माताओं को 26 सप्ताह की सवैतनिक छुट्टी देता है।",
    fullDetails: [
      "इसमें क्या शामिल है: यह आपकी गर्भावस्था के दौरान और बच्चे के जन्म के बाद आपकी नौकरी और आय की रक्षा करता है।",
      "आपके अधिकार: आपको अपने पहले दो बच्चों के लिए 26 सप्ताह की सवैतनिक छुट्टी मिलती है (और उसके बाद किसी भी बच्चे के लिए 12 सप्ताह)।",
      "अतिरिक्त: यदि आपकी कंपनी में 50 या अधिक कर्मचारी हैं, तो उन्हें डे-केयर (क्रेच) सुविधा प्रदान करनी होगी।",
      "सुरक्षा: मैटरनिटी लीव पर होने के दौरान आपके बॉस द्वारा आपको नौकरी से निकालना कानून के खिलाफ है।"
    ],
    icon: "👶",
    color: "bg-green-50 text-green-700 border-green-200 hover:border-green-400"
  },
  {
    id: "equal-pay",
    title: "समान वेतन का अधिकार",
    shortDesc: "समान पारिश्रमिक अधिनियम यह सुनिश्चित करता है कि पुरुषों और महिलाओं को समान काम के लिए बिल्कुल समान राशि का भुगतान किया जाए।",
    fullDetails: [
      "इसमें क्या शामिल है: यह नियोक्ताओं को उनके लिंग के कारण महिलाओं को पुरुषों से कम भुगतान करने से रोकता है।",
      "आपके अधिकार: आपको समान काम करने वाले पुरुष सहकर्मी के समान वेतन, बोनस और भत्ते मिलने चाहिए।",
      "क्या करें: यदि आपको कम भुगतान किया जा रहा है, तो आप श्रम आयुक्त से शिकायत कर सकती हैं।",
      "महत्वपूर्ण: यह नियम आपके मूल वेतन के साथ-साथ किसी भी अतिरिक्त लाभ पर लागू होता है।"
    ],
    icon: "💰",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:border-yellow-400"
  },
  {
    id: "anonymity",
    title: "गुमनामी का अधिकार",
    shortDesc: "आईपीसी धारा 228A के तहत, यौन उत्पीड़न की पीड़ितों को अपनी पहचान पूरी तरह से गुप्त रखने का अधिकार है।",
    fullDetails: [
      "इसमें क्या शामिल है: यह यौन उत्पीड़न की सर्वाइवर्स की गोपनीयता और सम्मान की रक्षा करता है।",
      "आपके अधिकार: किसी को भी आपका नाम या कोई भी विवरण छापने या प्रकाशित करने की अनुमति नहीं है जिससे पता चले कि आप कौन हैं।",
      "मीडिया पर प्रतिबंध: समाचार पत्र, टीवी और सोशल मीडिया आपकी पहचान के बारे में कोई संकेत साझा नहीं कर सकते हैं।",
      "परीक्षण: यौन उत्पीड़न के मामलों की अदालत में सुनवाई आदर्श रूप से निजी में, जनता की उपस्थिति के बिना होनी चाहिए।"
    ],
    icon: "🛡️",
    color: "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-400"
  },
  {
    id: "legal-aid",
    title: "मुफ्त कानूनी सहायता",
    shortDesc: "कानूनी सेवा प्राधिकरण अधिनियम महिला पीड़ितों को मुफ्त वकील का अधिकार देता है, चाहे उनकी आय कितनी भी हो।",
    fullDetails: [
      "इसमें क्या शामिल है: सरकार आपके वकील और अदालत के अन्य खर्चों का भुगतान करेगी।",
      "आपके अधिकार: हर महिला को अपनी आय की परवाह किए बिना मुफ्त कानूनी मदद पाने का अधिकार है।",
      "क्या-क्या शामिल है: इसमें कानूनी दस्तावेज़ लिखना, वकील द्वारा अदालत में आपके मामले पर बहस करना और अदालती शुल्क का भुगतान करना शामिल है।",
      "दावा कैसे करें: आप किसी भी जिला अदालत में स्थित जिला कानूनी सेवा प्राधिकरण (DLSA) कार्यालय जा सकती हैं।"
    ],
    icon: "⚖️",
    color: "bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400"
  }
];

const mrRights = [
  {
    id: "domestic-violence",
    title: "कौटुंबिक हिंसेपासून संरक्षण",
    shortDesc: "कौटुंबिक हिंसाचारापासून महिलांचे संरक्षण कायदा (2005) तुम्हाला घरातील अत्याचार थांबवण्यासाठी आणि न्यायालयाचे संरक्षण मिळवण्यासाठी कायदेशीर मार्ग देतो.",
    fullDetails: [
      "यात काय समाविष्ट आहे: तुमच्यासोबत राहणाऱ्या कुटुंबातील कोणत्याही सदस्याकडून होणारा कोणताही शारीरिक, भावनिक, लैंगिक किंवा आर्थिक छळ.",
      "तुमचे अधिकार: तुम्ही तुमच्या सामायिक घरात राहू शकता, अत्याचारी व्यक्तीला दूर ठेवण्यासाठी न्यायालयाकडून आदेश मिळवू शकता, आर्थिक मदत मिळवू शकता आणि तुमच्या मुलांची कस्टडी ठेवू शकता.",
      "काय करावे: अत्याचाराची तक्रार संरक्षण अधिकारी किंवा स्थानिक पोलीस स्टेशनमध्ये करा. तुम्हाला मोफत वकील देखील मिळू शकतो.",
      "महत्त्वाचे: सुरक्षा सुनिश्चित करण्यासाठी न्यायालय तात्काळ मनाई हुकूम जारी करू शकते."
    ],
    icon: "🏠",
    color: "bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-400"
  },
  {
    id: "workplace-harassment",
    title: "कामाच्या ठिकाणी होणारा छळ",
    shortDesc: "कामाच्या ठिकाणी महिलांचा लैंगिक छळ कायदा (2013) अंतर्गत कार्यालयांमध्ये छळाच्या तक्रारी हाताळण्यासाठी समिती असणे अनिवार्य आहे.",
    fullDetails: [
      "यात काय समाविष्ट आहे: कोणतेही अवांछित लैंगिक वर्तन, जसे स्पर्श करणे, लैंगिक आधारावर मागण्या करणे किंवा अयोग्य टिपण्णी करणे.",
      "तुमचे अधिकार: 10 किंवा अधिक कर्मचारी असलेल्या प्रत्येक कामाच्या ठिकाणी तुमच्या मदतीसाठी अंतर्गत तक्रार निवारण समिती (ICC) असणे आवश्यक आहे.",
      "काय करावे: घटना घडल्यापासून 3 महिन्यांच्या आत ICC कडे लेखी तक्रार दाखल करा.",
      "संरक्षण: तक्रार केल्याबद्दल तुमचा बॉस तुम्हाला कामावरून काढू शकत नाही, आणि तुमची ओळख पूर्णपणे गुप्त ठेवली जाईल."
    ],
    icon: "💼",
    color: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400"
  },
  {
    id: "maternity",
    title: "मातृत्व लाभ",
    shortDesc: "मातृत्व लाभ कायदा 10 किंवा अधिक कर्मचारी असलेल्या कंपन्यांमधील नोकरदार मातांना 26 आठवड्यांची भरपगारी रजा देतो.",
    fullDetails: [
      "यात काय समाविष्ट आहे: हे तुमच्या गरोदरपणात आणि बाळ झाल्यानंतर तुमची नोकरी आणि उत्पन्नाचे रक्षण करते.",
      "तुमचे अधिकार: तुम्हाला तुमच्या पहिल्या दोन मुलांसाठी 26 आठवड्यांची भरपगारी रजा मिळते (आणि त्यानंतरच्या कोणत्याही मुलासाठी 12 आठवडे).",
      "अधिक: जर तुमच्या कंपनीत 50 किंवा अधिक कर्मचारी असतील, तर त्यांनी पाळणाघर (क्रेच) सुविधा पुरवली पाहिजे.",
      "संरक्षण: तुम्ही मातृत्व रजेवर असताना तुमच्या बॉसने तुम्हाला कामावरून काढणे बेकायदेशीर आहे."
    ],
    icon: "👶",
    color: "bg-green-50 text-green-700 border-green-200 hover:border-green-400"
  },
  {
    id: "equal-pay",
    title: "समान वेतनाचा अधिकार",
    shortDesc: "समान मोबदला कायदा हे सुनिश्चित करतो की समान कामासाठी पुरुष आणि स्त्रियांना बिल्कुल समान रक्कम दिली जावी.",
    fullDetails: [
      "यात काय समाविष्ट आहे: हे नियोक्त्यांना केवळ लिंगाच्या आधारे महिलांना पुरुषांपेक्षा कमी पगार देण्यापासून रोखते.",
      "तुमचे अधिकार: समान काम करणाऱ्या पुरुष सहकाऱ्याइतकाच पगार, बोनस आणि भत्ते तुम्हाला मिळायला हवे.",
      "काय करावे: जर तुम्हाला कमी पगार दिला जात असेल, तर तुम्ही कामगार आयुक्तांकडे तक्रार करू शकता.",
      "महत्त्वाचे: हा नियम तुमच्या मूळ पगारासोबतच कोणत्याही अतिरिक्त लाभांना लागू होतो."
    ],
    icon: "💰",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:border-yellow-400"
  },
  {
    id: "anonymity",
    title: "निनावी राहण्याचा अधिकार",
    shortDesc: "IPC कलम 228A अंतर्गत, लैंगिक अत्याचाराला बळी पडलेल्या व्यक्तींना त्यांची ओळख पूर्णपणे गुप्त ठेवण्याचा अधिकार आहे.",
    fullDetails: [
      "यात काय समाविष्ट आहे: हे लैंगिक अत्याचार पीडितांच्या गोपनीयतेचे आणि सन्मानाचे रक्षण करते.",
      "तुमचे अधिकार: कोणालाही तुमचे नाव किंवा तुम्ही कोण आहात हे उघड करू शकेल असा कोणताही तपशील छापण्याची किंवा प्रकाशित करण्याची परवानगी नाही.",
      "माध्यमांवर बंधने: वृत्तपत्रे, टीव्ही आणि सोशल मीडिया तुमच्या ओळखीविषयी कोणतेही संकेत शेअर करू शकत नाहीत.",
      "खटले: लैंगिक अत्याचाराच्या प्रकरणातील सुनावणी शक्यतो बंद दरवाजाआड, लोकांच्या उपस्थितीविना पार पडली पाहिजे."
    ],
    icon: "🛡️",
    color: "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-400"
  },
  {
    id: "legal-aid",
    title: "मोफत कायदेशीर मदत",
    shortDesc: "कायदेशीर सेवा प्राधिकरण कायदा महिला पीडितांना, त्यांचे उत्पन्न कितीही असले तरी, मोफत वकिलाचा अधिकार देतो.",
    fullDetails: [
      "यात काय समाविष्ट आहे: सरकार तुमच्या वकिलाचा आणि इतर न्यायालयीन खर्चाचा भरणा करेल.",
      "तुमचे अधिकार: उत्पन्नाची पर्वा न करता प्रत्येक महिलेला मोफत कायदेशीर मदत मिळण्याचा हक्क आहे.",
      "कशाचा समावेश: यात कायदेशीर कागदपत्रे तयार करणे, वकिलाकडून न्यायालयात तुमची केस लढवणे आणि न्यायालयीन फी भरणे समाविष्ट आहे.",
      "कसा दावा करावा: तुम्ही कोणत्याही जिल्हा न्यायालयात असलेल्या जिल्हा विधी सेवा प्राधिकरण (DLSA) कार्यालयात जाऊ शकता."
    ],
    icon: "⚖️",
    color: "bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400"
  }
];

async function updateFile(filename, rightsArray) {
  const content = await fs.readFile(filename, 'utf-8');
  const json = JSON.parse(content);
  json.rights_list = rightsArray;
  await fs.writeFile(filename, JSON.stringify(json, null, 4));
}

async function run() {
  await updateFile('./app/translations/en.json', enRights);
  await updateFile('./app/translations/hi.json', hiRights);
  await updateFile('./app/translations/mr.json', mrRights);
  console.log("Updated");
}

run();
