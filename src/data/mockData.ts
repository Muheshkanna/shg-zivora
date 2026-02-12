export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  completed: boolean;
  progress: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  costPrice: number;
  materialUsed: string;
  quantity: number;
  retailPrice: number;
  b2bPrice: number;
  image?: string;
}

export interface RawMaterialShop {
  material: string;
  shopName: string;
  location: string;
  phone: string;
}

export const mockTransactions: Transaction[] = [
  { id: "1", type: "income", amount: 15000, category: "Sales", description: "Handloom saree sales", date: "2026-02-01" },
  { id: "2", type: "expense", amount: 3000, category: "Materials", description: "Cotton thread purchase", date: "2026-02-02" },
  { id: "3", type: "income", amount: 8000, category: "Sales", description: "Basket craft export", date: "2026-02-03" },
  { id: "4", type: "expense", amount: 1500, category: "Transport", description: "Delivery charges", date: "2026-02-04" },
  { id: "5", type: "income", amount: 12000, category: "Service", description: "Tailoring orders", date: "2026-02-05" },
  { id: "6", type: "expense", amount: 5000, category: "Materials", description: "Silk thread bulk buy", date: "2026-02-06" },
  { id: "7", type: "income", amount: 6500, category: "Sales", description: "Pottery items sold", date: "2026-02-07" },
  { id: "8", type: "expense", amount: 2000, category: "Utilities", description: "Workshop electricity", date: "2026-02-08" },
  { id: "9", type: "income", amount: 20000, category: "Wholesale", description: "Bulk order - bamboo crafts", date: "2026-02-09" },
  { id: "10", type: "expense", amount: 4500, category: "Materials", description: "Bamboo raw material", date: "2026-02-10" },
];

export const mockCourses: Course[] = [
  { id: "1", title: "Digital Marketing Basics", category: "Marketing", duration: "2h 30m", videoUrl: "#", thumbnail: "📱", completed: true, progress: 100 },
  { id: "2", title: "Financial Literacy for Rural Business", category: "Finance", duration: "1h 45m", videoUrl: "#", thumbnail: "💰", completed: false, progress: 65 },
  { id: "3", title: "Handloom Techniques - Advanced", category: "Skills", duration: "3h 00m", videoUrl: "#", thumbnail: "🧵", completed: false, progress: 30 },
  { id: "4", title: "E-commerce for Beginners", category: "Marketing", duration: "2h 00m", videoUrl: "#", thumbnail: "🛒", completed: false, progress: 0 },
  { id: "5", title: "Organic Farming Methods", category: "Agriculture", duration: "2h 15m", videoUrl: "#", thumbnail: "🌾", completed: true, progress: 100 },
  { id: "6", title: "Pottery & Ceramic Art", category: "Skills", duration: "1h 30m", videoUrl: "#", thumbnail: "🏺", completed: false, progress: 45 },
  { id: "7", title: "GST & Tax Basics", category: "Finance", duration: "1h 00m", videoUrl: "#", thumbnail: "📋", completed: false, progress: 10 },
  { id: "8", title: "Bamboo Craft Business", category: "Skills", duration: "2h 45m", videoUrl: "#", thumbnail: "🎋", completed: false, progress: 80 },
];

export const mockProducts: Product[] = [
  { id: "1", name: "Handloom Cotton Saree", description: "Traditional handwoven cotton saree", category: "Textiles", costPrice: 800, materialUsed: "cotton", quantity: 25, retailPrice: 1040, b2bPrice: 920 },
  { id: "2", name: "Bamboo Basket Set", description: "Eco-friendly bamboo basket set of 3", category: "Crafts", costPrice: 300, materialUsed: "bamboo", quantity: 50, retailPrice: 390, b2bPrice: 345 },
  { id: "3", name: "Terracotta Pot", description: "Hand-painted decorative pot", category: "Pottery", costPrice: 200, materialUsed: "clay", quantity: 100, retailPrice: 260, b2bPrice: 230 },
  { id: "4", name: "Wooden Toy Set", description: "Traditional wooden toy animals", category: "Toys", costPrice: 500, materialUsed: "wood", quantity: 30, retailPrice: 650, b2bPrice: 575 },
  { id: "5", name: "Silk Scarf", description: "Pure silk hand-dyed scarf", category: "Textiles", costPrice: 1200, materialUsed: "silk", quantity: 15, retailPrice: 1560, b2bPrice: 1380 },
];

