import { AddAccountDto } from "@/core/domain/models/add-account.dto";
import { AddAccount } from "@/core/domain/usecases/add-account";
import { SignupController } from "@/core/interfaces/controllers/signup-controller";
import { serverError } from "@/core/interfaces/helpers/http-helpers";

interface SutTypes {
  sut: SignupController;
  addAccountStub: AddAccount;
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountDto): Promise<boolean> {
      return true;
    }
  }

  return new AddAccountStub();
};

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount();
  const sut = new SignupController(addAccountStub);

  return {
    sut,
    addAccountStub,
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
        success: false,
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

  it("Should return 409 with email in use", async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest: any = {
      email: "any_email@email.com",
      name: "any_name",
      password: "any_password",
    };

    jest.spyOn(addAccountStub, "add").mockResolvedValue(false);
    const httpResponse = await sut.perform(httpRequest);

    const expected = {
      statusCode: 409,
      body: {
        success: false,
        errors: ["Email in use"],
      },
    };

    expect(httpResponse.statusCode).toBe(expected.statusCode);
    expect(httpResponse.body).toEqual(expected.body);
  });

  it("Should return 500 if an error occurs", async () => {
    const { sut, addAccountStub } = makeSut();
    const httpRequest: any = {
      email: "any_email@email.com",
      name: "any_name",
      password: "any_password",
    };

    jest.spyOn(addAccountStub, "add").mockImplementation(() => {
      throw new Error();
    });
    const httpResponse = await sut.perform(httpRequest);

    const expected = serverError(new Error());

    expect(httpResponse.statusCode).toBe(expected.statusCode);
    expect(httpResponse.body).toEqual(expected.body);
  });
});
