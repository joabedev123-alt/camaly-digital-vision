import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { WhatsAppIconFlat } from "./WhatsAppIcon";

const menuItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 md:h-28 px-4 md:px-12 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "glass"
            : "bg-transparent"
        }`}
      >
        <a href="#inicio" className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground">
          Camaly<span className="text-primary">.</span>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-lg text-muted-foreground hover:text-foreground transition-colors duration-300 group font-medium"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-display text-base font-semibold glow-primary hover:scale-105 transition-transform duration-200"
          >
            <WhatsAppIconFlat size={22} className="text-primary-foreground" />
            WhatsApp
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground"
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 pt-20 glass"
          >
            <nav className="flex flex-col items-center gap-6 pt-12">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease }}
                  className="text-xl font-display text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2.5 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold glow-primary"
              >
                <WhatsAppIconFlat size={22} className="text-primary-foreground" />
                WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
