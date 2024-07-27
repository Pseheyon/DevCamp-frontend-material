"use client";

import { TProductPage, TProduct } from "@/interfaces/ProductIF";
import { ProductItem } from "@/components/productItem";

export const ProductList = ({ products }: { products: TProductPage[] }) => {
  // if (products.length === 0) {
  //   return <div>Coming soon...</div>;
  // }
  return (
    <>
      {products.map((item) => (
        // 상품명이 존재하면 해당 상품 표시
        <div key={item.id}>
          <ProductItem
            productName={
              item.properties.productName?.title[0]?.plain_text ?? ""
            }
            slug={item.properties?.slug?.rich_text[0]?.plain_text ?? ""}
            postBy={item.properties?.postBy?.rich_text[0]?.plain_text ?? ""}
            description={
              item.properties?.description?.rich_text[0]?.plain_text ?? ""
            }
            productImg={
              item.properties?.productImg?.rich_text[0]?.plain_text ?? ""
            }
            detailImg={
              item.properties?.detailImg?.rich_text[0]?.plain_text ?? ""
            }
            price={item.properties?.price?.number ?? null}
            publishedDate={item.properties?.publishedDate?.date.start}
          />
        </div>
      ))}
    </>
  );
};
