import { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";

import { type TProduct } from "@/interfaces/ProductIF";
import Image from "next/image";

export function Productdetail(props: TProduct) {
  const { productName, description, price, content, productImg, detailImg } =
    props;
  return (
    <main className="w-full flex items-center justify-center">
      {/* <Button onClick={handleClick}>add jacket 2</Button> */}

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
        {/* <div
          className="text-xl mt-4 leading-10 prose prose-p:text-white w-full"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div> */}
      </div>
    </main>
  );
}
