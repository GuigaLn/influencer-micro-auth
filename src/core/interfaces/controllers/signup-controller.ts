import { ValidationField } from "@/core/validators/protocols/validation-field";
import { Controller } from "../protocols/controller";
import { badRequest, conflict, ok, serverError } from "../helpers/http-helpers";
import { AddAccount } from "@/core/domain/usecases/add-account";

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
  constructor(private readonly addAccount: AddAccount) {
    super(fieldsParam);
  }

  async perform(input: Input) {
    try {
      const errors = this.validate(input);
      if (errors.length) {
        return badRequest(errors);
      }

      const { email, name, password } = input;
      const isValid = await this.addAccount.add({ email, name, password });
      if (!isValid) {
        return conflict(["Email in use"]);
      }

      return ok({ message: "Success" });
    } catch (error) {
      return serverError(error);
    }
  }
}
