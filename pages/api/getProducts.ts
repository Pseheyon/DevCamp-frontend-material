import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function getProducts() {
  try {
    const response = await prisma.products.findMany();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const products = await getProducts();
    res.status(200).json({ items: products, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} added` });
  }
}
