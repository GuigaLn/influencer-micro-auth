import { ValidationField } from "@/core/validators/protocols/validation-field";
import { Controller } from "../protocols/controller";
import { badRequest, ok, serverError } from "../helpers/http-helpers";

interface Input {
  name: string;
  email: string;
  password: string;
}

const fieldsParam: ValidationField[] = [
  {
    fieldName: "email",
    type: "EMAIL",
  },
  {
    fieldName: "name",
    type: "STRING",
  },
  {
    fieldName: "password",
    type: "STRING",
  },
];

export class SignupController extends Controller<Input> {
  constructor() {
    super(fieldsParam);
  }

  async perform(input: Input) {
    try {
      const errors = this.validate(input);
      if (errors.length) {
        return badRequest(errors);
      }

      return ok({ message: "Success" });
    } catch (error) {
      return serverError(error);
    }
  }
}
