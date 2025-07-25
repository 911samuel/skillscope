"use client";

import React from "react";

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

export function HowItWorksStep({
  number,
  title,
  description,
}: HowItWorksStepProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="btn-primary w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
