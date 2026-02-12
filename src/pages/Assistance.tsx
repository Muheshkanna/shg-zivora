import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { VoiceButton } from "@/components/LanguageAndVoice";
import { aiBusinessTips, aiPricingAdvice, aiSavingsTips } from "@/data/mockData";
import { ArrowLeft, Send, Lightbulb, IndianRupee, PiggyBank } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const getAiResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost")) {
    return aiPricingAdvice[Math.floor(Math.random() * aiPricingAdvice.length)];
  }
  if (lower.includes("save") || lower.includes("saving") || lower.includes("budget")) {
    return aiSavingsTips[Math.floor(Math.random() * aiSavingsTips.length)];
  }
  if (lower.includes("business") || lower.includes("grow") || lower.includes("improve")) {
    return aiBusinessTips[Math.floor(Math.random() * aiBusinessTips.length)];
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("help")) {
    return "Hello! I'm your business assistant. Ask me about pricing, savings tips, or business improvement ideas!";
  }
  return aiBusinessTips[Math.floor(Math.random() * aiBusinessTips.length)];
};

const Assistance = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! I'm your Rural Smart Business Assistant. Ask me about business tips, pricing advice, or savings strategies! 🌾", sender: "ai", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg: Message = { id: Date.now().toString(), text: msg, sender: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: getAiResponse(msg), sender: "ai", timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const quickActions = [
    { icon: Lightbulb, label: t("business_tips"), query: "Give me a business improvement tip" },
    { icon: IndianRupee, label: t("pricing_advice"), query: "Help me with pricing" },
    { icon: PiggyBank, label: t("savings_tips"), query: "How can I save more?" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-card/80 backdrop-blur px-4 py-3">
        <button onClick={() => navigate("/dashboard")} className="rounded-lg p-2 hover:bg-muted"><ArrowLeft size={20} /></button>
        <h1 className="font-heading text-lg font-bold text-foreground">{t("assistance")}</h1>
      </header>

      {/* Quick actions */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        {quickActions.map(({ icon: Icon, label, query }) => (
          <button key={label} onClick={() => sendMessage(query)}
            className="flex flex-shrink-0 items-center gap-2 rounded-xl border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">
            <Icon size={16} className="text-primary" /> {label}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              msg.sender === "user"
                ? "gradient-hero text-primary-foreground rounded-br-md"
                : "bg-card border text-foreground rounded-bl-md"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t bg-card p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <VoiceButton onResult={(text) => sendMessage(text)} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={t("ask_question")}
            className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <button onClick={() => sendMessage()} className="rounded-xl bg-primary p-3 text-primary-foreground hover:opacity-90">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistance;
