// "use client";
// import type { Metadata } from "next";
// import {
//   getAllProducts,
//   getPageByPostBy,
//   getPageByPostByDb,
//   getPageBySlug,
// } from "@/utils/notion";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { TProductPage, TProduct } from "@/interfaces/ProductIF";

// import { ProductList } from "@/components/productList";
// import { string } from "zod";

// export default async function Admin() {
//   // const postBy = localStorage.getItem("adminName") || "";
//   const postBy = "seller";
//   //if (!list) notFound();
//   const allProducts = await getPageByPostBy(postBy);

//   return (
//     <div className="p-10 cursor-pointer">
//       <>
//         {allProducts ? <ProductList products={allProducts} /> : <>No Posts</>}
//       </>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TProduct } from "@/interfaces/ProductIF";

export default function AdminPage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check if session is loading
        if (status === "loading") return;

        // Check if the user is authenticated
        if (!session?.user?.token) {
          throw new Error("User is not authenticated.");
        }

        const response = await fetch("/api/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`, // Send token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      }
    };

    fetchProducts();
  }, [session, status]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Admin Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.productName}</li>
        ))}
      </ul>
    </div>
  );
}
