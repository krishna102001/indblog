import { blogCreateType } from "@krishnakantmaurya/indblog-common";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import BlogProfile from "./BlogProfile";

interface Author {
  name: string;
  id: string;
}
type BlogDetails = Author & blogCreateType;

const Blog = ({ id, name, title, content }: BlogDetails) => {
  const navigate = useNavigate();
  const extract = (htmlContent: string) => {
    const text = DOMPurify.sanitize(htmlContent, { ALLOWED_TAGS: [] });
    return text.split(" ").slice(0, 50).join(" ");
  };
  return (
    <div
      className='my-4 cursor-pointer'
      id={id}
      onClick={() => navigate(`/view/blog/${id}`)}
    >
      <BlogProfile name={name} />
      <div>
        <h1 className='text-3xl font-semibold text-gray-900'>{title}</h1>
        <div
          className='mt-1'
          dangerouslySetInnerHTML={{ __html: extract(content) }}
        />
      </div>
      <div className='w-full h-[1px] bg-gray-100 my-2'></div>
    </div>
  );
};

export default Blog;
