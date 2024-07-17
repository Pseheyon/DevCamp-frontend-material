export const Product = ({ content }: { content: string }) => {
  return (
    <div
      className="text-xl mt-4 leading-10 prose prose-p:text-white w-full"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};
