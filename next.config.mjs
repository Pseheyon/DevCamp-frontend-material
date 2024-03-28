/** @type {import('next').NextConfig} */
const urlList = [
  "https://raw.githubusercontent.com/Pseheyon/DevCamp-frontend-material/main/public/images/cat-tower1.webp",
  "https://raw.githubusercontent.com/Pseheyon/DevCamp-frontend-material/main/public/images/cat-tower2.webp",
  "https://raw.githubusercontent.com/Pseheyon/DevCamp-frontend-material/main/public/images/cat-scarf1.jpg",
  "https://raw.githubusercontent.com/Pseheyon/DevCamp-frontend-material/main/public/images/cat-scarf2.webp",
];
const domains = urlList.map((url) => new URL(url).hostname);
const nextConfig = {
  images: {
    domains: ["github.com", "raw.githubusercontent.com"],
  },
};

export default nextConfig;
// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "raw.githubusercontent.com",
//         pathname:
//           "/Pseheyon/DevCamp-frontend-material/tree/main/public/images/**",
//       },
//     ],
//   },
// };

// export default nextConfig;
