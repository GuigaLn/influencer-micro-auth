import { SigninDto } from "../models/signin.dto";

export abstract class Signin {
  abstract auth(
    signin: SigninDto,
  ): Promise<{ id: string; name: string; token: string } | null>;
}
