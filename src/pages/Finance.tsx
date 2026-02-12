import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { mockTransactions, monthlyData, type Transaction } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, ArrowUpRight, ArrowDownRight, Send, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Finance = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpi, setShowUpi] = useState<"send" | "receive" | null>(null);
  const [newTx, setNewTx] = useState({ type: "income" as "income" | "expense", amount: "", category: "", description: "" });
  const [upiId, setUpiId] = useState("");
  const [upiAmount, setUpiAmount] = useState("");

  const totalIncome = transactions.filter((tx) => tx.type === "income").reduce((s, tx) => s + tx.amount, 0);
  const totalExpense = transactions.filter((tx) => tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);

  const filtered = filter === "all" ? transactions : transactions.filter((tx) => tx.type === filter);

  const addTransaction = () => {
    if (!newTx.amount || !newTx.category) { toast({ title: t("required_field"), variant: "destructive" }); return; }
    const tx: Transaction = {
      id: String(transactions.length + 1),
      type: newTx.type,
      amount: Number(newTx.amount),
      category: newTx.category,
      description: newTx.description,
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([tx, ...transactions]);
    setShowAddForm(false);
    setNewTx({ type: "income", amount: "", category: "", description: "" });
    toast({ title: `${tx.type === "income" ? "Income" : "Expense"} added ✅` });
  };

  const handleUpi = () => {
    if (!upiId || !upiAmount) { toast({ title: t("required_field"), variant: "destructive" }); return; }
    toast({ title: `UPI ${showUpi === "send" ? "sent" : "received"}: ₹${upiAmount} ${showUpi === "send" ? "to" : "from"} ${upiId} ✅` });
    setShowUpi(null);
    setUpiId("");
    setUpiAmount("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-card/80 backdrop-blur px-4 py-3">
        <button onClick={() => navigate("/dashboard")} className="rounded-lg p-2 hover:bg-muted"><ArrowLeft size={20} /></button>
        <h1 className="font-heading text-lg font-bold text-foreground">{t("finance")}</h1>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="stat-card border">
            <p className="text-xs text-muted-foreground">{t("total_balance")}</p>
            <p className="font-heading text-lg font-bold text-primary">₹{(totalIncome - totalExpense).toLocaleString("en-IN")}</p>
          </div>
          <div className="stat-card border">
            <p className="text-xs text-muted-foreground">{t("total_income")}</p>
            <p className="font-heading text-lg font-bold text-success">₹{totalIncome.toLocaleString("en-IN")}</p>
          </div>
          <div className="stat-card border">
            <p className="text-xs text-muted-foreground">{t("total_expense")}</p>
            <p className="font-heading text-lg font-bold text-destructive">₹{totalExpense.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowAddForm(true)} className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><Plus size={16} /> {t("add_income")}/{t("add_expense")}</button>
          <button onClick={() => setShowUpi("send")} className="flex items-center gap-1 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"><Send size={16} /> {t("send_upi")}</button>
          <button onClick={() => setShowUpi("receive")} className="flex items-center gap-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"><Download size={16} /> {t("receive_upi")}</button>
        </div>

        {/* Add Transaction Form */}
        {showAddForm && (
          <div className="rounded-xl border bg-card p-4 space-y-3 animate-fade-in">
            <div className="flex gap-2">
              {(["income", "expense"] as const).map((type) => (
                <button key={type} onClick={() => setNewTx((p) => ({ ...p, type }))}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${newTx.type === type ? (type === "income" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground") : "bg-muted text-muted-foreground"}`}>
                  {t(type)}
                </button>
              ))}
            </div>
            <input type="number" placeholder={t("amount")} value={newTx.amount} onChange={(e) => setNewTx((p) => ({ ...p, amount: e.target.value }))} className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring" />
            <input placeholder={t("category")} value={newTx.category} onChange={(e) => setNewTx((p) => ({ ...p, category: e.target.value }))} className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring" />
            <input placeholder={t("description")} value={newTx.description} onChange={(e) => setNewTx((p) => ({ ...p, description: e.target.value }))} className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring" />
            <div className="flex gap-2">
              <button onClick={addTransaction} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">{t("submit")}</button>
              <button onClick={() => setShowAddForm(false)} className="rounded-lg border px-6 py-2 text-sm text-muted-foreground">{t("cancel")}</button>
            </div>
          </div>
        )}

        {/* UPI Modal */}
        {showUpi && (
          <div className="rounded-xl border bg-card p-4 space-y-3 animate-fade-in">
            <h3 className="font-heading font-semibold text-foreground">{showUpi === "send" ? t("send_upi") : t("receive_upi")}</h3>
            <input placeholder="UPI ID (e.g. name@upi)" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring" />
            <input type="number" placeholder={t("amount")} value={upiAmount} onChange={(e) => setUpiAmount(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring" />
            <div className="flex gap-2">
              <button onClick={handleUpi} className="rounded-lg gradient-warm px-6 py-2 text-sm font-medium text-secondary-foreground">{t("submit")}</button>
              <button onClick={() => setShowUpi(null)} className="rounded-lg border px-6 py-2 text-sm text-muted-foreground">{t("cancel")}</button>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-3 font-heading text-sm font-semibold text-foreground">{t("monthly_analytics")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="hsl(142, 50%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Filter + List */}
        <div>
          <div className="mb-3 flex gap-2">
            {(["all", "income", "expense"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {t(f)}
              </button>
            ))}
          </div>
          <div className="rounded-xl border bg-card shadow-sm">
            {filtered.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between border-b last:border-0 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${tx.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                    {tx.type === "income" ? <ArrowUpRight size={16} className="text-success" /> : <ArrowDownRight size={16} className="text-destructive" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
                  </div>
                </div>
                <span className={`font-heading text-sm font-bold ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Finance;
