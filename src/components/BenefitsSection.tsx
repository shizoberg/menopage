import { Flame, Moon, Battery } from "lucide-react";

const benefits = [
  {
    icon: Flame,
    title: "Sıcak Basması",
    desc: "Ani ısınma ve terlemeyi azaltır",
  },
  {
    icon: Moon,
    title: "Rahat Uyku",
    desc: "Gece uyanmalarını dengeler",
  },
  {
    icon: Battery,
    title: "Enerji",
    desc: "Gün boyu canlı hissettirir",
  },
];

const BenefitsSection = () => (
  <section className="py-12 bg-card">
    <div className="container">
      <h2 className="mp-reveal text-center text-[26px] sm:text-[30px] font-bold text-foreground mb-8">
        Size Nasıl Yardımcı Olur?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-[860px] mx-auto">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className={`mp-reveal ${i > 0 ? `mp-reveal-d${i}` : ""} bg-secondary/40 border border-primary/10 rounded-2xl p-6 text-center`}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-[20px] font-bold text-foreground mb-1.5">{b.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-snug">{b.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
