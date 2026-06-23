import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronRight,
  Star,
  Plus,
  Minus,
  Truck,
  Shield,
  Phone,
  MapPin,
  Clock,
  SlidersHorizontal,
  ArrowRight,
  Check,
  Package,
  ChevronLeft,
  User,
  Building2,
  CreditCard,
  Tag,
  CheckCircle2,
  Flame,
  Zap,
  ChevronDown,
  Copy,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page =
  | "home"
  | "category"
  | "search"
  | "product"
  | "checkout"
  | "login"
  | "units";
type CheckoutStep = 1 | 2 | 3 | 4;

interface NavOpts {
  categoryId?: string;
  productId?: string;
  query?: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  imageId: string;
}
interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  unit: string;
  imageId: string;
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
  sale?: boolean;
  isNew?: boolean;
}
interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "basicos",
    name: "Materiais Básicos",
    count: 234,
    imageId: "1504307651254-35680f356dfd",
  },
  {
    id: "hidraulica",
    name: "Hidráulica",
    count: 178,
    imageId: "1558618666-fcd25c85cd64",
  },
  {
    id: "eletrica",
    name: "Elétrica",
    count: 312,
    imageId: "1497515114629-f71d768fd07c",
  },
  {
    id: "tintas",
    name: "Tintas e Vernizes",
    count: 156,
    imageId: "1562183241-840b8af0721e",
  },
  {
    id: "pisos",
    name: "Pisos e Revestimentos",
    count: 289,
    imageId: "1558618047-3c8c76ca7d13",
  },
  {
    id: "ferramentas",
    name: "Ferramentas",
    count: 445,
    imageId: "1504148455328-c376907d081c",
  },
  {
    id: "metais",
    name: "Metais Sanitários",
    count: 134,
    imageId: "1574482620826-5e18e5f61e97",
  },
  {
    id: "loucas",
    name: "Louças Sanitárias",
    count: 89,
    imageId: "1552321554-5fefe8c9ef14",
  },
  {
    id: "esquadrias",
    name: "Esquadrias",
    count: 67,
    imageId: "1503174971373-b1f69850bded",
  },
  {
    id: "utilidades",
    name: "Utilidades",
    count: 201,
    imageId: "1585771724684-38269d6639fd",
  },
];

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Cimento CP II-F-32 50kg",
    category: "basicos",
    brand: "Votorantim",
    price: 32.9,
    originalPrice: 38.9,
    rating: 4.8,
    reviews: 247,
    stock: 120,
    unit: "saco",
    imageId: "1504307651254-35680f356dfd",
    description:
      "Cimento Portland composto de alta qualidade para alvenaria, reboco, contrapiso e aplicações estruturais. Resistência garantida de 32 MPa aos 28 dias.",
    specs: {
      Tipo: "CP II-F-32",
      Peso: "50 kg",
      Resistência: "32 MPa",
      Validade: "90 dias",
      Norma: "ABNT NBR 11578",
    },
    featured: true,
    sale: true,
  },
  {
    id: "p2",
    name: "Argamassa Colante ACII 20kg",
    category: "basicos",
    brand: "Quartzolit",
    price: 18.5,
    originalPrice: 22.0,
    rating: 4.6,
    reviews: 183,
    stock: 85,
    unit: "saco",
    imageId: "1581578731548-c64695cc6952",
    description:
      "Argamassa colante ACII para assentamento de revestimentos cerâmicos em áreas internas e externas. Alto poder de aderência e fácil aplicação.",
    specs: {
      Tipo: "ACII",
      Peso: "20 kg",
      Rendimento: "3–5 m²/saco",
      "Tempo aberto": "25 min",
      Norma: "ABNT NBR 14081",
    },
    sale: true,
  },
  {
    id: "p3",
    name: "Tinta Acrílica Premium 18L Branco Neve",
    category: "tintas",
    brand: "Suvinil",
    price: 189.9,
    rating: 4.9,
    reviews: 312,
    stock: 43,
    unit: "galão",
    imageId: "1562183241-840b8af0721e",
    description:
      "Tinta acrílica premium para interiores e exteriores. Alta cobertura, lavável e resistente a bolores e intempéries. Disponível em mais de 2.000 cores.",
    specs: {
      Tipo: "Acrílica",
      Volume: "18 L",
      Rendimento: "80–120 m²/demão",
      "Secagem toque": "2 h",
      Acabamento: "Fosco",
    },
    featured: true,
  },
  {
    id: "p4",
    name: "Torneira Monocomando Bica Alta Cozinha",
    category: "hidraulica",
    brand: "Deca",
    price: 249.9,
    originalPrice: 299.9,
    rating: 4.7,
    reviews: 95,
    stock: 28,
    unit: "un",
    imageId: "1585771724684-38269d6639fd",
    description:
      "Torneira monocomando para cozinha com bica alta giratória 360°. Acabamento cromado de alta durabilidade. Aerador com regulagem de vazão incluso.",
    specs: {
      Tipo: "Monocomando",
      Material: "Metal cromado",
      "Pressão mín.": "0,5 mca",
      "Pressão máx.": "80 mca",
      Garantia: "5 anos",
    },
    featured: true,
    sale: true,
  },
  {
    id: "p5",
    name: "Porcelanato Carrara Polido 60×60cm",
    category: "pisos",
    brand: "Portobello",
    price: 89.9,
    rating: 4.9,
    reviews: 421,
    stock: 156,
    unit: "m²",
    imageId: "1558618047-3c8c76ca7d13",
    description:
      "Porcelanato polido com visual mármore Carrara, ideal para salas e ambientes de alto tráfego. Superfície lisa de fácil limpeza e alta resistência mecânica.",
    specs: {
      Dimensão: "60×60 cm",
      Espessura: "9,5 mm",
      PEI: "4",
      Absorção: "< 0,5%",
      Norma: "ABNT NBR 15463",
    },
    featured: true,
    isNew: true,
  },
  {
    id: "p6",
    name: "Lâmpada LED Bulbo 9W E27 6500K",
    category: "eletrica",
    brand: "Philips",
    price: 12.9,
    originalPrice: 16.9,
    rating: 4.8,
    reviews: 889,
    stock: 340,
    unit: "un",
    imageId: "1565814636199-ae8133055c1c",
    description:
      "Lâmpada LED de alta eficiência energética. 9W equivalente a 60W incandescente. 806 lúmens, luz branca fria. Vida útil de 15.000 horas.",
    specs: {
      Potência: "9 W",
      Equivalência: "60 W",
      Lúmens: "806 lm",
      Temperatura: "6500 K",
      "Vida útil": "15.000 h",
    },
    sale: true,
  },
  {
    id: "p7",
    name: "Cabo Flexível 2,5mm² 100m Amarelo/Verde",
    category: "eletrica",
    brand: "Prysmian",
    price: 289.0,
    originalPrice: 320.0,
    rating: 4.7,
    reviews: 156,
    stock: 35,
    unit: "rolo",
    imageId: "1558276561-8f9b49369b5f",
    description:
      "Cabo flexível de cobre para instalações elétricas residenciais e comerciais. Isolamento em PVC antichama. Atende à norma ABNT NBR 6880.",
    specs: {
      Seção: "2,5 mm²",
      Comprimento: "100 m",
      Tensão: "750 V",
      Material: "Cobre flexível",
      Norma: "NBR 6880",
    },
    sale: true,
  },
  {
    id: "p8",
    name: 'Registro de Gaveta 3/4" Latão Cromado',
    category: "hidraulica",
    brand: "Blukit",
    price: 42.9,
    rating: 4.5,
    reviews: 74,
    stock: 62,
    unit: "un",
    imageId: "1584463623578-f1c7e0a89c7b",
    description:
      "Registro de gaveta em latão cromado para instalações hidráulicas residenciais e comerciais. Alta resistência à corrosão e vedação garantida.",
    specs: {
      Diâmetro: '3/4"',
      Material: "Latão cromado",
      "Pressão máx.": "100 mca",
      "Temperatura máx.": "90 °C",
      Norma: "ABNT NBR 15085",
    },
  },
  {
    id: "p9",
    name: "Cuba de Embutir Oval 46×33cm Branca",
    category: "loucas",
    brand: "Roca",
    price: 189.9,
    originalPrice: 229.9,
    rating: 4.6,
    reviews: 63,
    stock: 19,
    unit: "un",
    imageId: "1552321554-5fefe8c9ef14",
    description:
      "Cuba de louça branca para embutir em bancadas de banheiro. Design oval elegante, acabamento vitrificado antirisco e antivazamento.",
    specs: {
      Dimensões: "46×33 cm",
      Material: "Louça vitrificada",
      Espessura: "9 mm",
      Cor: "Branco",
      Garantia: "5 anos",
    },
    sale: true,
  },
  {
    id: "p10",
    name: "Furadeira de Impacto 650W 13mm",
    category: "ferramentas",
    brand: "Bosch",
    price: 399.9,
    originalPrice: 479.9,
    rating: 4.9,
    reviews: 538,
    stock: 47,
    unit: "un",
    imageId: "1504148455328-c376907d081c",
    description:
      "Furadeira de impacto profissional com mandril de 13 mm. Motor de 650 W, 2 velocidades, função reversível. Ideal para alvenaria, madeira e metal.",
    specs: {
      Potência: "650 W",
      Voltagem: "127/220 V",
      Mandril: "13 mm",
      "Rotação máx.": "3.000 rpm",
      Garantia: "2 anos",
    },
    featured: true,
    sale: true,
  },
  {
    id: "p11",
    name: "Gabinete de Banheiro c/ Espelho 60cm",
    category: "loucas",
    brand: "Celite",
    price: 549.9,
    originalPrice: 649.9,
    rating: 4.4,
    reviews: 41,
    stock: 11,
    unit: "un",
    imageId: "1556909114-f6e7ad7d3136",
    description:
      "Gabinete suspenso para banheiro com espelho bisotado, porta com amortecedor, prateleiras reguláveis e duas tomadas embutidas. MDF laqueado.",
    specs: {
      Dimensões: "60×68×14 cm",
      Material: "MDF laqueado + espelho",
      Cor: "Branco brilhante",
      Tensão: "110/220 V",
      Garantia: "1 ano",
    },
    sale: true,
    isNew: true,
  },
];

