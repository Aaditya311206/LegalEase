import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar
      "home": "Home", "checker": "Checker", "policies": "Policies", "dashboard": "Dashboard", "logout": "Sign Out", "sign_in": "Sign In",
      
      // Home Page
      "home_title_main": "Legal Intelligence, ",
      "home_title_highlight": "Simplified.",
      "home_desc": "Upload your legal documents and let AI instantly detect risks, missing clauses, and unfair terms before you sign.",
      "home_btn": "Start Analyzing Now",

      // Auth Page
      "auth_title": "Understand your contracts before you sign them.",
      "auth_subtitle": "Welcome back",
      "auth_desc": "Enter your credentials to access your dashboard.",
      "auth_feature_1": "AI-powered risk detection",
      "auth_feature_2": "Instant clause summarization",
      "auth_feature_3": "Bank-grade data encryption",
      "auth_quote": "LegalEase saved me from a predatory non-compete clause.",
      "auth_author": "Tech Founder, San Francisco",
      "email_label": "Email address", "password_label": "Password", "forgot_password": "Forgot password?",
      "login_btn": "Sign In", "no_account": "Don't have an account?", "create_account": "Create an account",

      // Document Checker
      "app_title": "Smart Document Checker",
      "upload_desc": "Upload your rent agreement, NDA, or contract. Our AI will scan for missing clauses and unfair terms instantly.",
      "select_doc_type": "Select Document Type",
      "placeholder_doc_type": "-- Please select a document type --",
      "warn_select_type": "Please select document type first",
      "drop_file": "Drop file here...",
      "upload_instruction": "Drag & drop or click to upload",
      "supports_text": "Supports PDF, JPG, PNG (Max 10MB)",
      "browse_files": "Browse Files",
      "secure_processing": "Documents are encrypted and auto-deleted after analysis.",
      "analyzing_status": "AI is analyzing your document...",
      "analyze_btn": "Analyze Document", "cancel_btn": "Cancel",

      // Dashboard
      "dash_welcome": "Welcome to your Dashboard",
      "dash_desc": "Here is an overview of your recent legal analyses.",
      "analyze_new": "Analyze New Document",
      "total_analyzed": "Total Analyzed", "risks_detected": "Risks Detected", "hours_saved": "Hours Saved",
      "recent_docs": "Recent Documents", "doc_name": "Document Name", "type": "Type", "safety_score": "Safety Score",
      "view_report": "View Report", "no_docs": "No documents analyzed yet.", "latest_tag": "Latest Activity", "action": "Action"
    }
  },
  hi: {
    translation: {
      "home": "होम", "checker": "चेकर", "policies": "नीतियां", "dashboard": "डैशबोर्ड", "logout": "साइन आउट", "sign_in": "साइन इन",
      "home_title_main": "कानूनी बुद्धिमत्ता, ", "home_title_highlight": "सरलीकृत।",
      "home_desc": "जोखिमों और अनुचित शर्तों का पता लगाने के लिए अपने दस्तावेज़ अपलोड करें।",
      "home_btn": "अभी शुरू करें",
      "auth_title": "हस्ताक्षर करने से पहले अपने अनुबंधों को समझें।",
      "auth_subtitle": "वापसी पर स्वागत है", "auth_desc": "डैशबोर्ड तक पहुँचने के लिए अपनी जानकारी दर्ज करें।",
      "auth_feature_1": "एआई-आधारित जोखिम पहचान", "auth_feature_2": "तत्काल क्लॉज सारांश", "auth_feature_3": "बैंक-ग्रेड डेटा सुरक्षा",
      "auth_quote": "लीगलईज़ ने मुझे एक खतरनाक क्लॉज से बचा लिया।", "auth_author": "टेक संस्थापक",
      "email_label": "ईमेल पता", "password_label": "पासवर्ड", "forgot_password": "पासवर्ड भूल गए?",
      "login_btn": "साइन इन", "no_account": "खाता नहीं है?", "create_account": "खाता बनाएं",
      "app_title": "स्मार्ट दस्तावेज़ चेकर", "upload_desc": "अपना रेंट एग्रीमेंट या अनुबंध अपलोड करें।",
      "select_doc_type": "दस्तावेज़ का प्रकार चुनें", "placeholder_doc_type": "-- प्रकार चुनें --",
      "warn_select_type": "पहले दस्तावेज़ प्रकार चुनें", "drop_file": "यहाँ छोड़ें!", "upload_instruction": "क्लिक करें",
      "supports_text": "PDF, JPG, PNG समर्थित (10MB)", "browse_files": "फ़ाइलें खोजें",
      "secure_processing": "दस्तावेज़ विश्लेषण के बाद हटा दिए जाते हैं।", "analyzing_status": "एआई विश्लेषण कर रहा है...",
      "analyze_btn": "विश्लेषण करें", "cancel_btn": "रद्द करें",
      "dash_welcome": "आपके डैशबोर्ड में स्वागत है", "dash_desc": "हालिया विश्लेषणों का विवरण।",
      "analyze_new": "नया विश्लेषण", "total_analyzed": "कुल विश्लेषित", "risks_detected": "जोखिम मिले",
      "hours_saved": "घंटे बचाए", "recent_docs": "हाल के दस्तावेज़", "doc_name": "दस्तावेज़ नाम",
      "type": "प्रकार", "safety_score": "सुरक्षा स्कोर", "view_report": "रिपोर्ट देखें", "no_docs": "कोई दस्तावेज़ नहीं मिला।", "latest_tag": "नवीनतम गतिविधि", "action": "कार्रवाई"
    }
  },
  ta: {
    translation: {
      "home": "முகப்பு", "checker": "சரிபார்ப்பு", "policies": "கொள்கைகள்", "dashboard": "டேஷ்போர்டு", "logout": "வெளியேறு", "sign_in": "உள்நுழை",
      "home_title_main": "சட்ட நுண்ணறிவு, ", "home_title_highlight": "எளிமைப்படுத்தப்பட்டது.",
      "home_desc": "உங்கள் சட்ட ஆவணங்களைப் பதிவேற்றுங்கள், AI அபாயங்களை உடனே கண்டறியும்.",
      "home_btn": "இப்போதே தொடங்குங்கள்",
      "auth_title": "ஒப்பந்தங்களில் கையெழுத்திடும் முன் அவற்றைப் புரிந்து கொள்ளுங்கள்.",
      "auth_subtitle": "மீண்டும் வருக", "auth_desc": "உங்கள் டேஷ்போர்டை அணுக விவரங்களை உள்ளிடவும்.",
      "auth_feature_1": "AI-மூலம் அபாயங்களைக் கண்டறிதல்", "auth_feature_2": "உடனடி ஒப்பந்த சுருக்கம்", "auth_feature_3": "வங்கி-தரவு பாதுகாப்பு",
      "auth_quote": "LegalEase என்னை ஆபத்தான ஒப்பந்தத்திலிருந்து காப்பாற்றியது.", "auth_author": "தொழில்நுட்ப நிறுவனர்",
      "email_label": "மின்னஞ்சல் முகவரி", "password_label": "கடவுச்சொல்", "forgot_password": "கடவுச்சொல்லை மறந்தீர்களா?",
      "login_btn": "உள்நுழை", "no_account": "கணக்கு இல்லையா?", "create_account": "கணக்கை உருவாக்கவும்",
      "app_title": "ஸ்மார்ட் ஆவண சரிபார்ப்பு", "upload_desc": "உங்கள் ஒப்பந்தங்களை இங்கே பதிவேற்றவும்.",
      "select_doc_type": "ஆவண வகையைத் தேர்ந்தெடுக்கவும்", "placeholder_doc_type": "-- வகையைத் தேர்ந்தெடுக்கவும் --",
      "warn_select_type": "முதலில் ஆவண வகையைத் தேர்ந்தெடுக்கவும்", "drop_file": "இங்கே விடுங்கள்!",
      "upload_instruction": "பதிவேற்ற கிளிக் செய்யவும்", "supports_text": "PDF, JPG, PNG (10MB வரை)", "browse_files": "கோப்புகளைத் தேடு",
      "secure_processing": "ஆவணங்கள் ஆய்வு செய்யப்பட்ட பிறகு நீக்கப்படும்.", "analyzing_status": "AI ஆய்வு செய்கிறது...",
      "analyze_btn": "ஆய்வு செய்", "cancel_btn": "ரத்துசெய்",
      "dash_welcome": "உங்கள் டேஷ்போர்டிற்கு வரவேற்கிறோம்", "dash_desc": "சமீபத்திய பகுப்பாய்வுகளின் கண்ணோட்டம்.",
      "analyze_new": "புதிய பகுப்பாய்வு", "total_analyzed": "மொத்த பகுப்பாய்வு", "risks_detected": "அபாயங்கள்",
      "hours_saved": "சேமிக்கப்பட்ட நேரம்", "recent_docs": "சமீபத்திய ஆவணங்கள்", "doc_name": "ஆவணப் பெயர்",
      "type": "வகை", "safety_score": "மதிப்பெண்", "view_report": "அறிக்கையைப் பார்", "no_docs": "ஆவணங்கள் எதுவும் இல்லை.", "latest_tag": "சமீபத்திய நடவடிக்கை", "action": "நடவடிக்கை"
    }
  },
  te: {
    translation: {
      "home": "హోమ్", "checker": "చెకర్", "policies": "విధానాలు", "dashboard": "డాష్‌బోర్డ్", "logout": "లాగ్ అవుట్", "sign_in": "సైన్ ఇన్",
      "home_title_main": "చట్టపరమైన మేధస్సు, ", "home_title_highlight": "సరళీకృతం.",
      "home_desc": "మీ చట్టపరమైన పత్రాలను అప్‌లోడ్ చేయండి మరియు AI నష్టాలను గుర్తించనివ్వండి.",
      "home_btn": "ఇప్పుడే ప్రారంభించండి",
      "auth_title": "మీరు సంతకం చేసే ముందు ఒప్పందాలను అర్థం చేసుకోండి.",
      "auth_subtitle": "మళ్ళీ స్వాగతం", "auth_desc": "డాష్‌బోర్డ్‌ను యాక్సెస్ చేయడానికి వివరాలను నమోదు చేయండి.",
      "auth_feature_1": "AI-ఆధారిత రిస్క్ గుర్తింపు", "auth_feature_2": "తక్షణ క్లాజ్ సారాంశం", "auth_feature_3": "బ్యాంక్-గ్రేడ్ డేటా భద్రత",
      "auth_quote": "LegalEase నన్ను ప్రమాదకరమైన ఒప్పందం నుండి కాపాడింది.", "auth_author": "టెక్ ఫౌండర్",
      "email_label": "ఈమెయిల్ చిరునామా", "password_label": "పాస్‌వర్డ్", "forgot_password": "పాస్‌వర్డ్ మర్చిపోయారా?",
      "login_btn": "సైన్ ఇన్", "no_account": "ఖాతా లేదా?", "create_account": "ఖాతా సృష్టించండి",
      "app_title": "స్మార్ట్ డాక్యుమెంట్ చెకర్", "upload_desc": "మీ అగ్రిమెంట్‌లను ఇక్కడ అప్‌లోడ్ చేయండి.",
      "select_doc_type": "పత్రం రకాన్ని ఎంచుకోండి", "placeholder_doc_type": "-- రకాన్ని ఎంచుకోండి --",
      "warn_select_type": "ముందుగా రకాన్ని ఎంచుకోండి", "drop_file": "ఇక్కడ వదలండి!",
      "upload_instruction": "డ్రాగ్ లేదా క్లిక్ చేయండి", "supports_text": "PDF, JPG, PNG (గరిష్టంగా 10MB)", "browse_files": "ఫైల్‌లను వెతకండి",
      "secure_processing": "పత్రాలు సురక్షితంగా విశ్లేషించబడతాయి.", "analyzing_status": "AI విశ్లేషిస్తోంది...",
      "analyze_btn": "విశ్లేషించు", "cancel_btn": "రద్దు చేయి",
      "dash_welcome": "మీ డాష్‌బోర్డ్‌కు స్వాగతం", "dash_desc": "ఇటీవలి విశ్లేషణల అవలోకనం.",
      "analyze_new": "కొత్త విశ్లేషణ", "total_analyzed": "మొత్తం విశ్లేషణ", "risks_detected": "నష్టాలు",
      "hours_saved": "ఆదా చేసిన సమయం", "recent_docs": "ఇటీవలి పత్రాలు", "doc_name": "పత్రం పేరు",
      "type": "రకం", "safety_score": "స్కోరు", "view_report": "నివేదిక చూడండి", "no_docs": "పత్రాలు ఏవీ లేవు.", "latest_tag": "తాజా యాక్టివిటీ", "action": "చర్య"
    }
  },
  mr: {
    translation: {
      "home": "मुख्यपृष्ठ", "checker": "तपासक", "policies": "धोरणे", "dashboard": "डॅशबोर्ड", "logout": "साइन आउट", "sign_in": "साइन इन",
      "home_title_main": "कायदेशीर बुद्धिमत्ता, ", "home_title_highlight": "सोपी केली.",
      "home_desc": "तुमची कागदपत्रे अपलोड करा आणि AI ला धोके शोधू द्या.",
      "home_btn": "आत्ताच विश्लेषण सुरू करा",
      "auth_title": "स्वाक्षरी करण्यापूर्वी तुमचे करार समजून घ्या.",
      "auth_subtitle": "पुन्हा स्वागत आहे", "auth_desc": "डॅशबोर्डवर जाण्यासाठी तुमची माहिती प्रविष्ट करा.",
      "auth_feature_1": "AI-आधारित जोखीम ओळख", "auth_feature_2": "झटपट क्लॉज सारांश", "auth_feature_3": "बँक-ग्रेड डेटा सुरक्षा",
      "auth_quote": "LegalEase मुळे मी धोकादायक करारातून वाचलो.", "auth_author": "टेक संस्थापक",
      "email_label": "ईमेल पत्ता", "password_label": "पासवर्ड", "forgot_password": "पासवर्ड विसरलात?",
      "login_btn": "साइन इन", "no_account": "खाते नाही?", "create_account": "खाते तयार करा",
      "app_title": "स्मार्ट दस्तऐवज तपासक", "upload_desc": "कागदपत्रे येथे अपलोड करा.",
      "select_doc_type": "दस्तऐवज प्रकार निवडा", "placeholder_doc_type": "-- प्रकार निवडा --",
      "warn_select_type": "आधी प्रकार निवडा", "drop_file": "इथे टाका!",
      "upload_instruction": "ड्रॅग किंवा क्लिक करा", "supports_text": "PDF, JPG, PNG (10MB पर्यंत)", "browse_files": "फायली शोधा",
      "secure_processing": "दस्तऐवज सुरक्षितपणे तपासले जातात.", "analyzing_status": "AI विश्लेषण करत आहे...",
      "analyze_btn": "विश्लेषण करा", "cancel_btn": "रद्द करा",
      "dash_welcome": "तुमच्या डॅशबोर्डवर स्वागत आहे", "dash_desc": "अलीकडील विश्लेषणाचे विहंगावलोकन.",
      "analyze_new": "नवीन विश्लेषण", "total_analyzed": "एकूण विश्लेषण", "risks_detected": "धोके",
      "hours_saved": "वाचवलेले तास", "recent_docs": "अलीकडील दस्तऐवज", "doc_name": "दस्तऐवजाचे नाव",
      "type": "प्रकार", "safety_score": "स्कोर", "view_report": "अहवाल पहा", "no_docs": "दस्तऐवज आढळले नाहीत.", "latest_tag": "अलीकडील क्रियाकलाप", "action": "कृती"
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