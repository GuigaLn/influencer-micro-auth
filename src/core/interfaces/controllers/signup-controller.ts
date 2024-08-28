import { ValidationField } from "@/core/validators/protocols/validation-field";
import { Controller } from "../protocols/controller";

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
    const errors = this.validate(input);
    if (errors.length) {
      return {
        statusCode: 400,
        body: {
          errors,
        },
      };
    }
    return {
      statusCode: 200,
      body: {
        message: "Success",
      },
    };
  }
}
