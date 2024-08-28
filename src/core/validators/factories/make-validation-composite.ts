import { ValidationComposite } from "../validation-composite";
import { ValidationManual } from "../validation-manual";

export const makeValidationComposite = new ValidationComposite(
  new ValidationManual(),
);
