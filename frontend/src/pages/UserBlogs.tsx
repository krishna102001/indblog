import { useEffect, useState } from "react";
import UserBlogCard from "../components/UserBlogCard";
import axios from "axios";
import { backend_url } from "../config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Author {
  id: string;
}

export interface UserBlogsInterface {
  id: string;
  title: string;
  content: string;
  author: Author;
  image: string;
  created_at: string;
}

const UserBlogs = () => {
  const [posts, setPosts] = useState<UserBlogsInterface[]>([]);
  const param = useParams();
  useEffect(() => {
    axios
      .get(`${backend_url}/api/v1/blog/user/all/${param.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setPosts(res.data.posts.posts);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.error(err);
      });
  }, [param.id]);
  console.log(posts);
  return (
    <div className='m-4'>
      <h1 className='text-xl font-semibold ml-2 capitalize'>
        List of published blog
      </h1>
      <div className='flex flex-col sm:flex-row sm:flex-wrap'>
        {posts.map((post) => (
          <UserBlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default UserBlogs;
