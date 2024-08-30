import { ValidationField } from "@/core/validators/protocols/validation-field";
import { Controller } from "../protocols/controller";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "../helpers/http-helpers";
import { Signin } from "@/core/domain/usecases/signin";

interface Input {
  email: string;
  password: string;
}

const fieldsParam: ValidationField[] = [
  {
    fieldName: "email",
    type: "EMAIL",
  },
  {
    fieldName: "password",
    type: "STRING",
  },
];

export class SigninController extends Controller<Input> {
  constructor(private readonly signin: Signin) {
    super(fieldsParam);
  }

  async perform(input: Input) {
    try {
      const errors = this.validate(input);
      if (errors.length) {
        return badRequest(errors);
      }

      const { email, password } = input;
      const auth = await this.signin.auth({ email, password });
      if (!auth) {
        return unauthorized(["Invalid credentials"]);
      }

      return ok(auth);
    } catch (error) {
      return serverError(error);
    }
  }
}
