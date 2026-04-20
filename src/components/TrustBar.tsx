import { ShieldCheck } from "lucide-react";

const TrustBar = () => (
  <div className="bg-primary text-primary-foreground py-3.5 px-4 text-center">
    <div className="container flex items-center justify-center gap-2.5 flex-wrap">
      <ShieldCheck className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
      <span className="text-[15px] sm:text-base font-bold tracking-wide">
        Doktor ve Eczacı Onaylı Formül
      </span>
    </div>
  </div>
);

export default TrustBar;
