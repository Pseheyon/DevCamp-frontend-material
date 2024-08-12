import { loginSchema } from "@/validators/loginSchema";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

const mockUserData = {
  email: "seller@example.com",
  password: "pw1234!",
  role: "admin",
};

const JWT_SECRET = process.env.NEXTAUTH_SECRET!;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET 환경 변수가 설정되지 않았습니다.");
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = loginSchema.safeParse(body);
  let zodErrors: Record<string, string> = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    const { email, password, role } = result.data;

    const existingUser = mockUserData.email === email ? mockUserData : null;

    if (
      !existingUser ||
      existingUser.password !== password ||
      existingUser.role !== role
    ) {
      zodErrors = {
        authentication: "사용자 정보가 없습니다.",
      };
    } else {
      const postBy = email.split("@")[0]; // 이메일 주소에서 도메인 부분을 제거
      let token: string;
      try {
        token = sign(
          { email: existingUser.email, role: existingUser.role, postBy },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
      } catch (error) {
        console.error("JWT 생성 중 오류 발생:", error);
        return NextResponse.json({
          errors: { jwt: "JWT 생성 중 오류가 발생했습니다." },
        });
      }
      return NextResponse.json({ token });
    }
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
