import express from "express";
import { SignupController } from "@/core/interfaces/controllers/signup-controller";
import { AddAccountData } from "@/core/data/usecases/add-account-data";
import { AccountRepositorySqlite } from "@/core/infra/db/sqlite/repositories/account-repository-sqlite";
import { BcryptEncrypter } from "@/core/infra/cryptography/bcryptjs-encrypter";
import { UUIDGeneratorService } from "@/core/infra/services/uuid-generator-service";
import { SigninController } from "@/core/interfaces/controllers/signin-controller";
import { SigninData } from "@/core/data/usecases/signin-data";
import { JsonwebTokenAdpter } from "@/core/infra/cryptography/jsonwebtoken-token";

const app = express();

app.use(express.json());

app.post("/sign-in", async (request, response) => {
  const accountRepositoryImpl = new AccountRepositorySqlite();
  const bcryptjs = new BcryptEncrypter();
  const jwt = new JsonwebTokenAdpter();
  const signinData = new SigninData(accountRepositoryImpl, bcryptjs, jwt);
  const signupController = new SigninController(signinData);
  const perform = await signupController.perform(request.body);
  response.status(perform.statusCode).json(perform.body);
});

app.post("/sign-up", async (request, response) => {
  const accountRepositoryImpl = new AccountRepositorySqlite();
  const bcryptjs = new BcryptEncrypter();
  const uuid = new UUIDGeneratorService();
  const addAccountData = new AddAccountData(
    accountRepositoryImpl,
    bcryptjs,
    uuid,
  );
  const signupController = new SignupController(addAccountData);
  const perform = await signupController.perform(request.body);
  response.status(perform.statusCode).json(perform.body);
});

export default app;
