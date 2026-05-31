"use client";

import { useState, useEffect } from "react";

const proofMessages = [
  { name: "Marcus", city: "New York", action: "booked a strategy call", time: "2 hours ago" },
  { name: "Angela", city: "Miami", action: "started an AI automation project", time: "4 hours ago" },
  { name: "David", city: "Los Angeles", action: "booked a strategy call", time: "6 hours ago" },
  { name: "Priya", city: "San Francisco", action: "took the business assessment", time: "8 hours ago" },
  { name: "Jordan", city: "Atlanta", action: "booked a strategy call", time: "12 hours ago" },
  { name: "Chris", city: "Austin", action: "applied for partnership", time: "1 day ago" },
  { name: "Sarah", city: "Chicago", action: "booked a strategy call", time: "1 day ago" },
  { name: "Michael", city: "Dallas", action: "started a revenue systems build", time: "2 days ago" },
];

export function SocialProofToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Show first toast after 8 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => setIsVisible(false), 4000);
    }, 8000);

    // Show subsequent toasts every 25-40 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofMessages.length);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const message = proofMessages[currentIndex];

  return (
    <div
      className={`fixed bottom-20 left-4 z-[997] max-w-xs transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : "opacity-0 translate-y-4 -translate-x-4"
      }`}
    >
      <div className="bg-background border border-foreground/10 px-4 py-3 shadow-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-display shrink-0">
          {message.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-foreground">
            <span className="font-medium">{message.name}</span> from {message.city}
          </p>
          <p className="text-[10px] text-muted-foreground">{message.action} · {message.time}</p>
        </div>
      </div>
    </div>
  );
}
