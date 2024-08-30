import { SigninDto } from "@/core/domain/models/signin.dto";
import { Signin } from "@/core/domain/usecases/signin";
import { SigninController } from "@/core/interfaces/controllers/signin-controller";
import { serverError } from "@/core/interfaces/helpers/http-helpers";

interface SutTypes {
  sut: SigninController;
  signinStub: Signin;
}

const makeSignin = (): Signin => {
  class SigninStub implements Signin {
    async auth(
      signin: SigninDto,
    ): Promise<{ name: string; token: string } | null> {
      return {
        name: "any_name",
        token: "any_token",
      };
    }
  }

  return new SigninStub();
};
const makeSut = (): SutTypes => {
  const signinStub = makeSignin();
  const sut = new SigninController(signinStub);

  return {
    sut,
    signinStub,
  };
};

describe("SignInController", () => {
  it("Should return 400 with no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: any = {
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

  it("Should return 401 with invalid credentials", async () => {
    const { sut, signinStub } = makeSut();
    const httpRequest: any = {
      email: "any_email@email.com",
      password: "any_password",
    };

    jest.spyOn(signinStub, "auth").mockResolvedValue(null);
    const httpResponse = await sut.perform(httpRequest);

    const expected = {
      statusCode: 401,
      body: {
        success: false,
        errors: ["Invalid credentials"],
      },
    };

    expect(httpResponse.statusCode).toBe(expected.statusCode);
    expect(httpResponse.body).toEqual(expected.body);
  });

  it("Should return 500 if an error occurs", async () => {
    const { sut, signinStub } = makeSut();
    const httpRequest: any = {
      email: "any_email@email.com",
      name: "any_name",
      password: "any_password",
    };

    jest.spyOn(signinStub, "auth").mockImplementation(() => {
      throw new Error();
    });
    const httpResponse = await sut.perform(httpRequest);

    const expected = serverError(new Error());

    expect(httpResponse.statusCode).toBe(expected.statusCode);
    expect(httpResponse.body).toEqual(expected.body);
  });
});
