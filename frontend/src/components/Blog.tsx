import { blogCreateType } from "@krishnakantmaurya/indblog-common";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import BlogProfile from "./BlogProfile";

interface Author {
  name: string;
  id: string;
  created_at: string;
}
type BlogDetails = Author & blogCreateType;

const Blog = ({ id, name, title, content, image, created_at }: BlogDetails) => {
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
      <div className='grid grid-cols-1 sm:grid-cols-3'>
        <div className='sm:col-span-2'>
          <div>
            <h1 className='text-3xl font-semibold text-gray-900'>{title}</h1>
            <BlogProfile name={name} created_at={created_at} timeRead={5} />
            <div
              className='mt-1'
              dangerouslySetInnerHTML={{ __html: extract(content) }}
            />
          </div>
        </div>
        <div className=''>
          <img src={image} className='sm:w-full sm:h-full' />
        </div>
      </div>
      <div className='w-full h-[1px] bg-gray-100 my-2'></div>
    </div>
  );
};

export default Blog;
