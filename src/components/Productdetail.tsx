import { GetStaticProps } from "next";

import { type TProduct } from "@/interfaces/ProductIF";
import Image from "next/image";
import { EditProductdetail } from "./EditProductdetail";
import {
  getPageBySlug,
  notion,
  getPageContent,
  renderPageContent,
} from "@/utils/notion";
import { Product } from "./Product";
import { Button } from "./ui/button";

export async function Productdetail(props: TProduct) {
  const {
    productName,
    description,
    price,
    content: content,
    productImg,
    detailImg,
    postBy,
    id,
  } = props;

  const getContent = await getPageContent(id!);
  const html = await renderPageContent(getContent!);

  if (content === undefined) {
    return;
  }
  return (
    <main className="w-full flex items-center justify-center">
      <>
        <div className="w-[1280px] ">
          <h1 className="text-2xl font-black  mb-8  mt-8">{productName}</h1>
          <div className="flex items-center r h-full px-80">
            <div
              className="font-semibold relative h-[450px] w-full
        "
            >
              <Image
                src={productImg}
                fill
                alt="Picture of the author"
                priority
                className=" object-cover object-top w-full"
              />
            </div>
            <div className=" basis-5">구매</div>
          </div>
          <ul>{price}</ul>
          <p>{description}</p>
          <>{content}</>
          <Product content={html} />
        </div>
      </>
    </main>
  );
}
