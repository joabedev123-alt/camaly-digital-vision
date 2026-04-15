import { motion } from "framer-motion";
import { MessageCircle, Instagram, Mail } from "lucide-react";

const menuLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-[hsl(205,40%,4%)]">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <a href="#inicio" className="flex items-center">
              <img
                src="/Logo frente 03-Photoroom.png"
                alt="Camaly Digital"
                className="h-16 w-auto object-contain"
              />
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Estratégia, design e tecnologia para marcas que querem presença digital
              de alto impacto.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">Navegação</h4>
            <nav className="flex flex-col gap-2">
              {menuLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">Contato</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/camalydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @camalydigital
              </a>
              <a
                href="mailto:contato@camaly.com.br"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                contato@camaly.com.br
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/10 text-center flex flex-col items-center gap-4">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Camaly Digital. Todos os direitos reservados.
          </div>
          <a 
            href="https://camaly.com.br/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Produzida com 
            <motion.span
              animate={{ color: ["#10b981", "#3b82f6", "#f97316", "#10b981"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-lg leading-none filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
            >
              ❤
            </motion.span> 
            por{" "}
            <span className="text-foreground font-black tracking-wider group-hover:text-primary transition-colors">
              CAMALY
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
