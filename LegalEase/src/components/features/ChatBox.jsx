import React, { useState, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // ✅ Engine hook import

export default function ChatBox({ docType, analysisData }) {
  const { t, i18n } = useTranslation(); // ✅ Initialized state parameters
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🔄 FIXED: Dynamically load and update greeting translation whenever the system language updates
  useEffect(() => {
    const activeLang = i18n.language.split('-')[0].toLowerCase();
    let greetingText = "";

    // Multi-Language Greeting fallbacks mapped natively
    if (activeLang === 'hi') {
      greetingText = docType 
        ? `नमस्ते! मैंने आपके ${docType} का विश्लेषण कर लिया है। मुझसे इसके जोखिमों, छूटे हुए खंडों या विशिष्ट शर्तों के बारे में कुछ भी पूछें!`
        : 'नमस्ते! मैंने आपके दस्तावेज़ का विश्लेषण कर लिया है। मुझसे जोखिमों, छूटे हुए खंडों या कानूनी शर्तों के बारे में कुछ भी पूछें!';
    } else if (activeLang === 'ta') {
      greetingText = docType
        ? `வணக்கம்! உங்கள் ${docType}-ஐ நான் பகுப்பாய்வு செய்துள்ளேன். இதில் உள்ள அபாயங்கள், விடுபட்ட பிரிவுகள் அல்லது விதிமுறைகளைப் பற்றி என்னிடம் எதையும் கேளுங்கள்!`
        : 'வணக்கம்! உங்கள் ஆவணத்தை நான் பகுப்பாய்வு செய்துள்ளேன். அபாயங்கள், விடுபட்ட பிரிவுகள் లేదా விதிமுறைகளைப் பற்றி என்னிடம் கேளுங்கள்!';
    } else if (activeLang === 'te') {
      greetingText = docType
        ? `నమస్తే! నేను మీ ${docType}-ని విశ్లేషించాను. ఇందులో ఉన్న లోపాలు, నష్టాలు లేదా నిబంధనల గురించి నన్ను ఏదైనా అడగండి!`
        : 'నమస్తే! నేను మీ ఒప్పందాన్ని విశ్లేషించాను. ఇందులో ఉన్న లోపాలు, నష్టాలు లేదా నిబంధనల గురించి నన్ను ఏదైనా అడగండి!';
    } else if (activeLang === 'mr') {
      greetingText = docType
        ? `नमस्कार! मी तुमच्या ${docType} चे विश्लेषण केले आहे. यातील कायदेशीर धोके किंवा अटींबद्दल मला काहीही विचारा!`
        : 'नमस्कार! मी तुमच्या दस्तऐवजाचे विश्लेषण केले आहे. कायदेशीर धोके किंवा अटींबद्दल मला काहीही विचारा!';
    } else {
      // English Fallback layout configuration tracker
      greetingText = docType 
        ? `Hi! I have analyzed your ${docType}. Ask me anything about the risks, missing clauses, or specific legal terms found inside!`
        : 'Hi! I have analyzed your document. Ask me anything about the risks, missing clauses, or legal terms!';
    }
    
    setMessages([{ sender: 'ai', text: greetingText }]);
  }, [docType, i18n.language]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    const currentMessages = [...messages, { sender: 'user', text: userMessage }];
    
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    try {
      // 🚀 SWAPPED ENDPOINT URL: Pointing securely to your live Render server endpoint instead of localhost
      const response = await fetch('https://legalease-zxbe.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          documentContext: analysisData || null,
          docType: docType || 'General Document',
          language: i18n.language // ✅ Sends current language state configuration parameter down to the chat engine prompt processor
        }),
      });

      if (!response.ok) {
        throw new Error('Network response returned error flags');
      }

      const data = await response.json();
      setMessages([...currentMessages, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Chat routing connection dropped:", error);
      
      // Fallback message handles localization rules dynamically on server connection drop
      const errMessage = t('connection_error', "Sorry, bro! I had trouble establishing a secure connection to the legal analysis server. Please make sure your backend server is up and running.");
      setMessages([
        ...currentMessages,
        { sender: 'ai', text: errMessage }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[450px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden text-left">
      
      {/* Chat Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center gap-3 shrink-0">
        <div className="bg-red-600/10 p-2 rounded-xl border border-red-500/20">
          <Bot className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className="font-bold text-sm tracking-tight">{t('app_title', 'Smart Document Checker')}</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t('latest_tag', 'Context-Aware Core')}</p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border shadow-sm ${
                msg.sender === 'user' ? 'bg-red-600 border-red-700 text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div className={`p-3 rounded-xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-red-600 text-white rounded-tr-none font-medium' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start items-center gap-2 text-slate-400 font-medium text-xs pl-1">
            <Loader2 className="w-4 h-4 animate-spin text-red-600" />
            <span>{t('analyzing_status', 'Scanning clauses and verifying compliance...')}</span>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2 shrink-0">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder={docType ? `${t('checker', 'Ask about your')} ${docType}...` : "Ask about your agreement..."} 
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-100 focus:bg-white focus:border-red-600 rounded-xl outline-none text-sm transition-all text-slate-900 placeholder-slate-400 disabled:opacity-50"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-slate-100 disabled:text-slate-400 text-white p-2.5 rounded-xl transition-all active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}