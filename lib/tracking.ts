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

  schedule: (location: string) => {
    if (typeof window !== "undefined") {
      if (window.fbq) window.fbq("track", "Schedule", { content_name: location });
      if (window.dataLayer) window.dataLayer.push({ event: "schedule_click", location });
    }
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
