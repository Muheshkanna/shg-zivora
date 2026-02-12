import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageAndVoice";
import { Sprout, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: t("required_field"), variant: "destructive" });
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate("/dashboard");
    } else {
      toast({ title: "Invalid credentials. Try: lakshmi@example.com / password123", variant: "destructive" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Sprout className="mb-3 h-12 w-12 text-primary" />
          <h1 className="font-heading text-2xl font-bold text-foreground">{t("login")}</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">{t("email_or_phone")}</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
              placeholder="lakshmi@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">{t("password")}</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border bg-background px-4 py-2.5 pr-10 text-foreground outline-none focus:ring-2 focus:ring-ring"
                placeholder="password123"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl gradient-hero py-3 font-semibold text-primary-foreground shadow transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "..." : t("login")}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            {t("dont_have_account")}{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">{t("signup")}</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
