import { AddAccountData } from "@/core/data/usecases/add-account-data";
import { SignupController } from "@/core/interfaces/controllers/signup-controller";

interface SutTypes {
  sut: SignupController;
}

const makeSut = (): SutTypes => {
  const makeAddAccountData = new AddAccountData();
  const sut = new SignupController(makeAddAccountData);

  return {
    sut,
  };
};

describe("SignUpController", () => {
  it("Should return 400 with no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: any = {
      email: "any_email@email.com",
      password: "any_password",
    };

    const httpResponse = await sut.perform(httpRequest);

    const expected = {
      statusCode: 400,
      body: {
        errors: ["name is not a valid string"],
      },
    };

    expect(httpResponse.statusCode).toBe(expected.statusCode);
    expect(httpResponse.body).toEqual(expected.body);
  });

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
        errors: ["password is not a valid string"],
      },
    };

    expect(httpResponse.statusCode).toBe(expected.statusCode);
    expect(httpResponse.body).toEqual(expected.body);
  });
});
