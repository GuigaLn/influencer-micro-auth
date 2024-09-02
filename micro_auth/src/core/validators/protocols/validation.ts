import { ValidationField } from "./validation-field";

export abstract class Validation {
  abstract isString(value: string, field: ValidationField): boolean;
  abstract isEmail(value: string, field: ValidationField): boolean;
}
