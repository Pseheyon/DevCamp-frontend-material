import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

export async function getItems() {
  const databaseId = notionDatabaseId;
  const response = await notion.databases.query({
    database_id: databaseId || "",
  });
  console.log("어디있는 지 확인-------------", response);
  return response.results.map((page: any) => ({
    id: page.id,
    productImg: page.properties["productImg"].rich_text[0]?.text.content || "",
    detailImg: page.properties["detailImg"].rich_text[0]?.text.content || "",
    price: page.properties["price"].number || [],
    productName: page.properties["productName"]?.title[0]?.text.content || "",
    slug: page.properties["slug"]?.rich_text[0]?.text.content || "",
    description:
      page.properties["description"]?.rich_text[0]?.text.content || "",
  }));
  // return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const list = await getItems();
  res.status(200).json(list);
}
