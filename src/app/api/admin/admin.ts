// import { NextResponse } from "next/server";
// import { getPageByPostBy, getAllProducts } from "@/utils/notion";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.NEXTAUTH_SECRET!;

// export async function GET(request: Request) {
//   const token = request.headers.get("authorization")?.split(" ")[1];

//   if (!token) {
//     return NextResponse.json(
//       { error: "로그인 후 시도해주세요" },
//       { status: 401 }
//     );
//   }

//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "다시 로그인을 해주세요." },
//       { status: 401 }
//     );
//   }

//   const { postBy } = decodedToken as { postBy: string };
//   console.log("postBy", postBy);
//   const allProducts = await getAllProducts();
//   const filteredProducts = allProducts.filter(
//     (product) => product.properties.postBy.rich_text[0].plain_text === postBy
//   );
//   return NextResponse.json(filteredProducts);
// }
// import { NextResponse } from "next/server";
// import { getPageByPostBy, getAllProducts } from "@/utils/notion";
// import { getServerSession } from "next-auth";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.NEXTAUTH_SECRET!;

// export async function GET(request: Request) {
//   const session = await getServerSession();

//   if (!session || !session.user || !session.user.token) {
//     return NextResponse.json(
//       { error: "Unauthorized access. Please log in." },
//       { status: 401 }
//     );
//   }

//   const token = session.user.token;
//   const decodedToken = jwt.verify(token, JWT_SECRET) as { postBy: string };

//   try {
//     const allProducts = await getAllProducts();
//     const filteredProducts = allProducts.filter(
//       (product) =>
//         product.properties.postBy.rich_text[0].plain_text ===
//         decodedToken.postBy
//     );
//     return NextResponse.json({ filteredProducts });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch products." },
//       { status: 500 }
//     );
//   }
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const list = await getItems();
//   res.status(200).json(list);}

// const notionSecret = process.env.NOTION_TOKEN;
// const notionDatabaseId = process.env.NOTION_DATABASE_ID;

// const notion = new Client({ auth: notionSecret });

// export async function getItems() {
//   const databaseId = notionDatabaseId;
//   const response = await notion.databases.query({
//     database_id: databaseId || "",
//   });
//   console.log("어디있는 지 확인", response.results);
//   return response.results.map((page: any) => ({
//     id: page.id,
//     price:
//       page.properties["price"]?.multi_select.map((price: any) => price.name) ||
//       [],
//     productName: page.properties["productName"]?.title[0]?.text.content || "",
//     description:
//       page.properties["description"]?.rich_text[0]?.text.content || "",
//   }));
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const list = await getItems();
//   res.status(200).json(list);}
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";
import { getAllProducts } from "@/utils/notion";
const JWT_SECRET = process.env.NEXTAUTH_SECRET!;
import { JWT } from "next-auth/jwt";
import { authOptions } from "../auth/[...nextauth]/route";

interface CustomJWT extends JWT {
  user: {
    id?: string;
    email: string;
    role: string;
    token: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session?.user || !session.user.token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const token = session?.user.token;
    const decodedToken = jwt.verify(token, JWT_SECRET) as { postBy: string };

    const allProducts = await getAllProducts();
    const filteredProducts = allProducts.filter(
      (product) =>
        product.properties.postBy.rich_text[0].plain_text ===
        decodedToken.postBy
    );

    res.status(200).json({ products: filteredProducts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
