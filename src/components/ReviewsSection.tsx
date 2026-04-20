import { Quote } from "lucide-react";

const reviews = [
  {
    initials: "AY",
    name: "Ayşe Hanım",
    age: "54 yaşında",
    text: "Sıcak basmaları ve uyku problemim çok azaldı. Eczacımın önerisiyle başladım, çok memnunum.",
  },
  {
    initials: "FE",
    name: "Fatma Hanım",
    age: "58 yaşında",
    text: "Doğal içerikli olması beni rahatlattı. Doktorum da kullanmamı uygun gördü. Enerjim yerine geldi.",
  },
];

const ReviewsSection = () => (
  <section className="py-12">
    <div className="container">
      <h2 className="mp-reveal text-center text-[26px] sm:text-[30px] font-bold text-foreground mb-2">
        Kullananlar Ne Diyor?
      </h2>
      <p className="mp-reveal mp-reveal-d1 text-center text-[16px] text-muted-foreground mb-8">
        Gerçek kullanıcı deneyimleri
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[860px] mx-auto">
        {reviews.map((r, i) => (
          <div
            key={r.initials}
            className={`mp-reveal ${i > 0 ? `mp-reveal-d${i}` : ""} bg-card border border-primary/10 rounded-2xl p-6 shadow-sm`}
          >
            <Quote className="w-7 h-7 text-primary/30 mb-3" />
            <p className="text-[17px] text-foreground leading-relaxed mb-5 font-medium">
              "{r.text}"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border/60">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[15px] font-bold">
                {r.initials}
              </div>
              <div>
                <div className="text-[16px] font-bold text-foreground">{r.name}</div>
                <div className="text-[14px] text-muted-foreground">{r.age}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
