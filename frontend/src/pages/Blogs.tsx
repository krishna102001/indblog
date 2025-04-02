import { useEffect, useState } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { backend_url } from "../config";
import BlogSkeleton from "../components/skeleton/BlogSkeleton";
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
  image: string;
  created_at: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  document.title = "All Blogs";
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
    <div className='grid sm:grid-cols-3 m-2'>
      <div className='col-span-2 m-4 sm:ml-20'>
        <h1 className='text-5xl tracking-wider font-bold mb-4 underline'>
          All Blogs
        </h1>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            id={blog.id}
            name={blog.author.name}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            created_at={blog.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
