import { trackCanonical } from "@/lib/analytics";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export const trackEvent = {
  lead: (source: string) => {
    if (typeof window !== "undefined") {
      if (window.fbq) window.fbq("track", "Lead", { content_name: source });
      if (window.dataLayer) window.dataLayer.push({ event: "lead_captured", lead_source: source });
    }
  },

  /**
   * Booking intent. Emits the canonical `ai_call_click` and nothing else.
   *
   * It used to push `schedule_click` and a Meta "Schedule" standard event. Both
   * are gone rather than kept alongside: emitting two names for one interaction
   * is how the same click gets counted twice the moment somebody wires a GTM
   * trigger to the old name. Nothing external depended on `schedule_click`,
   * because GTM was never forwarding it to GA4 or Meta in the first place,
   * which is what made it safe to rename rather than dual-emit.
   */
  schedule: (location: string) => {
    trackCanonical("ai_call_click", { location }, { once: location });
  },

  quizComplete: (score: number, resultType: string) => {
    if (typeof window !== "undefined") {
      if (window.fbq) window.fbq("track", "CompleteRegistration", { content_name: "Quiz", value: score });
      if (window.dataLayer) window.dataLayer.push({ event: "quiz_complete", score, result_type: resultType });
    }
  },

  formSubmit: (formName: string) => {
    if (typeof window !== "undefined") {
      if (window.fbq) window.fbq("track", "Lead", { content_name: formName });
      if (window.dataLayer) window.dataLayer.push({ event: "form_submit", form_name: formName });
    }
  },

  buttonClick: (buttonName: string, location: string) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "button_click", button_name: buttonName, button_location: location });
    }
  },
};
