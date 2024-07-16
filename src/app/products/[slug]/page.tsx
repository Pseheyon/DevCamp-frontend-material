import {
  getPageBySlug,
  notion,
  getPageContent,
} from "../../../../pages/api/notion";
import { NotionRenderer } from "@notion-render/client";
import { notFound } from "next/navigation";

//Plugins
import hljsPlugin from "@notion-render/hljs-plugin";
import bookmarkPlugin from "@notion-render/bookmark-plugin";

import { Product } from "@/components/productItem";

export default async function Page({ params }: { params: { slug: string } }) {
  console.log("Slug: ", params);
  const list = await getPageBySlug(params.slug);

  //Redirect to not found page!
  if (!list) notFound();

  const content = await getPageContent(list.id);

  const notionRenderer = new NotionRenderer({
    client: notion,
  });

  notionRenderer.use(hljsPlugin({}));
  notionRenderer.use(bookmarkPlugin(undefined));
  const html = await notionRenderer.render(...content);

  console.log("list: zzzzzzzzzzzzzzzzzzzzzzzzzzzzz", list);

  return (
    <>
      <Product
        productName={(list.properties.productName as any).title[0].plain_text}
        description={
          (list.properties.description as any).rich_text[0].plain_text
        }
        slug={(list.properties.slug as any).rich_text[0].plain_text}
        price={(list.properties.price as any).number}
        productImg={(list.properties.productImg as any).rich_text[0].plain_text}
        detailImg={(list.properties.detailImg as any).rich_text[0].plain_text}
        content={html}
      />
    </>
  );
}
