import { FormData, FormErrors } from "../types/types";
import { formFields } from "../data/formData";

export function validateForm(formData: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = formFields.name.errorRequired;
  }

  if (!formData.email.trim()) {
    errors.email = formFields.email.errorRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = formFields.email.errorInvalid;
  }

  if (!formData.primarySkill.trim()) {
    errors.primarySkill = formFields.primarySkill.errorRequired;
  }

  if (!formData.experience.trim()) {
    errors.experience = formFields.experience.errorRequired;
  } else if (formData.experience.length > formFields.experience.maxLength) {
    errors.experience = formFields.experience.errorMaxLength;
  }

  return errors;
}
