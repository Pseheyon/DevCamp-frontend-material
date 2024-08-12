import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/validators/loginSchema";
import { JWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET!;

interface CustomUser {
  id: string;
  email: string;
  role: string;
  token: string;
}

interface CustomJWT extends JWT {
  id?: string;
  email?: string;
  role?: string;
  token?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const { email, password, role } = result.data;
        if (
          email === "seller@example.com" &&
          password === "pw1234!" &&
          role === "admin"
        ) {
          const token = jwt.sign(
            {
              email,
              role,
              postBy: email.split("@")[0],
            },
            JWT_SECRET,
            { expiresIn: "1h" }
          );

          return {
            id: email,
            email,
            role,
            token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as CustomUser).id;
        token.email = (user as CustomUser).email;
        token.role = (user as CustomUser).role;
        token.token = (user as CustomUser).token;
      }
      return token as CustomJWT;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as string,
          token: token.token as string,
        };
      }
      return session;
    },
  },
  secret: JWT_SECRET,
  session: {
    strategy: "jwt",
  },
};

// HTTP 메서드별로 export
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
