import axios from "axios";
import { useEffect, useState } from "react";
import { backend_url } from "../config";
import { toast } from "react-toastify";

const BlogProfile = ({
  name,
  created_at,
  timeRead,
  id,
}: {
  name: string;
  created_at: string;
  timeRead: number;
  id: string;
}) => {
  const [totalLike, setTotalLike] = useState(1);
  const [isLike, setIsLike] = useState(false);
  const date = new Date(created_at);
  const day = date.getDate();
  const month = date.toLocaleDateString("default", { month: "short" });
  const year = date.getFullYear();

  const time = `${day} ${month} ${year}`;

  useEffect(() => {
    if (isLike) {
      axios
        .post(
          `${backend_url}/api/v1/blog/like/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          console.log(res.data.totalLike);
          setTotalLike(res.data.totalLike);
          setIsLike(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsLike(false);
          console.error(err);
        });
    }
  }, [isLike]);

  return (
    <div className='flex items-center mb-1 mt-1'>
      <div className='relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-300 rounded-full cursor-pointer '>
        <span className='text-xs text-gray-600 '>{name[0]}</span>
      </div>
      <div className='flex items-center text-gray-400 ml-1'>
        <h1 className='text-xs'>{name}</h1>
        <div className='bg-gray-300 w-1 h-1 rounded-full mx-1'></div>
        <p className='text-xs'>{time}</p>
        <div className='bg-gray-300 w-1 h-1 rounded-full mx-1'></div>
        <p className='text-xs'>{timeRead} min read</p>
      </div>
      <div
        className='sm:ml-auto flex items-center flex-col-reverse'
        onClick={() => setIsLike(!isLike)}
      >
        <p className='text-sm'>{totalLike}</p>
        <img src='/love.gif' className='w-8 h-8' />
      </div>
    </div>
  );
};

export default BlogProfile;
