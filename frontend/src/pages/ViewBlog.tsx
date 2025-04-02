import { useEffect, useState } from "react";
import BlogProfile from "../components/BlogProfile";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../config";
import { toast } from "react-toastify";
import BlogSkeleton from "../components/skeleton/BlogSkeleton";

interface Author {
  id: string;
  name: string;
}

interface Blogs {
  id: string;
  title: string;
  content: string;
  author: Author;
  created_at: string;
  image: string;
}
const ViewBlog = () => {
  const [blog, setBlog] = useState<Blogs>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`${backend_url}/api/v1/blog/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setIsLoading(false);
        setBlog(res.data.post);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.error(err);
      });
  }, [params.id]);

  useEffect(() => {
    if (blog != undefined) {
      document.title = blog?.title || "";
    }
  }, [blog, blog?.title]);
  if (isLoading) {
    return (
      <div>
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }
  return (
    <div className='flex flex-col justify-center items-center mt-4 '>
      <div className='max-w-sm sm:max-w-4xl'>
        <h1 className='text-3xl sm:text-6xl font-semibold mb-4'>
          {blog?.title}
        </h1>
        <div className='mb-4'>
          <BlogProfile
            name={blog?.author.name || ""}
            created_at={blog?.created_at || ""}
            timeRead={5}
            id={blog?.id || ""}
          />
        </div>
        <div className='flex flex-col justify-center items-center border-t'>
          <img src={blog?.image} className='w-[50%] h-[50%] my-4' />
        </div>
        <div className='w-full max-w-full overflow-hidden'>
          <div
            className='prose prose-lg max-w-full break-words text-justify'
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
