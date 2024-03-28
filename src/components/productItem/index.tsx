"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import { getItems } from "../../utils/notion";

interface ListProps {
  productName: string;
  description: string;
  price: string[];
  content: string;
  slug: string;
}
interface List {
  list: ListProps[];
}

export function Product(props: ListProps) {
  const { productName, description, price, content } = props;
  return (
    <main>
      {/* <Button onClick={handleClick}>add jacket 2</Button> */}
      <div>
        <div>
          <h2>{productName}</h2>
          <ul>
            {price.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p>{description}</p>
        </div>
        <div
          className="text-xl mt-4 max-w-3xl leading-10 prose prose-p:text-white prose-headings:text-white"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </main>
  );
}

export function List({ list }: List) {
  return (
    <main>
      {/* <Button onClick={handleClick}>add jacket 2</Button> */}
      <div>
        <p>Product List</p>
        <div>
          {list.map((list) => (
            <div key={list.slug}>
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
