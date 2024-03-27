// import { NextApiRequest, NextApiResponse } from "next";
// import { Client } from "@notionhq/client";

// const notionSecret = process.env.NOTION_TOKEN; // 📌노션 api 시크릿 코드
// const notionDatabaseId = process.env.NOTION_DATABASE_ID;
// // 📌노션 데이터베이스 페이지 url에서  www.notion.so/ 뒤의 주소부터 ?v 전까지 32글자

// const notion = new Client({
//   auth: notionSecret,
// });

// async function addItems(name: string) {
//   try {
//     const response = await notion.pages.create({
//       parent: { database_id: notionDatabaseId || "" },
//       properties: {
//         title: [
//           {
//             text: {
//               content: name, // 📌input에 작성한 텍스트가 표에 들어가게 됨
//             },
//           },
//         ],
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.error(JSON.stringify(error));
//   }
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { name } = req.query;
//   if (name === null) {
//     return res.status(400).json({ message: "No name" });
//   }
//   try {
//     await addItems(String(name));
//     // 📌 성공 또는 실패시 보여질 메세지
//     res.status(200).json({ message: `Success ${name} added` });
//   } catch (error) {
//     res.status(400).json({ message: `Failed ${name} added` });
//   }
// }
