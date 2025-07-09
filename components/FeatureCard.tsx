"use client";

import React from "react";
import { Brain, Target, Zap } from "lucide-react";
import { Feature } from "@/types/homePageTypes";

interface FeatureCardProps {
  feature: Feature;
}

const iconMap = {
  Brain: Brain,
  Target: Target,
  Zap: Zap,
};

export function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon];

  return (
    <>
      <div className="card text-center p-6">
        <div
          className={`${feature.iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <IconComponent className={`h-8 w-8 ${feature.iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </>
  );
}
