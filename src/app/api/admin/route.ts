import type { Metadata } from "next";
import { NextResponse } from "next/server";
import { getPageByPostBy } from "@/utils/notion";

export const metadata: Metadata = {
  title: "Admin",
};

type Props = {
  searchParams: { [postBy: string]: string };
};
export async function GET({ searchParams }: Props) {
  const postBy = searchParams;
  const allProducts = await getPageByPostBy(searchParams);
  return NextResponse.json(allProducts);
}
