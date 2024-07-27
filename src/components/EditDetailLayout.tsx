// import { getPageBySlug, notion, getPageContent } from "@/utils/notion";
// import { NotionRenderer } from "@notion-render/client";
// import { notFound } from "next/navigation";

// //Plugins
// import hljsPlugin from "@notion-render/hljs-plugin";
// import bookmarkPlugin from "@notion-render/bookmark-plugin";

// import { ProductItem } from "@/components/productItem";

// export default async function Page({ params }: { params: { slug: string } }) {
//   console.log("Slug: ", params);
//   const list = await getPageBySlug(params.slug);

//   //Redirect to not found page!
//   if (!list) notFound();

//   const content = await getPageContent(list.id);

//   const notionRenderer = new NotionRenderer({
//     client: notion,
//   });

//   notionRenderer.use(hljsPlugin({}));
//   notionRenderer.use(bookmarkPlugin(undefined));
//   const html = await notionRenderer.render(...content);

//   // console.log("list: zzzzzzzzzzzzzzzzzzzzzzzzzzzzz", list);

//   return (
//     <>
//       <ProductItem
//         productName={(list.properties.productName as any).title[0].plain_text}
//         description={
//           (list.properties.description as any).rich_text[0].plain_text
//         }
//         slug={(list.properties.slug as any).rich_text[0].plain_text}
//         price={(list.properties.price as any).number}
//         productImg={(list.properties.productImg as any).rich_text[0].plain_text}
//         detailImg={(list.properties.detailImg as any).rich_text[0].plain_text}
//         content={html}
//       />
//     </>
//   );
// }
import type { Metadata } from "next";
import {
  getPageBySlug,
  notion,
  getPageContent,
  renderPageContent,
} from "@/utils/notion";
import { notFound } from "next/navigation";
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { TProductPage, TProduct } from "@/interfaces/ProductIF";
import { ProductItem } from "@/components/productItem";
import { NotionRenderer } from "@notion-render/client";
import { Productdetail } from "@/components/Productdetail";
import { Product } from "@/components/Product";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getPageBySlug(params.slug);

  const productName = product?.properties.productName?.title[0]?.plain_text;
  const description =
    product?.properties?.description?.rich_text[0]?.plain_text;

  return {
    title: productName,
    description: description,
  };
}
export default async function DetailLayout({
  params,
}: {
  params: { postBy: string };
}) {
  const list = await getPageBySlug(params.postBy);

  const content = await getPageContent(list?.id);
  const html = await renderPageContent(content!);

  return (
    <div className="w-[1280px] ">
      <Productdetail
        productName={list?.properties.productName?.title[0]?.plain_text ?? ""}
        slug={list?.properties?.slug?.rich_text[0]?.plain_text ?? ""}
        description={
          list?.properties?.description?.rich_text[0]?.plain_text ?? ""
        }
        productImg={
          list?.properties?.productImg?.rich_text[0]?.plain_text ?? ""
        }
        detailImg={list?.properties?.detailImg?.rich_text[0]?.plain_text ?? ""}
        price={list?.properties?.price?.number ?? null}
        publishedDate={list?.properties?.publishedDate?.date.start}
        id={list.id}
      />
      <Product content={html} />
    </div>
  );
}
