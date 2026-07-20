'use client';

import { useState, useRef, useEffect } from 'react';
import { chatbotResponses, quickReplies } from '@/data/siteData';
import type { ChatMessage } from '@/types';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: 'أهلاً بك في مركز حضرموت الحديث للكهربائيات! 👋 كيف يمكنني مساعدتك اليوم؟',
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: quickReplies,
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Find best matching response
    setTimeout(() => {
      let response = chatbotResponses['default'];
      const lowerText = text.trim().toLowerCase();

      for (const key of Object.keys(chatbotResponses)) {
        if (key !== 'default' && lowerText.includes(key)) {
          response = chatbotResponses[key];
          break;
        }
      }

      // Check for greetings
      if (['مرحبا', 'مرحبًا', 'اهلا', 'أهلا', 'هلا', 'سلام', 'السلام'].some(g => lowerText.includes(g))) {
        response = 'أهلاً وسهلاً بك! 😊 يسعدنا تواصلك مع مركز حضرموت الحديث للكهربائيات. كيف يمكنني مساعدتك؟ يمكنك السؤال عن المنتجات، الخدمات، الأسعار، أو أي شيء آخر!';
      }

      // Check for thanks
      if (['شكر', 'شكرا', 'شكراً', 'ممتاز', 'جزاك'].some(g => lowerText.includes(g))) {
        response = 'شكراً لك! 🙏 يسعدنا خدمتك. لا تتردد في السؤال إذا احتجت أي مساعدة أخرى. نتمنى لك يوماً سعيداً! 😊';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: quickReplies,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className="chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="المساعد الآلي"
        id="chatbot-trigger"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-header-avatar">🤖</div>
            <div>
              <div className="chatbot-header-name">المساعد الآلي</div>
              <div className="chatbot-header-status">متصل الآن</div>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="chatbot-quick-replies">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              className="quick-reply-btn"
              onClick={() => sendMessage(reply)}
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="chatbot-input-area">
          <input
            type="text"
            className="chatbot-input"
            placeholder="اكتب رسالتك..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            id="chatbot-input"
          />
          <button
            className="chatbot-send"
            onClick={() => sendMessage(input)}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
