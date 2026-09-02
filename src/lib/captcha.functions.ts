import { createServerFn } from "@tanstack/react-start";
import { createChallenge } from "./captcha.server";

export const getCaptchaChallenge = createServerFn({ method: "GET" }).handler(async () => {
  return await createChallenge();
});
