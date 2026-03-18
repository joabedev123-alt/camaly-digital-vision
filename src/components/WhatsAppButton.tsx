import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center glow-primary hover:scale-110 transition-transform duration-200"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
};
