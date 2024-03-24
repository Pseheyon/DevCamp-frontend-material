import { List } from "@/interfaces/list";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const listsDirectory = join(process.cwd(), "_list");

export function getListSlugs() {
  return fs.readdirSync(listsDirectory);
}

export function getListBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(listsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as List;
}
