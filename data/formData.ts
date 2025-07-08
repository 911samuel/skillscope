export const formFields = {
  name: {
    label: "Full Name *",
    placeholder: "Enter your full name",
    errorRequired: "Name is required",
  },
  email: {
    label: "Email Address *",
    placeholder: "Enter your email address",
    errorRequired: "Email is required",
    errorInvalid: "Please enter a valid email address",
  },
  primarySkill: {
    label: "Primary Skill *",
    placeholder: "e.g., JavaScript, Data Analysis, Project Management",
    errorRequired: "Primary skill is required",
  },
  experience: {
    label: "Experience Description *",
    placeholder: "Briefly describe your experience with this skill (max 300 characters)",
    errorRequired: "Experience description is required",
    errorMaxLength: "Experience description must be 300 characters or less",
    maxLength: 300,
  },
}
