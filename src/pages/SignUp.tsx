import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageAndVoice";
import { verifyAadhaar } from "@/data/mockData";
import { Sprout, MapPin, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const { t } = useLanguage();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", aadhaar: "", password: "", confirmPassword: "", location: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Geolocation not supported", variant: "destructive" });
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state || "Unknown";
          set("location", city);
        } catch {
          set("location", `${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`);
        }
        setDetecting(false);
      },
      () => { setDetecting(false); toast({ title: "Could not detect location", variant: "destructive" }); }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.aadhaar || !form.password || !form.location) {
      toast({ title: t("required_field"), variant: "destructive" });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast({ title: t("passwords_mismatch"), variant: "destructive" });
      return;
    }
    const aadhaarResult = verifyAadhaar(form.aadhaar);
    if (!aadhaarResult.valid) {
      toast({ title: t("aadhaar_invalid"), variant: "destructive" });
      return;
    }

    setLoading(true);
    const result = await signup({ name: form.name, email: form.email, phone: form.phone, aadhaar: form.aadhaar, password: form.password, location: form.location });
    setLoading(false);
    if (result.success) {
      toast({ title: "Account created! Welcome 🎉" });
      navigate("/dashboard");
    } else {
      toast({ title: result.message, variant: "destructive" });
    }
  };

  const fields: Array<{ key: string; label: string; type: string; placeholder: string }> = [
    { key: "name", label: t("full_name"), type: "text", placeholder: "Lakshmi Devi" },
    { key: "email", label: t("email"), type: "email", placeholder: "lakshmi@example.com" },
    { key: "phone", label: t("phone"), type: "tel", placeholder: "9876543210" },
    { key: "aadhaar", label: t("aadhaar"), type: "text", placeholder: "123456789012" },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <Sprout className="mb-3 h-12 w-12 text-primary" />
          <h1 className="font-heading text-2xl font-bold text-foreground">{t("signup")}</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border bg-card p-6 shadow-sm">
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
              <input
                type={type}
                value={(form as any)[key]}
                onChange={(e) => set(key, e.target.value)}
                className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
                placeholder={placeholder}
                maxLength={key === "aadhaar" ? 12 : undefined}
              />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">{t("password")}</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                className="w-full rounded-lg border bg-background px-4 py-2.5 pr-10 text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">{t("confirm_password")}</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)}
              className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">{t("location")}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
                placeholder="Chennai"
              />
              <button
                type="button"
                onClick={detectLocation}
                disabled={detecting}
                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
              >
                <MapPin size={16} />
                {detecting ? "..." : t("detect_location")}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl gradient-hero py-3 font-semibold text-primary-foreground shadow transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "..." : t("create_account")}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            {t("already_have_account")}{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">{t("login")}</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
