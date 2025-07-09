"use client";

import React from "react";
import { Brain } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="container mx-auto px-4 py-6 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground dark:text-foreground">
            SkillScope
          </span>
        </div>
        <nav className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-black">
                Features
              </a>
              <a href="#how-it-works" className="text-black">
                How it Works
              </a>
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
