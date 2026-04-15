import { motion } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_4px_24px_hsla(142,70%,45%,0.5)] hover:scale-110 transition-transform duration-200"
      aria-label="Contato via WhatsApp"
    >
      {/* Ícone original com fundo verde #25D366 */}
      <WhatsAppIcon size={64} />
    </motion.a>
  );
};
