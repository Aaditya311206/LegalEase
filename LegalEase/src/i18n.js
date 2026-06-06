import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home", "checker": "Checker", "policies": "Policies", "dashboard": "Dashboard", "logout": "Sign Out", "sign_in": "Sign In",
      "your_legal_guardian": "YOUR PERSONAL LEGAL GUARDIAN",
      "home_title_main": "Legal Intelligence, ", "home_title_highlight": "Simplified.",
      "home_desc": "Upload your legal documents and let our engine instantly detect risks, missing clauses, and unfair terms before you sign.",
      "home_btn": "Start Analyzing Now",
      "auth_title": "Understand your contracts before you sign them.",
      "auth_subtitle": "Welcome back", "auth_desc": "Enter your credentials to access your personal legal guardian.",
      "auth_feature_1": "Precision risk detection engine", "auth_feature_2": "Instant clear-language simplification", "auth_feature_3": "Bank-grade data encryption & privacy",
      "feature_1_desc": "Our high-fidelity audit identifies liability traps and hidden risks.",
      "feature_2_desc": "Ensure every agreement aligns with local laws and protocols.",
      "feature_3_desc": "Documents are auto-purged immediately after your session.",
      "signup_feat_1": "Access all legal tools", "signup_feat_2": "Verify documents in seconds", "signup_feat_3": "Stay updated on policies",
      "create_account_title": "Create your account", "join_legalease": "Join LegalEase",
      "signup_desc": "Start your professional legal journey today.", "full_name": "Full Name",
      "register_btn": "Register Account", "already_account": "Already have an account?",
      "email_label": "Email address", "password_label": "Password", "forgot_password": "Forgot password?",
      "login_btn": "Sign In", "no_account": "Don't have an account?", "create_account": "Create an account",
      "app_title": "Smart Document Checker", "upload_desc": "Our engine performs a comprehensive multi-point compliance check instantly.",
      "select_doc_type": "Select Legal Instrument Category", "placeholder_doc_type": "-- Choose the type of document for audit --",
      "warn_select_type": "Please select a category to enable the secure upload engine",
      "drop_file": "Release to Upload", "upload_instruction": "Drag and drop your file here, or click to browse securely.",
      "supports_text": "Supports PDF, JPG, PNG (Max 10MB)", "browse_files": "Browse Secure Files",
      "secure_processing": "Documents are processed in memory and never stored permanently.",
      "analyzing": "Performing Legal Audit", "analyzing_status": "Scanning clauses and verifying compliance...",
      "analyze_btn": "Start Legal Audit", "cancel_btn": "Cancel",
      "dash_welcome": "Welcome to your Dashboard", "dash_desc": "Overview of your recent legal analyses.",
      "analyze_new": "Analyze New Document", "total_analyzed": "Total Analyzed", "risks_detected": "Risks Detected", "hours_saved": "Hours Saved",
      "recent_docs": "Recent Documents", "doc_name": "Document Name", "type": "Type", "date": "Date", "safety_score": "Safety Score",
      "view_report": "View Report", "no_docs": "No documents analyzed yet.", "latest_tag": "Latest Activity", "action": "Action",
      "policy_title": "Government Policy Tracker", "policy_sub": "Showing {{count}} total updates.", "policy_search": "Search through policies...", "policy_tag": "Policy Update", "view_doc": "View Document", "page": "PAGE", "of": "OF", "no_match": "No policies match.",
      "auth_quote": "LegalEase saved me from a predatory non-compete clause.",
      "auth_author": "Tech Founder, San Francisco",
      
      // ✅ ANALYSIS REPORT METRIC KEYS (English)
      "analyze_another": "Analyze Another Document",
      "compliance_complete": "Compliance Analysis Complete",
      "safety_score_label": "Legal Safety Score",
      "detected_risks": "Detected Legal Risks",
      "issues_found": "Issues Found",
      "policy_alignment_label": "Policy & Law Alignment",
      "verify_against": "Verify against",
      "live_policy_title": "Live Policy Updates (PRS India)",
      "fetching_policies": "Fetching latest government bills...",
      "no_risks_found": "No compliance risks detected by AI."
    }
  },
  hi: {
    translation: {
      "home": "होम", "checker": "चेकर", "policies": "नीतियां", "dashboard": "डैशबोर्ड", "logout": "साइन आउट", "sign_in": "साइन इन",
      "your_legal_guardian": "आपका व्यक्तिगत कानूनी रक्षक",
      "home_title_main": "कानूनी बुद्धिमत्ता, ", "home_title_highlight": "सरलीकृत।",
      "home_desc": "अपने कानूनी दस्तावेज अपलोड करें and हमारे इंजन को हस्ताक्षर करने से पहले जोखिमों का पता लगाने दें।",
      "home_btn": "अभी शुरू करें",
      "auth_title": "हस्ताक्षर करने से पहले अपने अनुबंधों को समझें।",
      "auth_subtitle": "वापसी पर स्वागत है", "auth_desc": "अपने व्यक्तिगत कानूनी रक्षक तक पहुँचने के लिए अपनी जानकारी दर्ज करें।",
      "auth_feature_1": "सटीक जोखिम पहचान इंजन", "auth_feature_2": "तत्काल स्पष्ट-भाषा सरलीकरण", "auth_feature_3": "बैंक-ग्रेड डेटा सुरक्षा",
      "feature_1_desc": "हमारा ऑडिट देयता जाल और छिपे हुए जोखिमों की पहचान करता है।",
      "feature_2_desc": "सुनिश्चित करें कि प्रत्येक समझौता स्थानीय कानूनों के अनुरूप है।",
      "feature_3_desc": "आपके सत्र के तुरंत बाद दस्तावेज़ हटा दिए जाते हैं।",
      "signup_feat_1": "सभी कानूनी उपकरणों तक पहुंच", "signup_feat_2": "सेकंड में दस्तावेजों को सत्यापित करें", "signup_feat_3": "नीतियों पर अपडेट रहें",
      "create_account_title": "अपना खाता बनाएं", "join_legalease": "लीगलईज़ से जुड़ें", "signup_desc": "आज ही अपनी कानूनी यात्रा शुरू करें।", "full_name": "पूरा नाम", "register_btn": "खाता पंजीकृत करें", "already_account": "खाता है?", "email_label": "ईमेल पता", "password_label": "पासवर्ड", "login_btn": "साइन इन", "create_account": "खाता बनाएं",
      "app_title": "स्मार्ट दस्तावेज़ चेकर", "upload_desc": "हमारा इंजन तुरंत व्यापक अनुपालन जांच करता है।", "select_doc_type": "कानूनी श्रेणी चुनें", "placeholder_doc_type": "-- ऑडिट के लिए दस्तावेज़ प्रकार चुनें --", "warn_select_type": "पहले श्रेणी चुनें", "drop_file": "अपलोड के लिए छोड़ें", "upload_instruction": "फ़ाइल यहाँ खींचें या क्लिक करें", "browse_files": "सुरक्षित फ़ाइलें खोजें", "secure_processing": "दस्तावेज़ सुरक्षित रूप से संसाधित होते हैं।", "analyzing": "कानूनी ऑडिट जारी है", "analyzing_status": "अनुपालन की पुष्टि की जा रही है...", "analyze_btn": "कानूनी ऑडिट शुरू करें", "cancel_btn": "रद्द करें",
      "dash_welcome": "डैशबोर्ड में स्वागत है", "dash_desc": "हालिया विश्लेषणों का विवरण।", "analyze_new": "नया विश्लेषण", "total_analyzed": "कुल विश्लेषित", "risks_detected": "जोखिम मिले", "hours_saved": "घंटे बचाए", "recent_docs": "हाल के दस्तावेज़", "doc_name": "दस्तावेज़ नाम", "type": "प्रकार", "date": "तारीख", "safety_score": "स्कोर", "view_report": "रिपोर्ट देखें", "no_docs": "कोई दस्तावेज़ नहीं मिला।", "latest_tag": "नवीनतम गतिविधि", "action": "कार्रवाई",
      "policy_title": "सरकारी नीति ट्रैकर", "policy_sub": "कुल {{count}} अपडेट।", "policy_search": "खोजें...", "policy_tag": "नीति अपडेट", "view_doc": "देखें", "page": "पृष्ठ", "of": "का", "no_match": "कोई नीति नहीं मिली।",
      "auth_quote": "LegalEase ने मुझे एक खतरनाक गैर-प्रतिस्पर्धा खंड से बचा लिया।",
      "auth_author": "टेक संस्थापक, सैन फ्रांसिस्को",

      // ✅ ANALYSIS REPORT METRIC KEYS (Hindi)
      "analyze_another": "दूसरे दस्तावेज़ का विश्लेषण करें",
      "compliance_complete": "अनुपालन विश्लेषण पूर्ण",
      "safety_score_label": "कानूनी सुरक्षा स्कोर",
      "detected_risks": "काले गए कानूनी जोखिम",
      "issues_found": "समीक्षा बिंदु मिले",
      "policy_alignment_label": "नीति और कानून संरेखण",
      "verify_against": "इसके विरुद्ध सत्यापित करें",
      "live_policy_title": "लाइव नीति अपडेट (PRS इंडिया)",
      "fetching_policies": "नवीनतम सरकारी विधेयकों को लाया जा रहा है...",
      "no_risks_found": "एआई द्वारा कोई अनुपालन जोखिम नहीं मिला।"
    }
  },
  ta: {
    translation: {
      "home": "முகப்பு", "checker": "சரிபார்ப்பு", "policies": "கொள்கைகள்", "dashboard": "டேஷ்போர்டு", "logout": "வெளியேறு", "sign_in": "உள்நுழை",
      "your_legal_guardian": "உங்கள் தனிப்பட்ட சட்டப் பாதுகாவலர்",
      "home_title_main": "சட்ட நுண்ணறிவு, ", "home_title_highlight": "எளிமைப்படுத்தப்பட்டது.",
      "home_desc": "உங்கள் சட்ட ஆவணங்களைப் பதிவேற்றுங்கள், அபாயங்களை எங்கள் எஞ்சின் கண்டறியும்.",
      "home_btn": "இப்போదే தொடங்குங்கள்",
      "auth_title": "ஒப்பந்தங்களில் கையெழுத்திடும் முன் அவற்றைப் புரிந்து கொள்ளுங்கள்.",
      "auth_subtitle": "மீண்டும் வருக", "auth_desc": "உங்கள் தனிப்பட்ட சட்டப் பாதுகாவலரை அணுகவும்.",
      "auth_feature_1": "துல்லியமான அபாயக் கண்டறிதல்", "auth_feature_2": "தெளிவான மொழி எளிமைப்படுத்தல்", "auth_feature_3": "வங்கி-தரவு பாதுகாப்பு",
      "feature_1_desc": "எங்கள் தணிக்கை மறைக்கப்பட்ட சட்ட அபாயங்களைக் கண்டறியும்.", "feature_2_desc": "உள்ளூர் சட்டங்களுக்கு இணங்குவதை உறுதி செய்யவும்.", "feature_3_desc": "ஆவணங்கள் உடனடியாக நீக்கப்படும்.",
      "signup_feat_1": "சட்ட கருவிகளுக்கான அணுகல்", "signup_feat_2": "நொடிகளில் சரிபார்க்கவும்", "signup_feat_3": "அறிவிப்புகளைப் பெறுக",
      "create_account_title": "கணக்கை உருவாக்கவும்", "join_legalease": "சேருங்கள்", "signup_desc": "இன்றே தொடங்குங்கள்.", "full_name": "முழு பெயர்", "register_btn": "பதிவுசெயய்", "already_account": "கணக்கு உள்ளதா?", "email_label": "மின்னஞ்சல்", "password_label": "கடவுச்சொல்", "login_btn": "உள்நுழை", "create_account": "கணக்கை உருவாக்கவும்",
      "app_title": "ஸ்மார்ட் ஆவண சரிபார்ப்பு", "upload_desc": "எங்கள் எஞ்சின் விரிவான சோதனையை உடனே செய்யும்.", "select_doc_type": "வகையைத் தேர்ந்தெடுக்கவும்", "placeholder_doc_type": "-- ஆவண வகையைத் தேர்ந்தெடுக்கவும் --", "warn_select_type": "முதலில் வகையைத் தேர்ந்தெடுக்கவும்", "drop_file": "இங்கே விடுங்கள்", "upload_instruction": "கோப்பை இங்கே இழுக்கவும்", "browse_files": "கோப்புகளைத் தேடு", "secure_processing": "ஆவணங்கள் நிரந்தரமாக சேமிக்கப்படாது.", "analyzing": "சட்ட ஆய்வு செய்யப்படுகிறது", "analyzing_status": "சரிபார்க்கப்படுகிறது...", "analyze_btn": "ஆய்வைத் தொடங்கு", "cancel_btn": "ரத்து",
      "dash_welcome": "டேஷ்போர்டிற்கு வரவேற்கிறோம்", "dash_desc": "பகுப்பாய்வுகளின் கண்ணோட்டம்.", "analyze_new": "புதிய பகுப்பாய்வு", "total_analyzed": "மொத்தம்", "risks_detected": "அபாயங்கள்", "hours_saved": "சேமிக்கப்பட்ட நேரம்", "recent_docs": "சமீபத்திய ஆவணங்கள்", "doc_name": "பெயர்", "type": "வகை", "date": "தேதி", "safety_score": "மதிப்பெண்", "view_report": "பார்க்க", "no_docs": "எதுவும் இல்லை.", "latest_tag": "நடவடிக்கை", "action": "நடவடிக்கை",
      "policy_title": "அரசு கொள்கை டிராக்கர்", "policy_sub": "மொத்தம் {{count}} புதுப்பிப்புகள்.", "policy_search": "தேடு...", "policy_tag": "அப்டேட்", "view_doc": "பார்க்க", "page": "பக்கம்", "of": "இல்", "no_match": "எதுவும் இல்லை.",
      "auth_quote": "LegalEase ஒரு ஆபத்தான போட்டியற்ற ஒப்பந்தத்திலிருந்து என்னைக் காப்பாற்றியது.",
      "auth_author": "தொழில்நுட்ப நிறுவனர், சான் பிரான்சிஸ்கோ",

      // ✅ ANALYSIS REPORT METRIC KEYS (Tamil)
      "analyze_another": "மற்றொரு ஆவணத்தை பகுப்பாய்வு செய்",
      "compliance_complete": "இணக்க பகுப்பாய்வு முடிந்தது",
      "safety_score_label": "சட்ட பாதுகாப்பு மதிப்பெண்",
      "detected_risks": "கண்டறியப்பட்ட சட்ட அபாயங்கள்",
      "issues_found": "சிக்கல்கள் கண்டறியப்பட்டுள்ளன",
      "policy_alignment_label": "கொள்கை மற்றும் சட்ட சீரமைப்பு",
      "verify_against": "சரிபார்க்கவும்",
      "live_policy_title": "நேரடி கொள்கை மேம்படுத்தல்கள் (PRS இந்தியா)",
      "fetching_policies": "சமீபத்திய அரசு மசோதாக்கள் பெறப்படுகின்றன...",
      "no_risks_found": "AI ஆல் இணக்க அபாயங்கள் எதுவும் கண்டறியப்படவில்லை."
    }
  },
  te: {
    translation: {
      "home": "హోమ్", "checker": "చెకర్", "policies": "విధానాలు", 
      // 👇 ✅ FIXED: Clean mapping wrapper for Telugu navigation routes
      "dashboard": "డాష్‌బోర్డ్", 
      "logout": "లాగ్ అవుట్", "sign_in": "సైన్ ఇన్",
      "your_legal_guardian": "మీ వ్యక్తిగత చట్టపరమైన రక్షకుడు",
      "home_title_main": "చట్టపరమైన మేధస్సు, ", "home_title_highlight": "సరళీకృతం.",
      "home_desc": "మీ చట్టపరమైన పత్రాలను అప్‌లోడ్ చేయండి, మా ఇంజిన్ నష్టాలను గుర్తిస్తుంది.",
      "home_btn": "ఇప్పుడే ప్రారంభించండి",
      "auth_title": "మీరు సంతకం చేసే ముందు ఒప్పందాలను అర్థం చేసుకోండి.",
      "auth_subtitle": "మళ్ళీ స్వాగతం", "auth_desc": "మీ వ్యక్తిగత చట్టపరమైన రక్షకుడిని యాక్సెస్ చేయండి.",
      "auth_feature_1": "ఖచ్చితమైన రిస్క్ గుర్తింపు", "auth_feature_2": "సరళమైన భాషా వివరణ", "auth_feature_3": "బ్యాంక్-గ్రేడ్ భద్రత",
      "feature_1_desc": "మా ఆడిట్ దాగి ఉన్న నష్టాలను గుర్తిస్తుంది.", "feature_2_desc": "స్థానిక చట్టాలకు అనుగుణంగా ఉందని నిర్ధారించుకోండి.", "feature_3_desc": "పత్రాలు వెంటనే తొలగించబడతాయి.",
      "signup_feat_1": "సాధనాల యాక్సెస్", "signup_feat_2": "ధృవీకరణ", "signup_feat_3": "పాలసీ అప్‌డేట్స్",
      "create_account_title": "ఖాతాను సృష్టించండి", "join_legalease": "చేరండి", "signup_desc": "நேడే ప్రారంభించండి.", "full_name": "పూర్తి పేరు", "register_btn": "నమోదు చేయండి", "already_account": "ఖాతా ఉందా?", "email_label": "ఈమెయిల్", "password_label": "పాస్‌వర్డ్", "login_btn": "సైన్ ఇన్", "create_account": "ఖాతా సృష్టించండి",
      "app_title": "స్మార్ట్ డాక్యుమెంట్ చెకర్", "upload_desc": "మా ఇంజిన్ సమగ్ర తనిఖీని వెంటనే చేస్తుంది.", "select_doc_type": "వర్గాన్ని ఎంచుకోండి", "placeholder_doc_type": "-- రకాన్ని ఎంచుకోండి --", "warn_select_type": "ముందుగా వర్గాన్ని ఎంచుకోండి", "drop_file": "ఇక్కడ వదలండి", "upload_instruction": "ఫైల్‌ను ఇక్కడ లాగండి", "browse_files": "ఫైల్‌లను వెతకండి", "secure_processing": "పత్రాలు నిల్వ చేయబడవు.", "analyzing": "ఆడిట్ జరుగుతోంది", "analyzing_status": "ధృవీకరిస్తున్నాము...", "analyze_btn": "ఆడిట్ ప్రారంభించండి", "cancel_btn": "రద్దు",
      "dash_welcome": "డాష్‌బోర్డ్‌కు స్వాగతం", "dash_desc": "విశ్లేషణల అవలోకనం.", "analyze_new": "కొత్త విశ్లేషణ", "total_analyzed": "మొత్తం", "risks_detected": "నష్టాలు", "hours_saved": "సమయం", "recent_docs": "పత్రాలు", "doc_name": "పేరు", "type": "రకం", "date": "తేదీ", "safety_score": "స్కోరు", "view_report": "చూడండి", "no_docs": "లేవు.", "latest_tag": "యాక్టివిటీ", "action": "చర్య",
      "policy_title": "పాలసీ ట్రాకర్", "policy_sub": "{{count}} నవీకరణలు.", "policy_search": "వెతకండి...", "policy_tag": "అప్‌డేట్", "view_doc": "చూడండి", "page": "పేజీ", "of": "లో", "no_match": "ఏమీ లేవు.",
      "auth_quote": "LegalEase నన్ను ప్రమాదకరమైన ఒప్పందం నుండి కాపాడింది.",
      "auth_author": "టెక్ ఫౌండర్, శాన్ ఫ్రాన్సిస్కో",

      // ✅ ANALYSIS REPORT METRIC KEYS (Telugu)
      "analyze_another": "మరొక పత్రాన్ని విశ్లేషించండి",
      "compliance_complete": "సమ్మతి విశ్లేషణ పూర్తయింది",
      "safety_score_label": "చట్టపరమైన భద్రతా స్కోరు",
      "detected_risks": "గుర్తించబడిన చట్టపరమైన నష్టాలు",
      "issues_found": "సమస్యలు కనుగొనబడ్డాయి",
      "policy_alignment_label": "విధానం & చట్ట అమరిక",
      "verify_against": "సరిచూసుకోండి",
      "live_policy_title": "प्रत्यक्ष విధాన నవీకరణలు (PRS ఇండియా)",
      "fetching_policies": "తాజా ప్రభుత్వ బిల్లులను తీసుకువస్తున్నాము...",
      "no_risks_found": "AI ద్వారా ఎటువంటి నిబంధన నష్టాలు కనుగొనబడలేదు."
    }
  },
  mr: {
    translation: {
      "home": "मुख्यपृष्ठ", "checker": "तपासक", "policies": "धोरणे", "dashboard": "डॅशबोर्ड", "logout": "साइन आउट", "sign_in": "साइन इन",
      "your_legal_guardian": "तुमचा वैयक्तिक कायदेशीर रक्षक",
      "home_title_main": "कायदेशीर बुद्धिमत्ता, ", "home_title_highlight": "सोपी केली.",
      "home_desc": "तुमची कागदपत्रे अपलोड करा आणि आमचे इंजिन धोके शोधू द्या.",
      "home_btn": "आत्ताच सुरू करा",
      "auth_title": "स्वाक्षरी करण्यापूर्वी तुमचे करार समजून घ्या.",
      "auth_subtitle": "पुन्हा स्वागत", "auth_desc": "तुमच्या वैयक्तिक कायदेशीर रक्षकाकडे जा.",
      "auth_feature_1": "अचूक जोखीम ओळख", "auth_feature_2": "सोपे स्पष्टीकरण", "auth_feature_3": "डेटा सुरक्षा",
      "feature_1_desc": "आमचे ऑडिट कायदेशीर धोके ओळखते.", "feature_2_desc": "स्थानिक कायद्यांशी जुळते याची खात्री करा.", "feature_3_desc": "दस्तऐवज त्वरित काढले जातात.",
      "signup_feat_1": "साधनांचा वापर", "signup_feat_2": "जलद पडताळणी", "signup_feat_3": "धोरणांवर अपडेट रहा",
      "create_account_title": "खाते तयार करा", "join_legalease": "सामील वहा", "signup_desc": "प्रवास सुरू करा.", "full_name": "पूर्ण नाव", "register_btn": "नोंदणी करा", "already_account": "खाते आहे?", "email_label": "ईमेल", "password_label": "पासवर्ड", "login_btn": "साइन इन", "create_account": "खाते तयार करा",
      "app_title": "स्मार्ट दस्तऐवज तपासक", "upload_desc": "आमचे इंजिन त्वरित तपासणी करते.", "select_doc_type": "श्रेणी निवडा", "placeholder_doc_type": "-- प्रकार निवडा --", "warn_select_type": "आधी श्रेणी निवडा", "drop_file": "इथे टाका", "upload_instruction": "काईली इथे ड्रॅग करा", "browse_files": "फायली शोधा", "secure_processing": "दस्तऐवज जतन केले जात नाहीत.", "analyzing": "ऑडिट सुरू आहे", "analyzing_status": "पडताळणी सुरू आहे...", "analyze_btn": "ऑडिट सुरू करा", "cancel_btn": "रद्द",
      "dash_welcome": "डॅशबोर्डवर स्वागत", "dash_desc": "विश्लेषणाचे विहंगावलोकन.", "analyze_new": "नवीन विश्लेषण", "total_analyzed": "एकूण", "risks_detected": "धोके", "hours_saved": "तास", "recent_docs": "अलीकडील दस्तऐवज", "doc_name": "नाव", "type": "प्रकार", "date": "तारीख", "safety_score": "स्कोर", "view_report": "पहा", "no_docs": "आढळले नाहीत.", "latest_tag": "क्रियाकलाप", "action": "कृती",
      "policy_title": "धोरण ट्रॅकर", "policy_sub": "{{count}} अपडेट्स.", "policy_search": "शोधा...", "policy_tag": "अपडेट", "view_doc": "पहा", "page": "पृष्ठ", "of": "पैकी", "no_match": "आढळले नाही.",
      "auth_quote": "LegalEase मुळे मी धोकादायक करारातून वाचलो.",
      "auth_author": "टेक संस्थापक, सॅन फ्रान्सिस्को",

      // ✅ ANALYSIS REPORT METRIC KEYS (Marathi)
      "analyze_another": "दुसऱ्या दस्तऐवजाचे विश्लेषण करा",
      "compliance_complete": "अनुपालन विश्लेषण पूर्ण झाले",
      "safety_score_label": "कायदेशीर सुरक्षा गुण",
      "detected_risks": "आढळलेले कायदेशीर धोके",
      "issues_found": "त्रुटी आढळल्या",
      "policy_alignment_label": "धोरण आणि कायदा संरेखन",
      "verify_against": "विरुद्ध सत्यापित करा",
      "live_policy_title": "थेट धोरण अद्यतने (PRS इंडिया)",
      "fetching_policies": "नवीनतम सरकारी विधेयके आणली जात आहेत...",
      "no_risks_found": "AI द्वारे कोणतेही कायदेशीर धोके आढळले नाहीत."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", 
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;