import { Response } from "../protocols/http";

export const badRequest = (errors: string[]): Response => ({
  statusCode: 400,
  body: {
    success: false,
    errors,
  },
});

export const unauthorized = (errors: string[]): Response => ({
  statusCode: 409,
  body: {
    success: false,
    errors,
  },
});

export const conflict = (errors: string[]): Response => ({
  statusCode: 409,
  body: {
    success: false,
    errors,
  },
});

export const ok = (data: Record<string, any>): Response => ({
  statusCode: 200,
  body: {
    success: true,
    data,
  },
});

export const serverError = (error: unknown): Response => ({
  statusCode: 500,
  body: {
    success: false,
    errors: [typeof error === "string" ? error : "Internal server error"],
  },
});
