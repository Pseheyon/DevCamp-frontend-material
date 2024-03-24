import { type Author } from "./author";

export type List = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  description: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};
