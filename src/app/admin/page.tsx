import type { Metadata } from "next";
import {
  getAllProducts,
  getPageByPostBy,
  getPageByPostByDb,
  getPageBySlug,
} from "@/utils/notion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TProductPage, TProduct } from "@/interfaces/ProductIF";

import { ProductList } from "@/components/productList";
import { string } from "zod";

export const metadata: Metadata = {
  title: "Admin",
};

type Props = {
  searchParams: { [postBy: string]: string };
};

export default async function Admin() {
  // const postBy = localStorage.getItem("adminName") || "";
  const postBy = "seller";
  //if (!list) notFound();
  const products = await getPageByPostBy(postBy);

  return (
    <div className="w-[1280px] ">
      {products.map((item) => (
        // 상품명이 존재하면 해당 상품 표시
        <div key={item.id}>
          {item.properties?.postBy?.rich_text[0]?.plain_text ?? ""}
          {item.properties.productName?.title[0]?.plain_text ?? ""}
          {item.properties?.slug?.rich_text[0]?.plain_text ?? ""}
          {item.properties?.description?.rich_text[0]?.plain_text ?? ""}
          {/* {item.properties?.productImg?.rich_text[0]?.plain_text ?? ""}
          {item.properties?.detailImg?.rich_text[0]?.plain_text ?? ""} */}
          {item.properties?.price?.number ?? null}
          {item.properties?.publishedDate?.date.start}
        </div>
      ))}
    </div>
  );
}
