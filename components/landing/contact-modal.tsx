"use client";

import { useEffect } from "react";
import { X, Phone, MessageSquare, Mail } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-background border border-foreground/20 p-8 sm:p-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">
              Get in Touch
            </span>
            <h3 className="font-display text-2xl sm:text-3xl tracking-tight">
              How would you like to connect?
            </h3>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            <a 
              href="tel:+15106809100"
              className="group flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-foreground/10 group-hover:border-foreground/30 transition-colors">
                <Phone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-medium">Call Business</span>
                <span className="block text-xs text-muted-foreground">Direct line for consultations</span>
              </div>
            </a>

            <a 
              href="tel:+15106934083"
              className="group flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-foreground/10 group-hover:border-foreground/30 transition-colors">
                <Phone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-medium">Call Personal</span>
                <span className="block text-xs text-muted-foreground">For urgent matters</span>
              </div>
            </a>

            <a 
              href="sms:+15106934083"
              className="group flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-foreground/10 group-hover:border-foreground/30 transition-colors">
                <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-medium">Send a Text</span>
                <span className="block text-xs text-muted-foreground">Quick questions welcome</span>
              </div>
            </a>

            <a 
              href="mailto:jothamjhall@gmail.com"
              className="group flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-foreground/10 group-hover:border-foreground/30 transition-colors">
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-medium">Send an Email</span>
                <span className="block text-xs text-muted-foreground">Detailed inquiries</span>
              </div>
            </a>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
            Response within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
