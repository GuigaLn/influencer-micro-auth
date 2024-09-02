import { Validation } from "./protocols/validation";
import { ValidationField } from "./protocols/validation-field";

export class ValidationManual implements Validation {
  isString(value: string, field: ValidationField): boolean {
    if (field.options?.required && !value) return false;
    if (typeof value !== "string") return false;
    return true;
  }

  isEmail(value: string, field: ValidationField): boolean {
    if (field.options?.required && !value) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== "string" || !emailRegex.test(value)) return false;
    return true;
  }
}
