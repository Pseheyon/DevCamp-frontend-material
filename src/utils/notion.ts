import "server-only";
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

export const notion = new Client({ auth: notionSecret });
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

export async function getItems() {
  const databaseId = notionDatabaseId;
  const response = await notion.databases.query({
    database_id: databaseId || "",
  });
  // console.log("어디있는 지 확인", response.results);
  return response.results.map((page: any) => ({
    id: page.id,
    price:
      page.properties["price"]?.multi_select.map((price: any) => price.name) ||
      [],
    productName: page.properties["productName"]?.title[0]?.text.content || "",
    description:
      page.properties["description"]?.rich_text[0]?.text.content || "",
    slug: page.properties["slug"]?.rich_text[0]?.text.content || "",
  }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const list = await getItems();
  res.status(200).json(list);
}

export const getPages = cache(() => {
  return notion.databases.query({
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    database_id: process.env.NOTION_DATABASE_ID!,
  });
});

export const getPageContent = cache((pageId: string) => {
  return notion.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[]);
});

export const getPageBySlug = cache((slug: string) => {
  return notion.databases
    .query({
      database_id: notionDatabaseId!,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
});
