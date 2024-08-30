import { SigninController } from "@/core/interfaces/controllers/signin-controller";

interface SutTypes {
  sut: SigninController;
}

const makeSut = (): SutTypes => {
  const sut = new SigninController();

  return {
    sut,
  };
};

describe("SignInController", () => {
  it("Should return 400 with no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: any = {
      name: "any_name",
      password: "any_password",
    };

    const httpResponse = await sut.perform(httpRequest);

    const expected = {
      statusCode: 400,
      body: {
        success: false,
        errors: ["email is not a valid email"],
      },
    };

    expect(httpResponse.statusCode).toBe(expected.statusCode);
    expect(httpResponse.body).toEqual(expected.body);
  });

  it("Should return 400 with no passowrd is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: any = {
      email: "any_email@email.com",
      name: "any_name",
    };

    const httpResponse = await sut.perform(httpRequest);

    const expected = {
      statusCode: 400,
      body: {
        success: false,
        errors: ["password is not a valid string"],
      },
    };

    expect(httpResponse.statusCode).toBe(expected.statusCode);
    expect(httpResponse.body).toEqual(expected.body);
  });
});
