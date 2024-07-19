import "server-only";
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { cache } from "react";
import { TProductPage, TProduct } from "@/interfaces/ProductIF";
const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

export const notion = new Client({ auth: notionSecret });

const databaseId = process.env.NOTION_DATABASE_ID!;

const queryNotionDatabase = async (): Promise<TProductPage[]> => {
  try {
    const response = await notion.databases.query({
      // filter: {
      //   property: "status",
      //   select: {
      //     equals: "published",
      //   },
      // },
      database_id: process.env.NOTION_DATABASE_ID!,
    });
    //console.log("응답----------------------", response);
    return response.results as (DatabaseObjectResponse & TProductPage)[];
  } catch (error) {
    // console.error("Error occurred while fetching pages:", error);
    throw new Error("Failed to fetch pages. Please try again later.");
  }
};

export const getAllProducts = async (): Promise<TProductPage[]> => {
  try {
    return await queryNotionDatabase();
  } catch (error) {
    throw new Error("제품을 불러오는데 실패했습니다.");
  }
};

export const getPageContent = async (
  pageId: string
): Promise<BlockObjectResponse[]> => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    console.log("디테일콘----------------------", response);
    return response.results as BlockObjectResponse[];
  } catch (error) {
    console.error("제품상세페이지를 불러오는데 실패했습니다.", error);
    throw new Error("요청을 실패했습니다.");
  }
};
// export const getPageContent = cache((pageId: string) => {
//   return notion.blocks.children
//     .list({ block_id: pageId })
//     .then((res) => res.results as BlockObjectResponse[]);
// });

export const getPageBySlug = async (
  slug: string
): Promise<PageObjectResponse & TProductPage> => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });
    console.log("슬러그3----------------------", response.results[0]);
    return response?.results[0] as PageObjectResponse & TProductPage;
  } catch (error) {
    // console.error("제품 디테일페이지를 불러오는데 실패했습니다.", error);
    throw new Error("디테일페이지 요청을 실패했습니다.");
  }
};

export const renderPageContent = async (
  content: BlockObjectResponse[]
): Promise<string> => {
  const notionRenderer = new NotionRenderer({
    client: notion,
  });

  notionRenderer.use(hljsPlugin({}));

  try {
    return await notionRenderer.render(...content);
  } catch (error) {
    throw new Error("렌더링 요청을 실패했습니다.");
  }
};
