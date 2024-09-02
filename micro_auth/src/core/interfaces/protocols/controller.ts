import { Response } from "./http";
import { makeValidationComposite } from "@/core/validators/factories/make-validation-composite";
import { ValidationField } from "@/core/validators/protocols/validation-field";

export abstract class Controller<T> {
  constructor(private readonly validationField: ValidationField[]) {}

  abstract perform(input: T): Promise<Response>;

  validate(input: T) {
    return makeValidationComposite.validade(
      input as Record<string, any>,
      this.validationField,
    );
  }
}
