// src/components/invest/InvestmentApp.tsx
"use client";

import { useState } from "react";
import CommandCenterFrame from "./CommandCenterFrame";
import NextActionHero from "./NextActionHero";
import SectionGrid from "./SectionGrid";

export default function InvestmentApp() {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setExpandedKey((current) => (current === key ? null : key));
  };

  return (
    <CommandCenterFrame>
      <NextActionHero />
      <SectionGrid expandedKey={expandedKey} onToggle={handleToggle} />
    </CommandCenterFrame>
  );
}
