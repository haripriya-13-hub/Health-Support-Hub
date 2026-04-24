import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: string;
  role: "bot" | "user";
  content: string;
  timestamp: number;
};

const SUGGESTED_QUESTIONS = [
  "How do I sign up?",
  "Is training required?",
  "What's the minimum age?",
  "Can I volunteer remotely?",
];

const FAQ_KNOWLEDGE_BASE: Record<string, string> = {
  "sign up": "Signing up is easy! Just fill out the Volunteer Registration form above on this page. Our team will review it and get back to you within 2 business days.",
  "volunteer": "We'd love to have you volunteer! Please fill out the registration form above to get started.",
  "qualifications": "No medical qualifications are needed for our community volunteer roles! We provide basic orientation for all volunteers. For roles involving transportation, a valid driver's license is required.",
  "training": "Yes, we provide a 1-hour virtual orientation for all new volunteers, plus specific guidelines for your chosen roles (like food safety for meal delivery).",
  "time": "We are very flexible! You can volunteer for as little as 2 hours a month, or up to several days a week. You set your own schedule.",
  "commit": "There is no strict minimum commitment, though we encourage volunteers to try to help out at least once a month to stay engaged with the community.",
  "age": "Volunteers must be at least 18 years old. Those aged 16-17 can volunteer for event support roles with parental consent.",
  "background": "Yes, for the safety of our vulnerable community members, roles that involve entering homes or providing transportation require a standard background check, which we pay for.",
  "remote": "Yes! While many roles are in-person, our Wellness Check-ins can be done completely over the phone from your own home.",
  "contact": "You can reach our volunteer coordination team at hello@careconnect-example.org or call us at (555) 123-4567 during business hours.",
  "help": "We provide non-medical community support: meal delivery, transportation to appointments, friendly check-ins, and help running local health events.",
};

function getBotResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const [keyword, response] of Object.entries(FAQ_KNOWLEDGE_BASE)) {
    if (lowerInput.includes(keyword)) {
      return response;
    }
  }
  
  return "I'm not exactly sure about that. Our team would be happy to help though — you can reach us at hello@careconnect-example.org or try one of the suggested questions!";
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chat history
  useEffect(() => {
    const saved = localStorage.getItem("careconnect_chat");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    } else {
      // Initial greeting
      setMessages([
        {
          id: "welcome",
          role: "bot",
          content: "Hi there! I'm the CareConnect assistant. I can answer quick questions about volunteering. How can I help today?",
          timestamp: Date.now(),
        }
      ]);
    }
  }, []);

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("careconnect_chat", JSON.stringify(messages));
    }
    
    // Auto-scroll to bottom
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const responseText = getBotResponse(text);
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const clearChat = () => {
    const welcome: Message = {
      id: Date.now().toString(),
      role: "bot",
      content: "Chat cleared! How can I help you today?",
      timestamp: Date.now(),
    };
    setMessages([welcome]);
    localStorage.removeItem("careconnect_chat");
  };

  return (
    <section className="py-20 md:py-32" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Have questions?</h2>
            <p className="text-muted-foreground">
              Our automated assistant can answer common questions about volunteering instantly.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden flex flex-col h-[600px] max-h-[70vh]">
            {/* Header */}
            <div className="bg-primary/5 px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Support Assistant</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={clearChat} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                      }`}>
                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-2xl px-5 py-3 ${
                        msg.role === "user" 
                          ? "bg-primary text-primary-foreground rounded-tr-sm" 
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 bg-background border-t">
              <div className="flex flex-wrap gap-2 mb-4 px-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1.5 px-3 font-normal"
                    onClick={() => handleSend(q)}
                  >
                    <HelpCircle className="w-3 h-3 mr-1.5 opacity-70" />
                    {q}
                  </Badge>
                ))}
              </div>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <Input 
                  placeholder="Ask a question..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="rounded-full h-12 px-6 bg-muted/50 border-transparent focus-visible:border-primary focus-visible:ring-primary/20"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!inputValue.trim() || isTyping}
                  className="h-12 w-12 rounded-full shrink-0 shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
