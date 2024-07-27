import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import type { Metadata } from "next";
import { getAllProducts } from "@/utils/notion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GetStaticProps } from "next";
import { TProductPage, TProduct } from "@/interfaces/ProductIF";
import Link from "next/link";
import { ProductList } from "@/components/productList";

export const metadata: Metadata = {
  title: "Products",
};

type Props = {
  searchParams: { [key: string]: string };
};

export default async function ProductsPage({ searchParams }: Props) {
  let allProducts: TProductPage[] | undefined = [];
  allProducts = await getAllProducts();
  console.log("allProducts 확인-------------", allProducts[0]?.properties);

  return (
    <div className="p-10 cursor-pointer">
      <>
        {allProducts ? <ProductList products={allProducts} /> : <>No Posts</>}
      </>
    </div>
  );
}
