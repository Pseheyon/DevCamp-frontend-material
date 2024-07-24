import type { Metadata } from "next";
import {
  getPageBySlug,
  getPageContent,
  renderPageContent,
  getPageByPostBy,
} from "@/utils/notion";
import { Productdetail } from "@/components/Productdetail";
import { Product } from "@/components/Product";
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
export default async function Page({ params }: { params: { postBy: string } }) {
  //Redirect to not found page!
  //if (!list) notFound();
  const list = await getPageBySlug(params.postBy);
  console.log("list-------------------------: ", list?.id);

  const content = await getPageContent(list?.id);
  console.log("List-------------------------: ", list.id);
  console.log("content-------------------------: ", content);
  const html = await renderPageContent(content!);

  console.log("list: zzzzzzzzzzzzzzzzzzzzzzzzzzzzz", html);

  return (
    <div className="w-[1280px] ">
      사용자 페이지
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
      />
      <Product content={html} />
    </div>
  );
}
