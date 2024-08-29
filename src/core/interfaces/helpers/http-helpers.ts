import { Response } from "../protocols/http";

export const badRequest = (errors: string[]): Response => ({
  statusCode: 400,
  body: {
    errors,
  },
});

export const ok = (data: Record<string, any>): Response => ({
  statusCode: 200,
  body: {
    data,
  },
});
