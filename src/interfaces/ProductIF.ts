import { StaticImageData } from "next/image";
export type TProduct = {
  id?: string;
  productName?: string;
  description?: string;
  publishedDate?: string;
  price?: number | string;
  productImg: StaticImageData | string;
  detailImg: StaticImageData | string;
  content?: string;
  slug?: string;
  postBy?: string;
};

export type TProductPage = {
  id: string;
  last_edited_time: string;
  properties: {
    productName: {
      title: [{ plain_text: string }];
    };
    description: {
      rich_text: [{ plain_text: string }];
    };
    publishedDate: { date: { start: string } };
    price: {
      number: number;
    };
    slug: {
      rich_text: [{ plain_text: string }];
    };
    productImg: {
      rich_text: [{ plain_text: StaticImageData }];
    };
    detailImg: {
      rich_text: [{ plain_text: StaticImageData }];
    };
    postBy: {
      rich_text: [{ plain_text: string }];
    };
  };
};
export type TAdminPage = {
  id: string;
  last_edited_time: string;
  properties: {
    productName: {
      title: [{ plain_text: string }];
    };
    description: {
      rich_text: [{ plain_text: string }];
    };
    publishedDate: { date: { start: string } };
    price: {
      number: number;
    };
    slug: {
      rich_text: [{ plain_text: string }];
    };
    productImg: {
      rich_text: [{ plain_text: StaticImageData }];
    };
    detailImg: {
      rich_text: [{ plain_text: StaticImageData }];
    };
    postBy: {
      rich_text: [{ plain_text: string }];
    };
  };
};
