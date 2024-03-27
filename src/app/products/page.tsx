"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";

export default function List() {
  const [products, setProducts] = useState<
    { id: string; properties: { id: string }[] }[]
  >([]);
  // 📌 useEffect로 페이지 로딩과 동시에 products api 데이터를 받아와서 set설정
  useEffect(() => {
    fetch(`http://localhost:3000/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  return (
    <div>
      <p>Product List</p>
      // 📌 products 내용 화면에 표시
      {products &&
        products?.map((item) => (
          <div key={item.id}>
            {JSON.stringify(item)}
            // 📌 item property들을 버튼으로 화면에 표시
            {item.properties &&
              Object.entries(item.properties).map(([key, value]) => (
                // 📌 버튼 클릭 시 detail api 호출 해서 alert로 내용 표시
                <button
                  key={key}
                  onClick={() => {
                    fetch(
                      `http://localhost:3000/api/detail?pageId=${item.id}&propertyId=${value.id}`
                    )
                      .then((res) => res.json())
                      .then((data) => alert(JSON.stringify(data.detail)));
                  }}
                >
                  {key}
                </button>
              ))}
            <br />
            <br />
          </div>
        ))}
    </div>
  );
}
