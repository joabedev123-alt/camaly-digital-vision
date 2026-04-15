/**
 * Ícone oficial do WhatsApp em SVG.
 * Baseado no logotipo original: fundo verde + telefone branco dentro da bolha de chat.
 */
interface WhatsAppIconProps {
  /** Tamanho em px (width = height). Default: 24 */
  size?: number;
  className?: string;
}

export const WhatsAppIcon = ({ size = 24, className = "" }: WhatsAppIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {/* Fundo verde oficial #25D366 */}
    <circle cx="24" cy="24" r="24" fill="#25D366" />
    {/* Ícone branco do telefone/chat */}
    <path
      fill="#fff"
      d="M24.1 11C17 11 11.1 16.9 11.1 24c0 2.3.6 4.5 1.8 6.5L11 37l6.7-1.8c1.9 1 4 1.6 6.3 1.6h.1c7.1 0 12.9-5.8 12.9-12.9S31.2 11 24.1 11zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 1 1-3.9-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.8 0-5.9 4.8-10.7 10.7-10.7s10.7 4.8 10.7 10.7-4.7 10.8-10.4 10.8zm5.9-7.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1s0-.5.2-.7l.5-.6c.2-.2.2-.4.4-.6.1-.2 0-.5-.1-.7s-.7-1.7-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4S16.8 20 16.8 21.6c0 1.7 1.2 3.3 1.4 3.5s2.4 3.7 5.9 5.1c.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.6s-.3-.3-.6-.4z"
    />
  </svg>
);

/**
 * Variante "flat" (só o path, sem círculo de fundo).
 * Útil para botões que já têm fundo colorido.
 */
export const WhatsAppIconFlat = ({ size = 24, className = "" }: WhatsAppIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M24.1 0C10.8 0 0 10.8 0 24.1c0 4.2 1.1 8.2 3.1 11.7L0 48l12.5-3.3c3.3 1.8 7.1 2.8 11.1 2.8h.1C37.3 47.5 48 36.7 48 23.9 48 10.7 37.3 0 24.1 0zm0 43.4c-3.6 0-7.1-1-10.2-2.8l-.7-.4-7.3 1.9 1.9-7.1-.5-.7c-2-3.2-3.1-6.8-3.1-10.6 0-10.8 8.8-19.6 19.6-19.6s19.6 8.8 19.6 19.6-8.6 19.7-19.3 19.7zm10.8-14.5c-.6-.3-3.3-1.6-3.8-1.8s-.9-.3-1.3.3-1.5 1.8-1.8 2.2-.7.4-1.3.1c-.6-.3-2.4-.9-4.6-2.9-1.7-1.5-2.8-3.4-3.1-3.9s0-.9.4-1.2l.9-1.1c.3-.4.4-.7.6-1.1.2-.4.1-.8-.1-1.2s-1.3-3.1-1.8-4.3c-.4-1.1-.9-.9-1.3-.9h-1.1c-.4 0-1 .1-1.6.8S12 19 12 21.6c0 3.1 2.3 6.1 2.6 6.5s4.5 6.8 10.8 9.4c1.5.7 2.7 1.1 3.6 1.3 1.5.5 2.9.4 4 .3 1.2-.2 3.8-1.6 4.4-3.1.5-1.5.5-2.8.4-3.1-.2-.2-.6-.4-1.2-.7z"
    />
  </svg>
);
