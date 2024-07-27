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
import { EditProductdetail } from "./EditProductdetail";

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
export default async function EditDetailLayout({
  params,
}: {
  params: { postBy: string };
}) {
  const list = await getPageBySlug(params.postBy);

  const content = await getPageContent(list?.id);
  const html = await renderPageContent(content!);

  return (
    <div className="w-[1280px] ">
      <EditProductdetail
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
