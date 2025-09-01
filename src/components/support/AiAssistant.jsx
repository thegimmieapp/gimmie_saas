import React, { useState, useEffect, useRef } from "react";
import { agentSDK } from "@/agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Sparkles, Loader2 } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AiAssistant() {
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const scrollAreaRef = useRef(null);

    useEffect(() => {
        const initializeConversation = async () => {
            setIsLoading(true);
            try {
                // Check for existing conversations first, or create new
                const conv = await agentSDK.createConversation({
                    agent_name: "SupportAgent",
                    metadata: { name: "Support Chat" }
                });
                setConversation(conv);
                setMessages(conv.messages || []);
            } catch (error) {
                console.error("Failed to initialize conversation", error);
            }
            setIsLoading(false);
        };
        initializeConversation();
    }, []);

    useEffect(() => {
        if (!conversation) return;

        const unsubscribe = agentSDK.subscribeToConversation(conversation.id, (data) => {
            setMessages(data.messages);
            if (scrollAreaRef.current) {
                setTimeout(() => {
                    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
                    if (viewport) {
                        viewport.scrollTop = viewport.scrollHeight;
                    }
                }, 100);
            }
        });

        return () => unsubscribe();
    }, [conversation]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || !conversation) return;

        const messageContent = input;
        setInput("");

        await agentSDK.addMessage(conversation, {
            role: "user",
            content: messageContent,
        });
    };

    return (
        <Card className="h-[70vh] flex flex-col bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
            <CardContent className="p-0 flex-1 flex flex-col">
                <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <MessageBubble key={index} message={message} />
                            ))
                        )}
                    </div>
                </ScrollArea>
                <div className="border-t p-4 bg-white/50">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your account, analytics, or how to improve conversions..."
                            className="flex-1"
                            disabled={!conversation || isLoading}
                        />
                        <Button type="submit" disabled={!input.trim() || !conversation}>
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}