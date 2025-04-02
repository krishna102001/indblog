import { Link } from "react-router-dom";
import { UserBlogsInterface } from "../pages/UserBlogs";
import DOMPurify from "dompurify";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { backend_url } from "../config";

const UserBlogCard = ({
  id,
  title,
  content,
  image,
}: Partial<UserBlogsInterface>) => {
  function extract(content: string) {
    const sanitized = DOMPurify.sanitize(content, { ALLOWED_TAGS: [] });
    return sanitized.split(" ").slice(0, 20).join(" ");
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${backend_url}/api/v1/blog/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        console.error(error);
      }
    }
  };
  return (
    <div
      className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm mt-2 ml-2'
      id={id}
    >
      <div className='border-b'>
        <img className='rounded-t-lg' src={image} alt='' />
      </div>
      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
          {title}
        </h5>

        <p className='mb-3 font-normal text-gray-700 '>
          <div dangerouslySetInnerHTML={{ __html: extract(content || "") }} />
        </p>
        <div>
          <ul className='flex gap-4 justify-end items-center mt-auto'>
            {/* <Link to={"/edit/blog/"}>
              <li className='cursor-pointer'>
                <img src='/edit.gif' className='w-8 h-8' alt='edit' />
              </li>
            </Link> */}
            <Link to={`/view/blog/${id}`}>
              <li className='cursor-pointer'>
                <img src='/view.gif' className='w-8 h-8' alt='view' />
              </li>
            </Link>
            <li className='cursor-pointer' onClick={handleDelete}>
              <img src='/delete.gif' className='w-8 h-8' alt='delete' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserBlogCard;
