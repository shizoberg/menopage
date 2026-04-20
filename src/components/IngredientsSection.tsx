import { Leaf, ShieldCheck, Heart } from "lucide-react";

const items = [
  { icon: Leaf, name: "Soya İzoflavonu", desc: "Hormonal denge desteği" },
  { icon: Heart, name: "Magnezyum", desc: "Kas gevşemesi ve uyku" },
  { icon: ShieldCheck, name: "B Vitaminleri", desc: "Enerji ve sinir desteği" },
];

const IngredientsSection = () => (
  <section className="py-12">
    <div className="container">
      <h2 className="mp-reveal text-center text-[26px] sm:text-[30px] font-bold text-foreground mb-2">
        İçeriğinde Ne Var?
      </h2>
      <p className="mp-reveal mp-reveal-d1 text-center text-[16px] text-muted-foreground mb-8">
        Sade, doğal, klinik dozda
      </p>
      <div className="space-y-3 max-w-[640px] mx-auto">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <div
              key={it.name}
              className={`mp-reveal ${i > 0 ? `mp-reveal-d${i}` : ""} flex items-center gap-4 bg-card border border-primary/10 rounded-2xl p-5 shadow-sm`}
            >
              <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-primary-soft flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <div className="text-[19px] font-bold text-foreground leading-tight">{it.name}</div>
                <div className="text-[15px] text-muted-foreground leading-snug mt-0.5">{it.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default IngredientsSection;
