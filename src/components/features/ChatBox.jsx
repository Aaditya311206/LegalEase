import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I have analyzed your document. Ask me anything about the risks, missing clauses, or legal terms!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // 1. Add user's message to the chat
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // 2. Simulate AI thinking and replying (will connect to OpenAI later)
    setTimeout(() => {
      setIsTyping(false);
      setMessages([...newMessages, { 
        sender: 'ai', 
        text: "Based on the document you uploaded, standard rental rules in Tamil Nadu cap the security deposit at a maximum of a few months' rent. The 6-month demand here is unusually high. You should negotiate this down." 
      }]);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[500px] overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center gap-3">
        <Bot className="w-6 h-6 text-primary-light" />
        <div>
          <h3 className="font-bold">LegalEase AI Assistant</h3>
          <p className="text-xs text-gray-400">Context-aware document chat</p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-500 p-3 rounded-lg rounded-tl-none shadow-sm text-sm flex gap-1 items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your agreement..." 
          className="flex-1 px-4 py-2 bg-gray-100 border-transparent focus:bg-white border focus:border-primary focus:ring-0 rounded-lg outline-none text-sm transition-all"
        />
        <button 
          type="submit" 
          disabled={!input.trim()}
          className="bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white p-2 rounded-lg transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}