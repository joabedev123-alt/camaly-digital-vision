import { motion } from "framer-motion";
import { Globe, Layers, ShoppingBag, Monitor, Palette, Search, Fingerprint, LayoutGrid } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  { icon: Globe, title: "Sites institucionais", desc: "Presença digital sólida com design que transmite autoridade." },
  { icon: Layers, title: "Landing pages", desc: "Páginas de alta conversão com foco em resultado." },
  { icon: ShoppingBag, title: "E-commerces", desc: "Lojas digitais premium com experiência de compra fluida." },
  { icon: Monitor, title: "Sistemas web", desc: "Plataformas sob medida para gestão e operação." },
  { icon: Palette, title: "UI/UX design", desc: "Interfaces pensadas para usabilidade e impacto visual." },
  { icon: Search, title: "SEO estratégico", desc: "Posicionamento orgânico com estratégia de longo prazo." },
  { icon: Fingerprint, title: "Identidade digital", desc: "Construção de marca visual para o ambiente online." },
  { icon: LayoutGrid, title: "Estruturação visual", desc: "Organização e hierarquia visual para comunicar melhor." },
];

export const ServicesGrid = () => {
  return (
    <section id="servicos" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-display uppercase tracking-[0.2em] text-primary mb-4">
            Serviços
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground">
            O que criamos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              className="group relative p-6 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500" />
              
              <div className="relative z-10">
                <service.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="font-display font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
