"use client";
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
  const allProducts = await getPageByPostBy(postBy);

  return (
    <div className="p-10 cursor-pointer">
      <>
        {allProducts ? <ProductList products={allProducts} /> : <>No Posts</>}
      </>
    </div>
  );
}
