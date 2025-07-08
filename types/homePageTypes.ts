export interface Feature {
  id: number
  title: string
  description: string
  icon: "Brain" | "Target" | "Zap"
  iconColor: string
  iconBgColor: string
}

export interface HowItWorksStep {
  id: number
  title: string
  description: string
}
