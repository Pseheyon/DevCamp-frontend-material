import { z } from "zod";

export const TokenSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: "올바른 이메일 양식으로 기입해 주세요" }),
  postBy: z.string(),
  role: z.string(),
  token: z.string(),
});
