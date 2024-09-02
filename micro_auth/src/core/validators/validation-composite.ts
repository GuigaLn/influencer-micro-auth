import { Validation } from "./protocols/validation";
import { ValidationField } from "./protocols/validation-field";

export class ValidationComposite {
  private validation: Validation;

  constructor(validation: Validation) {
    this.validation = validation;
  }

  validade(input: Record<string, any>, fields: ValidationField[]) {
    const errors: string[] = [];
    for (const field of fields) {
      const { type, fieldName } = field;
      const value = input[fieldName];
      switch (type) {
        case "STRING":
          if (!this.validation.isString(value, field))
            errors.push(`${field.fieldName} is not a valid string`);
          break;
        case "EMAIL":
          if (!this.validation.isEmail(value, field))
            errors.push(`${field.fieldName} is not a valid email`);
          break;
      }
    }

    return errors;
  }
}
