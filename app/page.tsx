import React from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { FeatureCard } from "../components/FeatureCard";
import { HowItWorksStep } from "../components/HowItWorksStep";
import { Footer } from "../components/Footer";
import { features, howItWorksSteps } from "../data/homePageData";

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
    >
      <Header />

      <main className="min-h-screen">
        <HeroSection />

        {/* Features Preview */}
        <div
          id="features"
          className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* How it Works */}
        <div id="how-it-works" className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorksSteps.map((step) => (
              <HowItWorksStep
                key={step.id}
                number={step.id}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
