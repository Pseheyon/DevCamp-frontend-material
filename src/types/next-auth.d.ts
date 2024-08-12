import { JWT } from "next-auth/jwt";
import { Session as NextAuthSession } from "next-auth";
// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    role?: string;
    token?: string;
  }
}

import { DefaultSession } from "next-auth";

// `next-auth` 모듈을 확장하여 세션 타입을 정의합니다.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      token: string;
    };
  }
}
