import { useEffect, useState } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { backend_url } from "../config";
import BlogSkeleton from "../components/skeleton/BlogSkeleton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Author {
  id: string;
  name: string;
}

interface Blogs {
  id: string;
  title: string;
  content: string;
  author: Author;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${backend_url}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.posts);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
        console.log(err);
      });
  }, []);
  console.log(blogs);
  if (isLoading) {
    return (
      <div className='flex flex-col ml-10 m-4'>
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }
  return (
    <div className=' flex flex-col-reverse sm:grid sm:grid-cols-3 m-2'>
      <div className='col-span-2 m-4 sm:ml-20'>
        <h1 className='text-5xl tracking-wider font-bold mb-4'>All Post</h1>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            id={blog.id}
            name={blog.author.name}
            title={blog.title}
            content={blog.content}
          />
        ))}
      </div>
      <div className='flex  sm:flex-col items-end  m-4 mb-0 sm:mr-10'>
        <h1 className='invisible sm:visible text-lg sm:text-2xl font-semibold'>
          Want To Create Your Own Post
        </h1>
        <p
          className='bg-green-600 p-2 text-sm sm:px-4 mt-2 max-w-sm rounded-xl text-gray-200 hover:text-white shadow-md shadow-green-400 hover:shadow-xl hover:shadow-green-400'
          onClick={() => navigate("/create/blog")}
        >
          New +
        </p>
      </div>
    </div>
  );
};

export default Blogs;
