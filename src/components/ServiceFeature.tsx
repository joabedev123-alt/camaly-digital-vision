import { motion } from "framer-motion";
import { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface ServiceFeatureProps {
  tag: string;
  title: string;
  description: string;
  image: string;
  reversed?: boolean;
  children?: ReactNode;
}

export const ServiceFeature = ({
  tag,
  title,
  description,
  image,
  reversed = false,
}: ServiceFeatureProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className={`container mx-auto px-6 md:px-12 flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-20`}>
        {/* Text */}
        <div className="flex-1 max-w-lg">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="inline-block text-xs font-display uppercase tracking-[0.2em] text-primary mb-4"
          >
            {tag}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-foreground"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mt-6 text-muted-foreground leading-relaxed text-lg"
          >
            {description}
          </motion.p>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: reversed ? -40 : 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Glow behind */}
          <div className="absolute -inset-4 bg-primary/5 blur-[60px] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
};
