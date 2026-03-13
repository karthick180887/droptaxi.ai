"use client";
import { Phone, Send } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div className="floating-cta">
      <a
        href="https://t.me/droptaxiaibot"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-whatsapp"
        aria-label="Chat on Telegram"
      >
        <Send size={24} />
      </a>
      <a
        href="tel:+919994940558"
        className="cta-call"
        aria-label="Call us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
