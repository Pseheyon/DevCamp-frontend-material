"use client";

import { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import { StaticImageData } from "next/image";
import { type TProduct } from "@/interfaces/ProductIF";
import Link from "next/link";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const ProductItem = ({
  productName,
  price,
  productImg,
  slug,
}: // description,
// content,
// detailImg,
TProduct) => {
  return (
    <>
      {productName && (
        <main className="w-full flex items-center justify-center">
          <>
            <Link href={`/products/${slug}`}>
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
                        src={productImg}
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
                          <p>상품명: {productName}</p>

                          {productName}
                        </span>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="flex items-center p-1">
                        <span className="font-semibold">{price}</span>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </Link>
            <br />
          </>
        </main>
      )}
    </>
  );
};
