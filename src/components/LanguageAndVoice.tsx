import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Mic, MicOff } from "lucide-react";
import { useState } from "react";
import type { Language } from "@/data/translations";

const langLabels: Record<Language, string> = { en: "English", ta: "தமிழ்", hi: "हिन्दी" };

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-lg border bg-card p-1">
      {(Object.keys(langLabels) as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
            language === lang
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {langLabels[lang]}
        </button>
      ))}
    </div>
  );
};

export const VoiceButton = ({ onResult }: { onResult?: (text: string) => void }) => {
  const [listening, setListening] = useState(false);
  const { t } = useLanguage();

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;

    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult?.(text);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  return (
    <button
      onClick={toggleVoice}
      className={`rounded-full p-3 transition-all ${
        listening
          ? "bg-destructive text-destructive-foreground pulse-voice"
          : "bg-primary text-primary-foreground hover:opacity-90"
      }`}
      title={t("voice_help")}
    >
      {listening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
};
