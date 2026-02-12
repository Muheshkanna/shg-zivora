import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  mockProducts, type Product,
  calculateRetailPrice, calculateB2BPrice, calculateSeasonalPrice,
  suggestNearbyShops,
} from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Sparkles, MapPin, Package } from "lucide-react";

const Marketplace = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", category: "", costPrice: "", materialUsed: "", quantity: "" });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const costNum = Number(form.costPrice) || 0;
  const suggestedRetail = calculateSeasonalPrice(calculateRetailPrice(costNum));
  const suggestedB2B = calculateSeasonalPrice(calculateB2BPrice(costNum));
  const nearbyShops = form.materialUsed ? suggestNearbyShops(form.materialUsed, user?.location || "") : [];

  const addProduct = () => {
    if (!form.name || !form.costPrice || !form.materialUsed) {
      toast({ title: t("required_field"), variant: "destructive" });
      return;
    }
    const product: Product = {
      id: String(products.length + 1),
      name: form.name,
      description: form.description,
      category: form.category,
      costPrice: costNum,
      materialUsed: form.materialUsed,
      quantity: Number(form.quantity) || 0,
      retailPrice: suggestedRetail,
      b2bPrice: suggestedB2B,
    };
    setProducts([product, ...products]);
    setShowForm(false);
    setForm({ name: "", description: "", category: "", costPrice: "", materialUsed: "", quantity: "" });
    toast({ title: "Product added! 🎉" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-card/80 backdrop-blur px-4 py-3">
        <button onClick={() => navigate("/dashboard")} className="rounded-lg p-2 hover:bg-muted"><ArrowLeft size={20} /></button>
        <h1 className="font-heading text-lg font-bold text-foreground">{t("marketplace")}</h1>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground shadow">
          <Plus size={18} /> {t("add_product")}
        </button>

        {/* Add Product Form */}
        {showForm && (
          <div className="rounded-xl border bg-card p-5 space-y-4 animate-fade-in">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">{t("product_name")}</label>
                <input value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">{t("category")}</label>
                <input value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">{t("cost_price")} (₹)</label>
                <input type="number" value={form.costPrice} onChange={(e) => set("costPrice", e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">{t("material_used")}</label>
                <input value={form.materialUsed} onChange={(e) => set("materialUsed", e.target.value)} placeholder="cotton, wood, silk..." className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">{t("quantity")}</label>
                <input type="number" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">{t("description")}</label>
                <input value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            {/* AI Price Suggestions */}
            {costNum > 0 && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-primary">{t("ai_suggestion")}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">{t("retail_price")}</p>
                    <p className="font-heading text-lg font-bold text-foreground">₹{suggestedRetail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t("b2b_price")}</p>
                    <p className="font-heading text-lg font-bold text-foreground">₹{suggestedB2B}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Retail: cost +30% | B2B: cost +15% | Seasonal boost applied if festive month
                </p>
              </div>
            )}

            {/* Nearby Shops */}
            {nearbyShops.length > 0 && (
              <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-secondary" />
                  <span className="text-sm font-semibold text-secondary">{t("nearby_shops")}</span>
                </div>
                <div className="space-y-2">
                  {nearbyShops.slice(0, 3).map((shop) => (
                    <div key={shop.shopName} className="flex items-center justify-between rounded-lg bg-card p-2 text-sm">
                      <div>
                        <p className="font-medium text-foreground">{shop.shopName}</p>
                        <p className="text-xs text-muted-foreground">{shop.location} · {shop.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={addProduct} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">{t("submit")}</button>
              <button onClick={() => setShowForm(false)} className="rounded-lg border px-6 py-2 text-sm text-muted-foreground">{t("cancel")}</button>
            </div>
          </div>
        )}

        {/* Product List */}
        <h2 className="font-heading text-lg font-semibold text-foreground">{t("my_products")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((p, i) => (
            <div key={p.id} className="module-card animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                  <Package size={24} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.category} · Qty: {p.quantity}</p>
                </div>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">{p.description}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-muted p-2">
                  <p className="text-[10px] text-muted-foreground">Cost</p>
                  <p className="text-sm font-bold text-foreground">₹{p.costPrice}</p>
                </div>
                <div className="rounded-lg bg-success/10 p-2">
                  <p className="text-[10px] text-muted-foreground">Retail</p>
                  <p className="text-sm font-bold text-success">₹{p.retailPrice}</p>
                </div>
                <div className="rounded-lg bg-info/10 p-2">
                  <p className="text-[10px] text-muted-foreground">B2B</p>
                  <p className="text-sm font-bold text-info">₹{p.b2bPrice}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Material: {p.materialUsed}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
