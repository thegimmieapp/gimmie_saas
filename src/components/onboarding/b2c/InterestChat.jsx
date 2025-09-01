import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { InvokeLLM } from '@/api/integrations';

export default function InterestChat({ onInterestsDetected }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Gimmie AI 🎁 Let's discover your interests together! Tell me about yourself - what do you love doing in your free time? What makes you excited? Just chat naturally and I'll figure out your interests!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create conversation context
      const conversation = messages.concat(userMessage)
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');

      // Get AI response and extract interests
      const response = await InvokeLLM({
        prompt: `You are Gimmie AI, a friendly gift recommendation assistant. Continue this conversation naturally and ask follow-up questions to learn about the user's interests. After 2-3 exchanges, provide a JSON response with detected interests.

Conversation so far:
${conversation}

If you have enough information about the user's interests (after 2-3 exchanges), respond with this exact format:
{
  "interests": ["interest1", "interest2", "interest3"],
  "message": "Based on our chat, I can see you're interested in [interests]! These look great for your profile."
}

Otherwise, continue the conversation naturally by asking engaging follow-up questions about their hobbies, lifestyle, or preferences.`,
        response_json_schema: {
          type: "object",
          properties: {
            message: { type: "string" },
            interests: { 
              type: "array", 
              items: { type: "string" },
              description: "Only include if ready to conclude the conversation"
            }
          },
          required: ["message"]
        }
      });

      const aiMessage = { role: 'assistant', content: response.message };
      setMessages(prev => [...prev, aiMessage]);

      // If interests were detected, pass them up
      if (response.interests && response.interests.length > 0) {
        onInterestsDetected(response.interests);
      }

    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble right now. Let's try the manual selection instead!" 
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-[--gimmie-green] text-white'
                  : 'bg-[--gimmie-carolina] text-white'
              }`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-[--gimmie-green] text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[--gimmie-carolina] text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 px-4 py-2 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me about your hobbies and interests..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!input.trim() || isLoading}
              className="bg-[--gimmie-green] hover:bg-[--gimmie-green]/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}