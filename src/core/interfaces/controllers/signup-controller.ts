interface Input {
  name: string;
  email: string;
  password: string;
}

export class SignupController {
  perform(input: Input) {
    return {
      statusCode: 200,
      body: {
        message: "Success",
      },
    };
  }
}