const UNITS = [
  {
    id: "u1",
    name: "Casa Forte Recife — Unidade Central",
    address: "Av. Parnamirim, 1.234 — Parnamirim",
    city: "Recife — PE",
    phone: "(81) 3333-0001",
    hours: "Seg–Sex: 7h–18h | Sáb: 7h–13h",
  },
  {
    id: "u2",
    name: "Casa Forte Caruaru",
    address: "Av. Agamenon Magalhães, 567 — Centro",
    city: "Caruaru — PE",
    phone: "(81) 3333-0002",
    hours: "Seg–Sex: 7h–18h | Sáb: 7h–13h",
  },
  {
    id: "u3",
    name: "Casa Forte Olinda",
    address: "Rua do Amparo, 89 — Centro Histórico",
    city: "Olinda — PE",
    phone: "(81) 3333-0003",
    hours: "Seg–Sex: 8h–17h30 | Sáb: 8h–12h",
  },
  {
    id: "u4",
    name: "Casa Forte Petrolina",
    address: "Rua Afonso Pena, 2.100 — Centro",
    city: "Petrolina — PE",
    phone: "(87) 3333-0004",
    hours: "Seg–Sex: 7h–17h30 | Sáb: 7h–12h",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const img = (id: string, w = 400, h = 400) => {
  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'%3E%3Crect width='${w}' height='${h}' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' fill='%236b7280' text-anchor='middle' dominant-baseline='middle' transform='translate(0, -10)'%3EInserir Imagem%3C/text%3E%3C/svg%3E`;
  return placeholder;
};
const bgImg = (id: string, w = 400, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

function Stars({ rating, sm }: { rating: number; sm?: boolean }) {
  const sz = sm ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex gap-px">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} ${i <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  );
}

function Pill({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "sale" | "new" | "muted";
}) {
  const s = {
    primary: "bg-primary text-primary-foreground",
    sale: "bg-accent text-accent-foreground",
    new: "bg-emerald-600 text-white",
    muted: "border border-border text-muted-foreground",
  };
  return (
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm font-[Barlow] ${s[variant]}`}
    >
      {children}
    </span>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onNavigate,
  onAddToCart,
  isFav,
  onToggleFav,
}: {
  product: Product;
  onNavigate: (p: Page, opts?: NavOpts) => void;
  onAddToCart: (id: string) => void;
  isFav: boolean;
  onToggleFav: (id: string) => void;
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const pct = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div
      onClick={() => onNavigate("product", { productId: product.id })}
      className="group min-w-0 bg-card border border-border rounded cursor-pointer flex flex-col overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary aspect-square">
        <img
          src={img(product.imageId, 500, 500)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.sale && pct > 0 && <Pill variant="sale">-{pct}%</Pill>}
          {product.isNew && <Pill variant="new">Novo</Pill>}
          {product.featured && !product.sale && !product.isNew && (
            <Pill>Destaque</Pill>
          )}
        </div>
        {/* Fav */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(product.id);
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFav ? "bg-accent text-white" : "bg-white/80 text-muted-foreground hover:bg-white"}`}
        >
          <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
        </button>
        {/* Low stock */}
        {product.stock < 20 && (
          <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground text-[10px] font-semibold text-center py-1 font-[Barlow]">
            Apenas {product.stock} em estoque
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0 p-2.5 sm:p-3 gap-1.5">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold font-[Barlow] truncate">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 font-[Barlow]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Stars rating={product.rating} sm />
          <span className="text-[11px] text-muted-foreground">
            ({product.reviews})
          </span>
        </div>
        <div className="mt-auto pt-2 border-t border-border flex items-end justify-between gap-2 min-w-0">
          <div className="min-w-0">
            {product.originalPrice && (
              <p className="text-[11px] text-muted-foreground line-through">
                {fmt(product.originalPrice)}
              </p>
            )}
            <p className="text-sm sm:text-base font-bold text-primary font-[Barlow_Condensed] truncate">
              {fmt(product.price)}
              <span className="text-[11px] font-normal text-muted-foreground ml-1">
                /{product.unit}
              </span>
            </p>
          </div>
          <button
            onClick={handleAdd}
            className={`shrink-0 h-8 w-8 sm:w-auto sm:px-3 rounded text-[12px] font-bold uppercase tracking-wide transition-all font-[Barlow] flex items-center justify-center ${added ? "bg-emerald-600 text-white" : "bg-accent text-accent-foreground hover:bg-accent/90"}`}
          >
            {added ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CartDrawer ───────────────────────────────────────────────────────────────

function CartDrawer({
  cart,
  onClose,
  onUpdateQty,
  onRemove,
  onNavigate,
}: {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (p: Page, opts?: NavOpts) => void;
}) {
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const frete = subtotal >= 500 ? 0 : 49.9;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm min-w-0 bg-card flex flex-col h-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-bold text-lg font-[Barlow_Condensed] tracking-wide">
              Carrinho
            </h2>
            <span className="text-xs bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium font-[Barlow]">
                Seu carrinho está vazio
              </p>
              <p className="text-sm mt-1">Adicione produtos para continuar</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-secondary rounded p-2"
              >
                <img
                  src={img(item.product.imageId, 80, 80)}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded shrink-0 bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2 font-[Barlow]">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.product.brand}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center border border-border rounded bg-card overflow-hidden">
                      <button
                        onClick={() =>
                          onUpdateQty(item.product.id, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold font-[Barlow]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQty(item.product.id, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-primary font-[Barlow_Condensed]">
                      {fmt(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-4 space-y-3 bg-card">
            {/* Frete */}
            <div className="flex items-center justify-between text-sm text-muted-foreground font-[Barlow]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                Frete estimado
              </span>
              <span
                className={frete === 0 ? "text-emerald-600 font-semibold" : ""}
              >
                {frete === 0 ? "Grátis" : fmt(frete)}
              </span>
            </div>
            {subtotal < 500 && (
              <p className="text-[11px] text-muted-foreground bg-secondary rounded p-2 font-[Barlow]">
                Faltam{" "}
                <strong className="text-primary">{fmt(500 - subtotal)}</strong>{" "}
                para frete grátis!
              </p>
            )}
            <div className="flex items-center justify-between font-bold font-[Barlow]">
              <span>Total</span>
              <span className="text-xl text-primary font-[Barlow_Condensed]">
                {fmt(subtotal + frete)}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onNavigate("checkout");
              }}
              className="w-full bg-accent text-accent-foreground py-3 rounded font-bold uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors font-[Barlow]"
            >
              Finalizar Compra
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors font-[Barlow]"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  cartCount,
  favCount,
  onNavigate,
  onOpenCart,
  onSearch,
  currentPage,
}: {
  cartCount: number;
  favCount: number;
  onNavigate: (p: Page, opts?: NavOpts) => void;
  onOpenCart: () => void;
  onSearch: (q: string) => void;
  currentPage: Page;
}) {
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      onSearch(q.trim());
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-lg w-full">
        {/* Main header */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-9 h-9 bg-accent rounded flex items-center justify-center">
              <span className="text-white font-black text-lg font-[Barlow_Condensed] leading-none">
                CF
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-lg font-black tracking-wider font-[Barlow_Condensed] text-white">
                CASA FORTE
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/60 font-[Barlow]">
                Materiais de Construção
              </span>
            </div>
          </button>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-auto min-w-0"
          >
            <div className="flex w-full rounded overflow-hidden border border-white/20 focus-within:border-accent transition-colors">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar produtos, marcas, categorias..."
                className="flex-1 min-w-0 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50 px-4 py-2.5 text-sm outline-none font-[Barlow]"
              />
              <button
                type="submit"
                className="bg-accent px-4 hover:bg-accent/80 transition-colors flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto md:ml-0 shrink-0">
            {/* Mobile search */}
            <button
              onClick={() => {
                const s = prompt("Buscar produtos:");
                if (s) onSearch(s);
              }}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            {/* Favorites */}
            <button
              onClick={() =>
                alert(`Você tem ${favCount} produtos favoritados!`)
              }
              className="hidden sm:flex relative w-10 h-10 items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-accent text-[9px] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {favCount}
                </span>
              )}
            </button>
            {/* Account */}
            <button
              onClick={() => onNavigate("login")}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="relative w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1 bg-accent text-[9px] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Category nav — desktop */}
        <nav className="hidden md:block border-t border-white/10 bg-primary/60">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-1 py-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate("category", { categoryId: cat.id })}
                className={`px-3 py-2 text-[11px] lg:text-xs font-semibold uppercase tracking-wide whitespace-nowrap rounded-sm transition-colors font-[Barlow] hover:bg-accent/80 hover:text-white ${currentPage === "category" ? "hover:text-white" : ""}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative z-10 bg-primary text-primary-foreground mt-[64px] overflow-y-auto overflow-x-hidden flex-1 max-h-[calc(100vh-64px)] w-full">
            {/* Mobile search */}
            <form
              onSubmit={(e) => {
                handleSearch(e);
                setMenuOpen(false);
              }}
              className="p-4 border-b border-white/10"
            >
              <div className="flex rounded overflow-hidden border border-white/20">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="flex-1 min-w-0 bg-white/10 text-white placeholder:text-white/50 px-3 py-2.5 text-sm outline-none font-[Barlow]"
                />
                <button type="submit" className="bg-accent px-4">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
            {/* Links */}
            <div className="p-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onNavigate("category", { categoryId: cat.id });
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded hover:bg-white/10 text-sm font-semibold font-[Barlow] transition-colors"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 p-2">
              <button
                onClick={() => {
                  onNavigate("login");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 text-sm font-[Barlow]"
              >
                <User className="w-4 h-4" />
                <span>Minha Conta</span>
              </button>
              <button
                onClick={() => {
                  onNavigate("units");
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 text-sm font-[Barlow]"
              >
                <Building2 className="w-4 h-4" />
                <span>Nossas Lojas</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({
  onNavigate,
}: {
  onNavigate: (p: Page, opts?: NavOpts) => void;
}) {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground mt-16 w-full overflow-hidden">
      {/* Banner */}
      <div className="bg-accent">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-xl font-[Barlow_Condensed] tracking-wide text-white">
              RECEBA OFERTAS EXCLUSIVAS
            </p>
            <p className="text-sm text-white/80 font-[Barlow]">
              Cadastre seu e-mail e receba descontos antes de todo mundo
            </p>
          </div>
          {subbed ? (
            <div className="flex items-center gap-2 text-white font-semibold font-[Barlow]">
              <CheckCircle2 className="w-5 h-5" /> Inscrito com sucesso!
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubbed(true);
              }}
              className="flex w-full sm:w-auto min-w-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 min-w-0 sm:w-60 bg-white/20 border border-white/30 text-white placeholder:text-white/60 px-4 py-2.5 text-sm rounded-l outline-none focus:bg-white/30 font-[Barlow]"
              />
              <button
                type="submit"
                className="bg-primary text-white px-5 py-2.5 rounded-r font-semibold text-sm hover:bg-primary/80 transition-colors font-[Barlow]"
              >
                Quero!
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
              <span className="text-white font-black text-xl font-[Barlow_Condensed]">
                CF
              </span>
            </div>
            <span className="font-black text-xl tracking-wider font-[Barlow_Condensed]">
              CASA FORTE
            </span>
          </div>
          <p className="text-sm text-primary-foreground/60 leading-relaxed font-[Barlow] mb-4">
            Há mais de 30 anos construindo junto com você. Qualidade, preço
            justo e atendimento especializado em Pernambuco.
          </p>
          <div className="flex gap-3">
            {["f", "ig", "yt"].map((s) => (
              <div
                key={s}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent transition-colors flex items-center justify-center cursor-pointer"
              >
                <span className="text-xs font-bold font-[Barlow]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-primary-foreground/50 font-[Barlow]">
            Categorias
          </h4>
          <ul className="space-y-2">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => onNavigate("category", { categoryId: cat.id })}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-[Barlow]"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-primary-foreground/50 font-[Barlow]">
            Institucional
          </h4>
          <ul className="space-y-2">
            {[
              "Sobre nós",
              "Trabalhe conosco",
              "Blog",
              "Sustentabilidade",
              "Política de privacidade",
              "Termos de uso",
            ].map((l) => (
              <li key={l}>
                <button className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-[Barlow]">
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-primary-foreground/50 font-[Barlow]">
            Atendimento
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-primary-foreground/70 font-[Barlow]">
              <Phone className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
              <div>
                <p className="font-semibold text-primary-foreground">
                  0800 777 0001
                </p>
                <p>Seg–Sex: 8h–18h</p>
              </div>
            </li>
            <li className="flex items-start gap-2 text-sm text-primary-foreground/70 font-[Barlow]">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
              <div>
                <p>4 lojas em Pernambuco</p>
                <button
                  onClick={() => onNavigate("units")}
                  className="text-accent hover:underline text-xs"
                >
                  Ver endereços →
                </button>
              </div>
            </li>
            <li className="flex items-start gap-2 text-sm text-primary-foreground/70 font-[Barlow]">
              <Clock className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
              <div>
                <p>Seg–Sex: 7h–18h</p>
                <p>Sábado: 7h–13h</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40 font-[Barlow]">
            © {new Date().getFullYear()} Casa Forte Materiais de Construção.
            CNPJ 00.000.000/0001-00
          </p>
          <div className="flex gap-2">
            {["Visa", "MC", "Pix", "Boleto", "Amex"].map((m) => (
              <div
                key={m}
                className="bg-white/10 text-primary-foreground/60 text-[9px] font-bold px-2 py-1 rounded font-[Barlow] tracking-wide"
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page: Home ───────────────────────────────────────────────────────────────

function HomePage({
  onNavigate,
  onAddToCart,
  favorites,
  onToggleFav,
}: {
  onNavigate: (p: Page, opts?: NavOpts) => void;
  onAddToCart: (id: string) => void;
  favorites: Set<string>;
  onToggleFav: (id: string) => void;
}) {
  const featured = PRODUCTS.filter((p) => p.featured);
  const onSale = PRODUCTS.filter((p) => p.sale && p.originalPrice);

  return (
    <div className="w-full min-w-0 overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary min-h-[460px] md:min-h-[520px] flex items-center">
        <img
          src={bgImg("1504307651254-35680f356dfd", 1600, 600)}
          alt="Materiais de construção"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex max-w-full items-center gap-2 bg-accent/20 border border-accent/30 text-accent text-[11px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest px-3 py-1.5 rounded-sm mb-5 font-[Barlow]">
              <Flame className="w-3.5 h-3.5" /> Ofertas da Semana — até 30% OFF
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[0.9] mb-5 font-[Barlow_Condensed] uppercase tracking-normal">
              CONSTRUA
              <br />
              <span className="text-accent">COM QUEM</span>
              <br />
              ENTENDE
            </h1>
            <p className="text-primary-foreground/70 text-lg mb-8 font-[Barlow] max-w-lg">
              Mais de 15.000 produtos para obra, reforma e acabamento. Entrega
              rápida em Pernambuco.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <button
                onClick={() =>
                  onNavigate("category", { categoryId: "ferramentas" })
                }
                className="bg-accent text-white px-5 sm:px-7 py-3.5 rounded font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors font-[Barlow] flex items-center justify-center gap-2"
              >
                Ver Ofertas <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  onNavigate("category", { categoryId: "basicos" })
                }
                className="border border-white/30 text-white px-5 sm:px-7 py-3.5 rounded font-bold uppercase tracking-wide hover:bg-white/10 transition-colors font-[Barlow] text-center"
              >
                Explorar Categorias
              </button>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 sm:gap-4 md:flex md:justify-around">
            {[
              { icon: Package, label: "15.000+ produtos" },
              { icon: Truck, label: "Entrega em PE" },
              { icon: Shield, label: "30 dias de garantia" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-primary-foreground/70 text-xs font-[Barlow]"
              >
                <Icon className="w-4 h-4 text-accent shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-3xl md:text-4xl font-black font-[Barlow_Condensed] uppercase text-primary">
              Categorias
            </h2>
            <p className="text-muted-foreground text-sm font-[Barlow]">
              Encontre o que você precisa por departamento
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate("category", { categoryId: cat.id })}
              className="group relative overflow-hidden rounded aspect-[4/3] bg-secondary"
            >
              <img
                src={img(cat.imageId, 300, 225)}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 text-left">
                <p className="text-white font-bold text-xs leading-tight font-[Barlow_Condensed] uppercase tracking-wide">
                  {cat.name}
                </p>
                <p className="text-white/60 text-[10px] font-[Barlow]">
                  {cat.count} itens
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div
          className="relative rounded overflow-hidden cursor-pointer"
          onClick={() => onNavigate("category", { categoryId: "ferramentas" })}
        >
          <img
            src={img("1504148455328-c376907d081c", 1200, 280)}
            alt="Promoção ferramentas"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 flex items-center px-8 md:px-16">
            <div>
              <p className="text-accent font-bold text-sm uppercase tracking-widest font-[Barlow]">
                Oferta imperdível
              </p>
              <h3 className="text-white font-black text-3xl md:text-5xl font-[Barlow_Condensed] uppercase leading-tight">
                ATÉ 30% OFF
                <br />
                EM FERRAMENTAS
              </h3>
              <p className="text-white/60 mt-1 font-[Barlow] text-sm">
                Válido até o fim do mês • Enquanto durar o estoque
              </p>
            </div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex">
            <div className="bg-accent text-white rounded-full w-24 h-24 flex flex-col items-center justify-center font-[Barlow_Condensed]">
              <span className="font-black text-3xl leading-none">30%</span>
              <span className="text-xs font-bold uppercase">OFF</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-3xl md:text-4xl font-black font-[Barlow_Condensed] uppercase text-primary">
              Em Destaque
            </h2>
            <p className="text-muted-foreground text-sm font-[Barlow]">
              Seleção especial dos nossos melhores produtos
            </p>
          </div>
          <button
            onClick={() => onNavigate("category", { categoryId: "basicos" })}
            className="text-accent text-sm font-semibold hover:underline font-[Barlow] flex items-center gap-1"
          >
            Ver todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-4 gap-3 md:gap-4">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onNavigate={onNavigate}
              onAddToCart={onAddToCart}
              isFav={favorites.has(p.id)}
              onToggleFav={onToggleFav}
            />
          ))}
        </div>
      </section>

      {/* Dual promo */}
      <section className="max-w-7xl mx-auto px-4 mb-10 grid md:grid-cols-2 gap-4">
        {[
          {
            cat: "pisos",
            label: "PISOS E REVESTIMENTOS",
            sub: "Porcelanatos e cerâmicas com descontos de até 20%",
            imageId: "1558618047-3c8c76ca7d13",
          },
          {
            cat: "tintas",
            label: "TINTAS E VERNIZES",
            sub: "Marcas como Suvinil e Coral com condições especiais",
            imageId: "1562183241-840b8af0721e",
          },
        ].map((b) => (
          <div
            key={b.cat}
            onClick={() => onNavigate("category", { categoryId: b.cat })}
            className="relative rounded overflow-hidden cursor-pointer group"
          >
            <img
              src={img(b.imageId, 600, 220)}
              alt={b.label}
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center px-6">
              <div>
                <h3 className="text-white font-black text-xl font-[Barlow_Condensed] uppercase">
                  {b.label}
                </h3>
                <p className="text-white/70 text-xs mt-1 max-w-[200px] font-[Barlow]">
                  {b.sub}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-accent text-xs font-bold font-[Barlow] uppercase tracking-wide">
                  Ver ofertas <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* On sale */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-5 h-5 text-accent" />
              <h2 className="text-3xl md:text-4xl font-black font-[Barlow_Condensed] uppercase text-primary">
                Promoções
              </h2>
            </div>
            <p className="text-muted-foreground text-sm font-[Barlow]">
              Preços especiais por tempo limitado
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-4 gap-3 md:gap-4">
          {onSale.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onNavigate={onNavigate}
              onAddToCart={onAddToCart}
              isFav={favorites.has(p.id)}
              onToggleFav={onToggleFav}
            />
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: Truck,
              title: "Entrega Rápida",
              desc: "Receba em até 48h em Recife e Região Metropolitana",
            },
            {
              icon: Shield,
              title: "Compra Segura",
              desc: "Site protegido com criptografia SSL 256-bit",
            },
            {
              icon: Package,
              title: "Troca Fácil",
              desc: "30 dias para trocar ou devolver sem burocracia",
            },
            {
              icon: Phone,
              title: "Suporte Especializado",
              desc: "Consultores técnicos prontos para te ajudar",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-bold text-sm font-[Barlow]">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 font-[Barlow]">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Page: Category / Search ──────────────────────────────────────────────────

function CategoryPage({
  categoryId,
  isSearch,
  query,
  onNavigate,
  onAddToCart,
  favorites,
  onToggleFav,
}: {
  categoryId: string;
  isSearch: boolean;
  query: string;
  onNavigate: (p: Page, opts?: NavOpts) => void;
  onAddToCart: (id: string) => void;
  favorites: Set<string>;
  onToggleFav: (id: string) => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceMax, setPriceMax] = useState(1000);
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const baseProducts = isSearch
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()),
      )
    : PRODUCTS.filter((p) => p.category === categoryId);

  const brands = [...new Set(baseProducts.map((p) => p.brand))];

  let filtered = baseProducts
    .filter((p) => p.price <= priceMax)
    .filter((p) => selBrands.length === 0 || selBrands.includes(p.brand));

  if (sortBy === "price_asc")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc")
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating")
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === "name")
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const toggleBrand = (b: string) =>
    setSelBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wide mb-3 font-[Barlow]">
          Preço máximo
        </h3>
        <input
          type="range"
          min={10}
          max={1000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1 font-[Barlow]">
          <span>R$ 10</span>
          <span className="font-bold text-primary">{fmt(priceMax)}</span>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wide mb-3 font-[Barlow]">
          Marca
        </h3>
        <div className="space-y-2">
          {brands.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 cursor-pointer text-sm font-[Barlow]"
            >
              <input
                type="checkbox"
                checked={selBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="w-4 h-4 accent-accent rounded"
              />
              {b}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full min-w-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5 font-[Barlow]">
        <button
          onClick={() => onNavigate("home")}
          className="hover:text-foreground"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        {isSearch ? (
          <span className="text-foreground">Busca: "{query}"</span>
        ) : (
          <span className="text-foreground">{cat?.name}</span>
        )}
      </nav>

      <div className="flex flex-col md:flex-row gap-6 min-w-0">
        {/* Filter sidebar — desktop */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="bg-card rounded border border-border p-4 sticky top-20">
            <h2 className="font-black text-sm uppercase tracking-widest mb-4 font-[Barlow] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </h2>
            <FilterContent />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Header bar */}
          <div className="flex items-start sm:items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-black font-[Barlow_Condensed] uppercase text-primary">
                {isSearch ? `"${query}"` : cat?.name}
              </h1>
              <p className="text-sm text-muted-foreground font-[Barlow]">
                {filtered.length} produto{filtered.length !== 1 ? "s" : ""}{" "}
                encontrado{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2">
              {/* Mobile filter */}
              <button
                onClick={() => setFilterOpen(true)}
                className="md:hidden flex items-center gap-1.5 border border-border rounded px-3 py-2 text-sm font-semibold font-[Barlow] bg-card"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filtrar
              </button>
              {/* Sort */}
              <div className="relative flex-1 sm:flex-none min-w-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none border border-border rounded px-3 py-2 pr-8 text-sm bg-card outline-none font-[Barlow] cursor-pointer"
                >
                  <option value="relevance">Mais relevantes</option>
                  <option value="price_asc">Menor preço</option>
                  <option value="price_desc">Maior preço</option>
                  <option value="rating">Melhor avaliados</option>
                  <option value="name">Nome A–Z</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Active filters */}
          {selBrands.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => toggleBrand(b)}
                  className="flex items-center gap-1 bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-full font-[Barlow]"
                >
                  {b} <X className="w-3 h-3" />
                </button>
              ))}
              <button
                onClick={() => setSelBrands([])}
                className="text-xs text-muted-foreground hover:text-foreground font-[Barlow]"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-semibold font-[Barlow]">
                Nenhum produto encontrado
              </p>
              <button
                onClick={() => {
                  setSelBrands([]);
                  setPriceMax(1000);
                }}
                className="text-accent text-sm mt-2 hover:underline font-[Barlow]"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigate={onNavigate}
                  onAddToCart={onAddToCart}
                  isFav={favorites.has(p.id)}
                  onToggleFav={onToggleFav}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFilterOpen(false)}
          />
          <div className="relative z-10 bg-card w-full min-w-0 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto overflow-x-hidden">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-black text-lg font-[Barlow_Condensed] uppercase">
                Filtros
              </h2>
              <button onClick={() => setFilterOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full mt-6 bg-accent text-white py-3 rounded font-bold uppercase tracking-wide font-[Barlow]"
            >
              Aplicar Filtros ({filtered.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page: Product ────────────────────────────────────────────────────────────

function ProductPage({
  productId,
  onNavigate,
  onAddToCart,
  isFav,
  onToggleFav,
  cart,
  favorites,
}: {
  productId: string;
  onNavigate: (p: Page, opts?: NavOpts) => void;
  onAddToCart: (id: string, qty: number) => void;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  cart: CartItem[];
  favorites: Set<string>;
}) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [cep, setCep] = useState("");
  const [cepResult, setCepResult] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const cat = CATEGORIES.find((c) => c.id === product?.category);
  const related = PRODUCTS.filter(
    (p) => p.category === product?.category && p.id !== productId,
  ).slice(0, 4);

  if (!product)
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-muted-foreground font-[Barlow]">
        Produto não encontrado.
        <button
          onClick={() => onNavigate("home")}
          className="block mx-auto mt-4 text-accent hover:underline"
        >
          Voltar ao início
        </button>
      </div>
    );

  const pct = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAdd = () => {
    onAddToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const calcCep = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, "").length === 8) {
      setCepResult(
        `Entrega disponível: R$ 19,90 • Prazo estimado: 3–5 dias úteis`,
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full min-w-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 font-[Barlow] flex-wrap">
        <button
          onClick={() => onNavigate("home")}
          className="hover:text-foreground"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <button
          onClick={() =>
            onNavigate("category", { categoryId: product.category })
          }
          className="hover:text-foreground"
        >
          {cat?.name}
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 min-w-0">
        {/* Image */}
        <div>
          <div className="aspect-square rounded overflow-hidden bg-secondary">
            <img
              src={img(product.imageId, 700, 700)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded overflow-hidden bg-secondary border-2 border-primary cursor-pointer"
              >
                <img
                  src={img(product.imageId, 150, 150)}
                  alt=""
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Badges + brand */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {product.sale && pct > 0 && <Pill variant="sale">-{pct}% OFF</Pill>}
            {product.isNew && <Pill variant="new">Novo</Pill>}
            <span className="text-xs text-muted-foreground font-[Barlow]">
              Ref: CF-{product.id.toUpperCase()}
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 font-[Barlow]">
            {product.brand}
          </p>
          <h1 className="text-2xl md:text-3xl font-black font-[Barlow_Condensed] uppercase text-primary leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <Stars rating={product.rating} />
            <span className="text-sm font-semibold font-[Barlow]">
              {product.rating}
            </span>
            <span className="text-sm text-muted-foreground font-[Barlow]">
              ({product.reviews} avaliações)
            </span>
          </div>

          {/* Price */}
          <div className="bg-secondary rounded p-4 mb-4">
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through font-[Barlow]">
                {fmt(product.originalPrice)}
              </p>
            )}
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-primary font-[Barlow_Condensed]">
                {fmt(product.price)}
              </p>
              <p className="text-sm text-muted-foreground font-[Barlow]">
                /{product.unit}
              </p>
            </div>
            {product.originalPrice && (
              <p className="text-emerald-600 text-sm font-semibold font-[Barlow] mt-1">
                Você economiza {fmt(product.originalPrice - product.price)} (
                {pct}% de desconto)
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2 font-[Barlow]">
              Em até <strong>12×</strong> de{" "}
              <strong>{fmt(product.price / 12)}</strong> sem juros no cartão
            </p>
          </div>

          {/* Stock */}
          <p
            className={`text-sm font-semibold mb-4 font-[Barlow] ${product.stock < 20 ? "text-orange-600" : "text-emerald-600"}`}
          >
            {product.stock < 20
              ? `⚠ Apenas ${product.stock} em estoque`
              : `✓ Em estoque (${product.stock} unidades)`}
          </p>

          {/* Qty + Add */}
          <div className="flex flex-wrap sm:flex-nowrap items-stretch gap-3 mb-4">
            <div className="flex items-center border border-border rounded bg-card overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-12 flex items-center justify-center hover:bg-muted transition-colors font-[Barlow]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-lg font-[Barlow_Condensed]">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-10 h-12 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`flex-1 min-w-[180px] py-3 rounded font-bold uppercase tracking-wide text-sm transition-all font-[Barlow] flex items-center justify-center gap-2 ${added ? "bg-emerald-600 text-white" : "bg-accent text-white hover:bg-accent/90"}`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Adicionado!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Adicionar ao Carrinho
                </>
              )}
            </button>
            <button
              onClick={() => onToggleFav(product.id)}
              className={`w-12 border rounded flex items-center justify-center transition-all ${isFav ? "border-accent bg-accent text-white" : "border-border text-muted-foreground hover:border-accent hover:text-accent"}`}
            >
              <Heart className={`w-5 h-5 ${isFav ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Buy now */}
          <button
            onClick={() => {
              onAddToCart(product.id, qty);
              onNavigate("checkout");
            }}
            className="w-full py-3 mb-4 bg-primary text-white rounded font-bold uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors font-[Barlow] flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" /> Comprar Agora
          </button>

          {/* Delivery */}
          <div className="border border-border rounded p-4 mb-4">
            <h3 className="font-bold text-sm uppercase tracking-wide mb-3 font-[Barlow] flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent" /> Calcular Frete
            </h3>
            <form onSubmit={calcCep} className="flex flex-col min-[420px]:flex-row gap-2">
              <input
                value={cep}
                onChange={(e) =>
                  setCep(e.target.value.replace(/\D/g, "").slice(0, 8))
                }
                placeholder="00000-000"
                className="flex-1 min-w-0 border border-border rounded px-3 py-2 text-sm bg-input-background outline-none focus:border-accent font-[Barlow]"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 rounded text-sm font-semibold font-[Barlow] hover:bg-primary/80 transition-colors"
              >
                Calcular
              </button>
            </form>
            {cepResult && (
              <p className="text-sm text-emerald-600 mt-2 font-[Barlow] font-semibold">
                {cepResult}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2 font-[Barlow]">
              Frete grátis acima de R$ 500 para Recife e Região Metropolitana
            </p>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2">
            {[
              { icon: Shield, label: "Compra Segura" },
              { icon: Package, label: "30 dias p/ troca" },
              { icon: Truck, label: "Entrega Rápida" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 bg-secondary rounded p-2 text-center"
              >
                <Icon className="w-4 h-4 text-accent" />
                <p className="text-[10px] font-semibold font-[Barlow] leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 border-t border-border pt-8">
        <div className="flex gap-0 border-b border-border mb-6 overflow-x-auto">
          {(["desc", "specs", "reviews"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-4 sm:px-5 py-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors font-[Barlow] ${tab === t ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t === "desc"
                ? "Descrição"
                : t === "specs"
                  ? "Especificações"
                  : `Avaliações (${product.reviews})`}
            </button>
          ))}
        </div>

        {tab === "desc" && (
          <div className="max-w-2xl">
            <p className="text-foreground leading-relaxed font-[Barlow]">
              {product.description}
            </p>
          </div>
        )}

        {tab === "specs" && (
          <div className="max-w-lg">
            <table className="w-full text-sm font-[Barlow]">
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k} className="border-b border-border">
                    <td className="py-2.5 pr-4 font-semibold text-muted-foreground w-40">
                      {k}
                    </td>
                    <td className="py-2.5 text-foreground">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-4 mb-6 p-4 bg-secondary rounded">
              <div className="text-center">
                <p className="text-5xl font-black text-primary font-[Barlow_Condensed]">
                  {product.rating}
                </p>
                <Stars rating={product.rating} />
                <p className="text-xs text-muted-foreground mt-1 font-[Barlow]">
                  {product.reviews} avaliações
                </p>
              </div>
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 text-xs font-[Barlow]"
                  >
                    <span className="w-3 text-right">{s}</span>
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-yellow-400 h-full rounded-full"
                        style={{
                          width: `${s === 5 ? 70 : s === 4 ? 20 : s === 3 ? 7 : s === 2 ? 2 : 1}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {[
              {
                name: "Carlos Silva",
                date: "15/06/2025",
                text: "Produto de ótima qualidade, entrega rápida. Recomendo!",
                rating: 5,
              },
              {
                name: "Ana Souza",
                date: "03/06/2025",
                text: "Boa relação custo-benefício. Atendeu minhas expectativas.",
                rating: 4,
              },
              {
                name: "José Santos",
                date: "27/05/2025",
                text: "Produto conforme descrito. Chegou bem embalado.",
                rating: 5,
              },
            ].map((r) => (
              <div key={r.name} className="border border-border rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-sm font-[Barlow]">{r.name}</p>
                    <Stars rating={r.rating} sm />
                  </div>
                  <p className="text-xs text-muted-foreground font-[Barlow]">
                    {r.date}
                  </p>
                </div>
                <p className="text-sm text-foreground font-[Barlow]">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10 pt-8 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-black font-[Barlow_Condensed] uppercase text-primary mb-5">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-4 gap-3 md:gap-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={onNavigate}
                onAddToCart={(id) => onAddToCart(id, 1)}
                isFav={favorites.has(p.id)}
                onToggleFav={onToggleFav}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page: Checkout ───────────────────────────────────────────────────────────

function CheckoutPage({
  cart,
  onNavigate,
  onPlaceOrder,
}: {
  cart: CartItem[];
  onNavigate: (p: Page, opts?: NavOpts) => void;
  onPlaceOrder: () => void;
}) {
  const [step, setStep] = useState<CheckoutStep>(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "PE",
    payMethod: "credit",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [placed, setPlaced] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const frete = subtotal >= 500 ? 0 : 49.9;
  const total = subtotal + frete;

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (placed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-black font-[Barlow_Condensed] uppercase text-primary mb-3">
          Pedido Confirmado!
        </h1>
        <p className="text-muted-foreground font-[Barlow] mb-2">
          Pedido{" "}
          <strong>#CF-{Math.floor(Math.random() * 90000 + 10000)}</strong>{" "}
          realizado com sucesso.
        </p>
        <p className="text-muted-foreground font-[Barlow] mb-8">
          Você receberá um e-mail de confirmação em breve. Prazo de entrega:{" "}
          <strong>3–5 dias úteis</strong>.
        </p>
        <div className="bg-secondary rounded p-4 text-left mb-6 font-[Barlow] text-sm">
          <p className="font-bold mb-2">Resumo do pedido</p>
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between py-1">
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>{fmt(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
        <button
          onClick={() => onNavigate("home")}
          className="bg-accent text-white px-8 py-3 rounded font-bold uppercase tracking-wide font-[Barlow] hover:bg-accent/90 transition-colors"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  const steps = ["Identificação", "Endereço", "Pagamento", "Confirmar"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full min-w-0">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-start sm:justify-center gap-0 overflow-x-auto pb-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide font-[Barlow] ${i + 1 <= step ? "text-accent" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 ${i + 1 < step ? "bg-accent border-accent text-white" : i + 1 === step ? "border-accent text-accent" : "border-muted text-muted-foreground"}`}
                >
                  {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-0.5 mx-1 ${i + 1 < step ? "bg-accent" : "bg-muted"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_320px] gap-6 min-w-0">
        {/* Form */}
        <div className="bg-card rounded border border-border p-4 sm:p-6 min-w-0">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black font-[Barlow_Condensed] uppercase mb-5">
                Identificação
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    k: "name",
                    label: "Nome completo",
                    placeholder: "João da Silva",
                    full: true,
                  },
                  {
                    k: "email",
                    label: "E-mail",
                    placeholder: "joao@email.com",
                    full: false,
                  },
                  {
                    k: "cpf",
                    label: "CPF",
                    placeholder: "000.000.000-00",
                    full: false,
                  },
                  {
                    k: "phone",
                    label: "Telefone",
                    placeholder: "(81) 99999-9999",
                    full: false,
                  },
                ].map((f) => (
                  <div key={f.k} className={f.full ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                      {f.label}
                    </label>
                    <input
                      value={(form as any)[f.k]}
                      onChange={(e) => update(f.k, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full border border-border rounded px-3 py-2.5 text-sm bg-input-background outline-none focus:border-accent transition-colors font-[Barlow]"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full bg-accent text-white py-3 rounded font-bold uppercase tracking-wide font-[Barlow] hover:bg-accent/90 transition-colors"
              >
                Continuar →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-black font-[Barlow_Condensed] uppercase mb-5">
                Endereço de Entrega
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { k: "cep", label: "CEP", placeholder: "00000-000", cols: 1 },
                  {
                    k: "street",
                    label: "Rua / Av.",
                    placeholder: "Av. Parnamirim",
                    cols: 2,
                  },
                  {
                    k: "number",
                    label: "Número",
                    placeholder: "1234",
                    cols: 1,
                  },
                  {
                    k: "complement",
                    label: "Complemento",
                    placeholder: "Apto 101 (opcional)",
                    cols: 1,
                  },
                  {
                    k: "city",
                    label: "Cidade",
                    placeholder: "Recife",
                    cols: 1,
                  },
                  { k: "state", label: "Estado", placeholder: "PE", cols: 1 },
                ].map((f) => (
                  <div
                    key={f.k}
                    className={f.cols === 2 ? "sm:col-span-2" : ""}
                  >
                    <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                      {f.label}
                    </label>
                    <input
                      value={(form as any)[f.k]}
                      onChange={(e) => update(f.k, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full border border-border rounded px-3 py-2.5 text-sm bg-input-background outline-none focus:border-accent transition-colors font-[Barlow]"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col min-[420px]:flex-row gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-border py-3 rounded font-bold font-[Barlow] hover:bg-muted transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-accent text-white py-3 rounded font-bold uppercase tracking-wide font-[Barlow] hover:bg-accent/90 transition-colors"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-black font-[Barlow_Condensed] uppercase mb-5">
                Pagamento
              </h2>
              <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 mb-5">
                {[
                  {
                    id: "credit",
                    label: "Cartão de Crédito",
                    icon: CreditCard,
                  },
                  { id: "pix", label: "PIX", icon: Zap },
                  { id: "boleto", label: "Boleto", icon: Copy },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => update("payMethod", m.id)}
                    className={`flex min-w-0 flex-row min-[420px]:flex-col items-center justify-center gap-1.5 p-3 rounded border-2 transition-all text-xs font-bold font-[Barlow] text-center ${form.payMethod === m.id ? "border-accent text-accent bg-accent/5" : "border-border text-muted-foreground hover:border-primary"}`}
                  >
                    <m.icon className="w-5 h-5" />
                    {m.label}
                  </button>
                ))}
              </div>

              {form.payMethod === "credit" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      k: "cardNumber",
                      label: "Número do Cartão",
                      placeholder: "0000 0000 0000 0000",
                      cols: 2,
                    },
                    {
                      k: "cardName",
                      label: "Nome no Cartão",
                      placeholder: "JOÃO DA SILVA",
                      cols: 2,
                    },
                    {
                      k: "cardExpiry",
                      label: "Validade",
                      placeholder: "MM/AA",
                      cols: 1,
                    },
                    { k: "cardCvv", label: "CVV", placeholder: "123", cols: 1 },
                  ].map((f) => (
                    <div
                      key={f.k}
                      className={f.cols === 2 ? "sm:col-span-2" : ""}
                    >
                      <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                        {f.label}
                      </label>
                      <input
                        value={(form as any)[f.k]}
                        onChange={(e) => update(f.k, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full border border-border rounded px-3 py-2.5 text-sm bg-input-background outline-none focus:border-accent transition-colors font-[Barlow]"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                      Parcelas
                    </label>
                    <select className="w-full border border-border rounded px-3 py-2.5 text-sm bg-input-background outline-none focus:border-accent font-[Barlow]">
                      {[1, 2, 3, 6, 12].map((n) => (
                        <option key={n} value={n}>
                          {n}× de {fmt(total / n)} {n > 1 ? "sem juros" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {form.payMethod === "pix" && (
                <div className="text-center p-6 bg-secondary rounded">
                  <div className="w-32 h-32 bg-white border-4 border-primary rounded mx-auto mb-3 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-sm font-bold font-[Barlow] mb-1">
                    Pague com PIX e ganhe 5% de desconto!
                  </p>
                  <p className="text-xs text-muted-foreground font-[Barlow]">
                    O QR Code será gerado ao confirmar o pedido
                  </p>
                </div>
              )}

              {form.payMethod === "boleto" && (
                <div className="p-4 bg-secondary rounded text-center">
                  <Copy className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-bold font-[Barlow]">
                    Boleto Bancário
                  </p>
                  <p className="text-xs text-muted-foreground font-[Barlow] mt-1">
                    Vencimento em 3 dias úteis. Processamento em até 2 dias após
                    pagamento.
                  </p>
                </div>
              )}

              <div className="flex flex-col min-[420px]:flex-row gap-3 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-border py-3 rounded font-bold font-[Barlow] hover:bg-muted transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-accent text-white py-3 rounded font-bold uppercase tracking-wide font-[Barlow] hover:bg-accent/90 transition-colors"
                >
                  Revisar Pedido →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-black font-[Barlow_Condensed] uppercase mb-5">
                Revisar Pedido
              </h2>
              <div className="space-y-3 mb-5">
                <div className="bg-secondary rounded p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                    Dados pessoais
                  </p>
                  <p className="text-sm font-[Barlow]">
                    {form.name || "João da Silva"} •{" "}
                    {form.email || "joao@email.com"}
                  </p>
                </div>
                <div className="bg-secondary rounded p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                    Endereço de entrega
                  </p>
                  <p className="text-sm font-[Barlow]">
                    {form.street || "Av. Parnamirim"}, {form.number || "1234"}
                    {form.complement ? `, ${form.complement}` : ""} •{" "}
                    {form.city || "Recife"}/{form.state || "PE"}
                  </p>
                </div>
                <div className="bg-secondary rounded p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                    Forma de pagamento
                  </p>
                  <p className="text-sm font-[Barlow]">
                    {form.payMethod === "credit"
                      ? "Cartão de Crédito"
                      : form.payMethod === "pix"
                        ? "PIX (5% de desconto)"
                        : "Boleto Bancário"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col min-[420px]:flex-row gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 border border-border py-3 rounded font-bold font-[Barlow] hover:bg-muted transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
                <button
                  onClick={() => {
                    setPlaced(true);
                    onPlaceOrder();
                  }}
                  className="flex-1 bg-primary text-white py-3 rounded font-bold uppercase tracking-wide font-[Barlow] hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Confirmar Pedido
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="bg-card rounded border border-border p-4 h-fit md:sticky md:top-20 min-w-0">
          <h3 className="font-black text-sm uppercase tracking-widest mb-4 font-[Barlow]">
            Resumo
          </h3>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-2 items-start">
                <img
                  src={img(item.product.imageId, 50, 50)}
                  alt=""
                  className="w-10 h-10 object-cover rounded bg-secondary shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold leading-snug line-clamp-2 font-[Barlow]">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-[Barlow]">
                    × {item.quantity}
                  </p>
                </div>
                <p className="text-xs font-bold shrink-0 font-[Barlow]">
                  {fmt(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-1.5 text-sm font-[Barlow]">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Frete</span>
              <span
                className={frete === 0 ? "text-emerald-600 font-semibold" : ""}
              >
                {frete === 0 ? "Grátis" : fmt(frete)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base pt-1 border-t border-border">
              <span>Total</span>
              <span className="text-primary font-[Barlow_Condensed] text-xl">
                {fmt(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Login ──────────────────────────────────────────────────────────────

function LoginPage({
  onNavigate,
}: {
  onNavigate: (p: Page, opts?: NavOpts) => void;
}) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-3xl font-black font-[Barlow_Condensed] uppercase text-primary mb-2">
          Bem-vindo!
        </h2>
        <p className="text-muted-foreground font-[Barlow] mb-6">
          Login realizado com sucesso.
        </p>
        <button
          onClick={() => onNavigate("home")}
          className="bg-accent text-white px-8 py-3 rounded font-bold uppercase font-[Barlow]"
        >
          Ir para a loja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-primary rounded flex items-center justify-center mx-auto mb-3">
          <span className="text-white font-black text-2xl font-[Barlow_Condensed]">
            CF
          </span>
        </div>
        <h1 className="text-3xl font-black font-[Barlow_Condensed] uppercase text-primary">
          Minha Conta
        </h1>
        <p className="text-muted-foreground text-sm font-[Barlow]">
          Acesse sua conta ou crie uma nova
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors font-[Barlow] ${tab === t ? "border-accent text-accent" : "border-transparent text-muted-foreground"}`}
          >
            {t === "login" ? "Entrar" : "Criar Conta"}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded p-6 space-y-4">
        {tab === "login" ? (
          <>
            {[
              { label: "E-mail", placeholder: "seu@email.com", type: "email" },
              { label: "Senha", placeholder: "••••••••", type: "password" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full border border-border rounded px-3 py-2.5 text-sm bg-input-background outline-none focus:border-accent transition-colors font-[Barlow]"
                />
              </div>
            ))}
            <div className="flex justify-end">
              <button className="text-xs text-accent hover:underline font-[Barlow]">
                Esqueceu a senha?
              </button>
            </div>
            <button
              onClick={() => setDone(true)}
              className="w-full bg-accent text-white py-3 rounded font-bold uppercase tracking-wide font-[Barlow] hover:bg-accent/90 transition-colors"
            >
              Entrar
            </button>
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-[Barlow]">
                ou
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <button className="w-full border border-border py-3 rounded font-bold text-sm font-[Barlow] hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <span className="text-lg">G</span> Continuar com Google
            </button>
          </>
        ) : (
          <>
            {[
              { label: "Nome completo", placeholder: "João da Silva" },
              { label: "E-mail", placeholder: "seu@email.com" },
              { label: "CPF", placeholder: "000.000.000-00" },
              { label: "Telefone", placeholder: "(81) 99999-9999" },
              { label: "Senha", placeholder: "Mínimo 8 caracteres" },
              { label: "Confirmar senha", placeholder: "Repita a senha" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1 font-[Barlow]">
                  {f.label}
                </label>
                <input
                  placeholder={f.placeholder}
                  className="w-full border border-border rounded px-3 py-2.5 text-sm bg-input-background outline-none focus:border-accent transition-colors font-[Barlow]"
                />
              </div>
            ))}
            <label className="flex items-start gap-2 text-xs text-muted-foreground font-[Barlow] cursor-pointer">
              <input type="checkbox" className="mt-0.5 accent-accent" />
              <span>
                Li e aceito os{" "}
                <button className="text-accent hover:underline">
                  Termos de Uso
                </button>{" "}
                e a{" "}
                <button className="text-accent hover:underline">
                  Política de Privacidade
                </button>
              </span>
            </label>
            <button
              onClick={() => setDone(true)}
              className="w-full bg-accent text-white py-3 rounded font-bold uppercase tracking-wide font-[Barlow] hover:bg-accent/90 transition-colors"
            >
              Criar Conta
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page: Units ──────────────────────────────────────────────────────────────

function UnitsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black font-[Barlow_Condensed] uppercase text-primary">
          Nossas Lojas
        </h1>
        <p className="text-muted-foreground font-[Barlow] mt-1">
          {UNITS.length} unidades em Pernambuco prontas para te atender
        </p>
      </div>

      {/* Map placeholder */}
      <div className="w-full h-64 md:h-80 rounded overflow-hidden bg-secondary mb-8 relative">
        <img
          src={img("1519501025264-65ba15cf15d1", 1200, 400)}
          alt="Mapa das lojas"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary/90 text-white rounded px-6 py-4 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="font-black text-xl font-[Barlow_Condensed] uppercase">
              Mapa Interativo
            </p>
            <p className="text-sm text-white/70 font-[Barlow]">
              Integração com Google Maps disponível
            </p>
          </div>
        </div>
      </div>

      {/* Units grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {UNITS.map((u) => (
          <div
            key={u.id}
            className="bg-card border border-border rounded overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="h-2 bg-accent group-hover:bg-primary transition-colors" />
            <div className="p-5">
              <h3 className="font-black text-base font-[Barlow_Condensed] uppercase text-primary leading-tight mb-3">
                {u.name}
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-sm font-[Barlow] text-foreground">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p>{u.address}</p>
                    <p className="text-muted-foreground">{u.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-[Barlow]">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <a
                    href={`tel:${u.phone.replace(/\D/g, "")}`}
                    className="hover:text-accent transition-colors"
                  >
                    {u.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm font-[Barlow] text-muted-foreground">
                  <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed">{u.hours}</p>
                </div>
              </div>
              <button className="mt-4 w-full border border-accent text-accent py-2 rounded text-xs font-bold uppercase tracking-wide font-[Barlow] hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Como chegar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-10 bg-primary rounded p-8 text-center text-primary-foreground">
        <h2 className="text-3xl font-black font-[Barlow_Condensed] uppercase mb-2">
          Precisa de Ajuda?
        </h2>
        <p className="text-primary-foreground/70 font-[Barlow] mb-5 max-w-lg mx-auto">
          Nossa equipe de especialistas está pronta para te auxiliar com
          projetos de obra e reforma.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="tel:08007770001"
            className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded font-bold font-[Barlow] hover:bg-accent/90 transition-colors"
          >
            <Phone className="w-4 h-4" /> 0800 777 0001
          </a>
          <button className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded font-bold font-[Barlow] hover:bg-white/10 transition-colors">
            <User className="w-4 h-4" /> Falar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [categoryId, setCategoryId] = useState("basicos");
  const [productId, setProductId] = useState("p1");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = (p: Page, opts?: NavOpts) => {
    setPage(p);
    setCartOpen(false);
    if (opts?.categoryId !== undefined) setCategoryId(opts.categoryId);
    if (opts?.productId !== undefined) setProductId(opts.productId);
    if (opts?.query !== undefined) setSearchQuery(opts.query);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setPage("search");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const addToCart = (id: string, qty = 1) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === id);
      if (existing)
        return prev.map((i) =>
          i.product.id === id ? { ...i, quantity: i.quantity + qty } : i,
        );
      return [...prev, { product, quantity: qty }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (id: string, qty: number) => {
    if (qty <= 0) setCart((prev) => prev.filter((i) => i.product.id !== id));
    else
      setCart((prev) =>
        prev.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i)),
      );
  };

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-background flex flex-col font-[Barlow]">
      <Header
        cartCount={cartCount}
        favCount={favorites.size}
        onNavigate={navigate}
        onOpenCart={() => setCartOpen(true)}
        onSearch={handleSearch}
        currentPage={page}
      />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateCartQty}
          onRemove={(id) =>
            setCart((prev) => prev.filter((i) => i.product.id !== id))
          }
          onNavigate={navigate}
        />
      )}

      <main className="flex-1 w-full min-w-0 overflow-x-hidden">
        {page === "home" && (
          <HomePage
            onNavigate={navigate}
            onAddToCart={addToCart}
            favorites={favorites}
            onToggleFav={toggleFav}
          />
        )}
        {page === "category" && (
          <CategoryPage
            categoryId={categoryId}
            isSearch={false}
            query=""
            onNavigate={navigate}
            onAddToCart={addToCart}
            favorites={favorites}
            onToggleFav={toggleFav}
          />
        )}
        {page === "search" && (
          <CategoryPage
            categoryId={categoryId}
            isSearch={true}
            query={searchQuery}
            onNavigate={navigate}
            onAddToCart={addToCart}
            favorites={favorites}
            onToggleFav={toggleFav}
          />
        )}
        {page === "product" && (
          <ProductPage
            productId={productId}
            onNavigate={navigate}
            onAddToCart={addToCart}
            isFav={favorites.has(productId)}
            onToggleFav={toggleFav}
            cart={cart}
            favorites={favorites}
          />
        )}
        {page === "checkout" && (
          <CheckoutPage
            cart={cart}
            onNavigate={navigate}
            onPlaceOrder={() => setCart([])}
          />
        )}
        {page === "login" && <LoginPage onNavigate={navigate} />}
        {page === "units" && <UnitsPage />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
