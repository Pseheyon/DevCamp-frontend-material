"use client";
import type { Metadata } from "next";
import { Productdetail } from "@/components/Productdetail";
import { Product } from "@/components/Product";
import DetailLayout from "@/components/EditDetailLayout";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import EditDetailLayout from "@/components/DetailLayout copy";
import { getPageBySlug } from "@/utils/notion";

type Props = {
  params: { postBy: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getPageBySlug(params.postBy);

  const productName = product?.properties.productName?.title[0]?.plain_text;
  const description =
    product?.properties?.description?.rich_text[0]?.plain_text;

  return {
    title: productName,
    description: description,
  };
}
export default function Page({ params }: Props) {
  const [edit, setEdit] = useState(false);
  const editBtn = () => {
    // setCartData((prevCartData) => ({
    //   ...prevCartData,
    //   paymentAmount: {
    //     ...prevCartData.paymentAmount,
    //     total: amoutQuantitypay,
    //     discount: 0,
    //   },
    // }));
    !setEdit;
  };
  return (
    <>
      {edit ? (
        <>
          <Button onClick={editBtn}>수정완료</Button>
          <EditDetailLayout params={params} />
        </>
      ) : (
        <>
          <Button onClick={editBtn}>수정하기</Button>
          <DetailLayout params={params}></DetailLayout>
        </>
      )}
    </>
  );
}
