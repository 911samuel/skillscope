export interface SkillProfileResult {
  analysis: {
    summary: string
    strengths: string[]
    areasForImprovement: string[]
    recommendedLearningPaths: string[]
    careerAdvice: string
  }
  timestamp: string
  user: {
    name: string
    email: string
    primarySkill: string
  }
}
