import { NextResponse } from "next/server";
import { TsOrderSchemaType, orderSchema } from "@/validators/cartSchema";
import { mockCartData } from "@/app/data/mockCartData";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = orderSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    // Mock 데이터를 업데이트
    console.log("결제 결과", result);
    const updatedData: TsOrderSchemaType = result.data;
    mockCartData[0] = updatedData;
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
