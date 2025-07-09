"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-6 leading-tight">
        Smart Skill Profiler
      </h1>
      <p className="text-2xl mb-4">
        Know Your Strengths, Unlock New Opportunities
      </p>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        A modern AI-powered web application that analyzes your skill profile and
        suggests new areas to explore. Discover your potential and chart your
        professional growth path.
      </p>

      <Link href="/skill-check">
        <Button
          size="lg"
          className="btn btn-primary px-8 py-4 text-lg rounded-full"
        >
          Start Your Skill Check
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
