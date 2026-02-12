import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageAndVoice";
import { useNavigate } from "react-router-dom";
import { Sprout, TrendingUp, GraduationCap, ShoppingBag, HeadphonesIcon } from "lucide-react";

const Landing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    { icon: TrendingUp, label: t("finance"), color: "text-success" },
    { icon: GraduationCap, label: t("training"), color: "text-info" },
    { icon: ShoppingBag, label: t("marketplace"), color: "text-secondary" },
    { icon: HeadphonesIcon, label: t("assistance"), color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:px-8">
        <div className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-primary" />
          <span className="font-heading text-xl font-bold text-foreground">RuralSmart</span>
        </div>
        <LanguageSelector />
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center px-4 pt-12 pb-20 text-center md:pt-20">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full gradient-hero">
          <Sprout className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl max-w-2xl">
          {t("landing_title")}
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          {t("landing_subtitle")}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/signup")}
            className="rounded-xl gradient-hero px-8 py-3.5 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            {t("get_started")}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="rounded-xl border-2 border-primary bg-transparent px-8 py-3.5 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            {t("login")}
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {features.map(({ icon: Icon, label, color }) => (
            <div key={label} className="module-card flex flex-col items-center gap-3 py-8">
              <Icon className={`h-10 w-10 ${color}`} />
              <span className="font-heading text-sm font-semibold text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;
