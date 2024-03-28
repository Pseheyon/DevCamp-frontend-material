"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import {
  getItems,
  getPageBySlug,
  notion,
  getPageContent,
} from "@/utils/notion";

interface Product {
  id: string;
  productName: string;
  description: string;
  price: string[];
  slug: string;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-10">
      <p>상품 목록</p>
      {/* 상품이 있는 경우에만 렌더링 */}
      {products.map((item) => (
        // 상품명이 존재하면 해당 상품 표시
        <div key={item.slug}>
          {item.productName && (
            <>
              {/* <p>ID: {item.id}</p> */}
              <ResizablePanelGroup
                direction="horizontal"
                className=" rounded-lg border h-[100px] "
              >
                <ResizablePanel
                  defaultSize={20}
                  className="h-[100px] items-center"
                >
                  <div className="flex items-center justify-center h-full  ">
                    <span className="font-semibold"></span>
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
                        <span className="font-semibold">
                          {item.price.length > 0 ? item.price[0] : "0"}
                        </span>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>

              <br />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
