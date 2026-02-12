import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageAndVoice";
import { useNavigate } from "react-router-dom";
import { mockTransactions } from "@/data/mockData";
import {
  Sprout, TrendingUp, GraduationCap, ShoppingBag, HeadphonesIcon,
  Wallet, ArrowUpRight, ArrowDownRight, LogOut,
} from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const totalIncome = mockTransactions.filter((tx) => tx.type === "income").reduce((s, tx) => s + tx.amount, 0);
  const totalExpense = mockTransactions.filter((tx) => tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);
  const balance = totalIncome - totalExpense;

  const modules = [
    { key: "finance", icon: TrendingUp, color: "bg-success text-success-foreground", path: "/finance" },
    { key: "training", icon: GraduationCap, color: "bg-info text-info-foreground", path: "/training" },
    { key: "marketplace", icon: ShoppingBag, color: "bg-secondary text-secondary-foreground", path: "/marketplace" },
    { key: "assistance", icon: HeadphonesIcon, color: "bg-accent text-accent-foreground", path: "/assistance" },
  ];

  const stats = [
    { label: t("total_balance"), value: `₹${balance.toLocaleString("en-IN")}`, icon: Wallet, color: "text-primary" },
    { label: t("total_income"), value: `₹${totalIncome.toLocaleString("en-IN")}`, icon: ArrowUpRight, color: "text-success" },
    { label: t("total_expense"), value: `₹${totalExpense.toLocaleString("en-IN")}`, icon: ArrowDownRight, color: "text-destructive" },
    { label: t("savings"), value: `₹${(balance * 0.2).toLocaleString("en-IN")}`, icon: TrendingUp, color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-card/80 backdrop-blur px-4 py-3 md:px-8">
        <div className="flex items-center gap-2">
          <Sprout className="h-7 w-7 text-primary" />
          <span className="font-heading text-lg font-bold text-foreground">RuralSmart</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button onClick={() => { logout(); navigate("/"); }} className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut size={16} /> {t("logout")}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* Welcome */}
        <div className="mb-6 animate-fade-in">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {t("welcome_back")}, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground">{t("balance_overview")}</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }, i) => (
            <div key={label} className="stat-card animate-fade-in border" style={{ animationDelay: `${i * 100}ms` }}>
              <Icon className={`mx-auto mb-2 h-6 w-6 ${color}`} />
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-heading text-lg font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">{t("quick_access")}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {modules.map(({ key, icon: Icon, color, path }, i) => (
            <button
              key={key}
              onClick={() => navigate(path)}
              className="module-card flex flex-col items-center gap-3 py-8 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`rounded-xl p-3 ${color}`}>
                <Icon className="h-8 w-8" />
              </div>
              <span className="font-heading text-sm font-semibold text-foreground">{t(key)}</span>
            </button>
          ))}
        </div>

        {/* Recent Transactions */}
        <h2 className="mb-3 mt-8 font-heading text-lg font-semibold text-foreground">{t("transaction_history")}</h2>
        <div className="rounded-xl border bg-card shadow-sm">
          {mockTransactions.slice(0, 5).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between border-b last:border-0 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
              </div>
              <span className={`font-heading text-sm font-bold ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
