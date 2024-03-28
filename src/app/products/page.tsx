"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import { getItems } from "../../../pages/api/products";

export const getStaticProps: GetStaticProps = async () => {
  const list = await getItems();
  return {
    props: {
      list,
    },
  };
};
interface List {
  id: string;
  productName: string;
  description: string;
  price: string[];
}
interface Props {
  list: List[];
}
export default function List({ list }: Props) {
  return (
    <main>
      {/* <Button onClick={handleClick}>add jacket 2</Button> */}
      <div>
        <p>Product List</p>
        <div>
          {list.map((list) => (
            <div key={list.id}>
              <h2>{list.productName}</h2>
              <ul>
                {list.price.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p>{list.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
