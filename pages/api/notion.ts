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
