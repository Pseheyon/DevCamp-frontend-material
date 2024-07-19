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

  // if (!searchParams) {
  //   allProducts = await getAllProducts(searchParams.slug);
  // }

  return (
    <div className="p-10 cursor-pointer">
      <>
        {/* {products.map((item) => (
        // 상품명이 존재하면 해당 상품 표시
        <div key={item.slug}>
          {item.productName && (
            <>
              <Link href={`/products/${item.slug}`}>
                <ResizablePanelGroup
                  direction="horizontal"
                  className=" rounded-lg border h-[200px] "
                >
                  <ResizablePanel
                    defaultSize={10}
                    className="h-[200px] items-center"
                  >
                    <div className="flex items-center justify-center h-full ">
                      <div className="font-semibold relative h-[200px] w-full">
                        <Image
                          src={item.productImg}
                          fill
                          alt="Picture of the author"
                          priority
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={80}>
                    <ResizablePanelGroup direction="vertical">
                      <ResizablePanel defaultSize={50}>
                        <div className=" p-1">
                          <span className="font-semibold">
                            <p>상품명: {item.productName}</p>

                            {item.productName}
                          </span>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={50}>
                        <div className="flex items-center p-1">
                          <span className="font-semibold">{item.price}</span>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </Link>
              <br />
            </>
          )}
        </div>
      ))} */}
      </>
      <>
        <ProductList products={allProducts} />
      </>
      {/* <>{allProduct ? <ProductList products={allProducts} /> : <>No Posts</>}</> */}
    </div>
  );
}