export const rawMaterialShops: RawMaterialShop[] = [
  { material: "cotton", shopName: "ABC Textiles", location: "Chennai", phone: "044-2345678" },
  { material: "cotton", shopName: "Lakshmi Cotton Traders", location: "Coimbatore", phone: "0422-234567" },
  { material: "cotton", shopName: "Kapas Cotton Mill", location: "Ahmedabad", phone: "079-2345678" },
  { material: "wood", shopName: "Sri Wood Mart", location: "Madurai", phone: "0452-345678" },
  { material: "wood", shopName: "Rajesh Timber Works", location: "Mysore", phone: "0821-234567" },
  { material: "bamboo", shopName: "Green Bamboo Traders", location: "Assam", phone: "0361-234567" },
  { material: "bamboo", shopName: "Venu Bamboo Supplies", location: "Thrissur", phone: "0487-234567" },
  { material: "silk", shopName: "Kanchipuram Silk House", location: "Kanchipuram", phone: "044-8765432" },
  { material: "silk", shopName: "Mysore Silk Emporium", location: "Mysore", phone: "0821-876543" },
  { material: "clay", shopName: "Kumhar Clay Supplies", location: "Khurja", phone: "05738-23456" },
  { material: "clay", shopName: "Mitti Pottery Supplies", location: "Jaipur", phone: "0141-234567" },
  { material: "jute", shopName: "Bengal Jute Mills", location: "Kolkata", phone: "033-2345678" },
  { material: "leather", shopName: "Kanpur Leather Mart", location: "Kanpur", phone: "0512-234567" },
];

export const monthlyData = [
  { month: "Sep", income: 28000, expense: 12000 },
  { month: "Oct", income: 35000, expense: 15000 },
  { month: "Nov", income: 42000, expense: 18000 },
  { month: "Dec", income: 50000, expense: 22000 },
  { month: "Jan", income: 38000, expense: 16000 },
  { month: "Feb", income: 45000, expense: 19000 },
];

export const aiBusinessTips = [
  "Consider diversifying your product range to include seasonal items during festival periods.",
  "Set aside 20% of your monthly income as business savings for emergencies.",
  "Join local self-help groups (SHGs) for collective bargaining power on raw materials.",
  "Use social media like WhatsApp Business to reach more customers in nearby towns.",
  "Track your daily expenses to identify areas where you can cut costs.",
  "Consider offering bulk discounts for B2B buyers to increase order volume.",
  "Register for government schemes like PMEGP for business expansion loans.",
  "Package your products attractively - good packaging can increase perceived value by 30%.",
];

export const aiPricingAdvice = [
  "Your handloom products are priced below market average. Consider a 10% price increase.",
  "Festival season (Oct-Jan) allows for 15-20% premium pricing on decorative items.",
  "B2B pricing should be at least 15% above cost to maintain margins.",
  "Consider tiered pricing: individual items at retail, sets at slight discount for volume.",
  "Compare your pricing with online marketplaces to stay competitive.",
];

export const aiSavingsTips = [
  "Open a separate business savings account to track business finances clearly.",
  "Buy raw materials in bulk during off-season when prices are 10-15% lower.",
  "Share transportation costs with nearby artisans for market deliveries.",
  "Use government subsidized training programs instead of paid courses.",
  "Invest in better tools - they reduce waste and increase production efficiency.",
];

// AI Pricing Logic
export function calculateRetailPrice(costPrice: number): number {
  return Math.round(costPrice * 1.30);
}

export function calculateB2BPrice(costPrice: number): number {
  return Math.round(costPrice * 1.15);
}

export function calculateSeasonalPrice(basePrice: number): number {
  const month = new Date().getMonth();
  const festiveMonths = [9, 10, 11, 0]; // Oct, Nov, Dec, Jan
  if (festiveMonths.includes(month)) {
    return Math.round(basePrice * 1.10);
  }
  return basePrice;
}

export function suggestNearbyShops(material: string, userLocation: string): RawMaterialShop[] {
  const normalizedMaterial = material.toLowerCase().trim();
  const normalizedLocation = userLocation.toLowerCase().trim();
  
  return rawMaterialShops.filter(shop => {
    const materialMatch = shop.material.toLowerCase().includes(normalizedMaterial) ||
                          normalizedMaterial.includes(shop.material.toLowerCase());
    const locationMatch = shop.location.toLowerCase().includes(normalizedLocation) ||
                          normalizedLocation.includes(shop.location.toLowerCase());
    return materialMatch || (materialMatch && locationMatch);
  }).sort((a, b) => {
    const aLoc = a.location.toLowerCase().includes(normalizedLocation) ? 0 : 1;
    const bLoc = b.location.toLowerCase().includes(normalizedLocation) ? 0 : 1;
    return aLoc - bLoc;
  });
}

// Mock Aadhaar verification
const validAadhaarPrefixes = ["2", "3", "4", "5", "6", "7", "8", "9"];
export function verifyAadhaar(aadhaar: string): { valid: boolean; message: string } {
  if (aadhaar.length !== 12) {
    return { valid: false, message: "Aadhaar must be exactly 12 digits." };
  }
  if (!/^\d{12}$/.test(aadhaar)) {
    return { valid: false, message: "Aadhaar must contain only digits." };
  }
  if (!validAadhaarPrefixes.includes(aadhaar[0])) {
    return { valid: false, message: "Invalid Aadhaar number format." };
  }
  // Simulate verification delay success
  return { valid: true, message: "Aadhaar verified successfully." };
}
