import { blogCreateType } from "@krishnakantmaurya/indblog-common";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { backend_url } from "../config";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [blog, setBlog] = useState<blogCreateType>({ title: "", content: "" });
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["image", "link"],
          ],
        },
      });
    }
  }, []);

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const content = quillRef.current.root.innerHTML;
      const { data } = await axios.post(
        `${backend_url}/api/v1/blog`,
        { ...blog, content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (data.success) {
        toast.success("Blog Published Successfully");
        setBlog({ title: "", content: "" });
        quillRef.current.root.innerHTML = "";
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };
  return (
    <div>
      <div className='flex flex-col items-center max-w-full m-2'>
        <h1 className='text-2xl font-medium underline'>Create Blog</h1>
        <form className='w-full max-w-4xl mt-10' onSubmit={handlerSubmit}>
          <div className='mb-6 w-full'>
            <label
              htmlFor='default-input'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Title
            </label>
            <input
              type='text'
              id='default-input'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              value={blog?.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            />
            <div className='mb-6 w-full mt-4'>
              <label
                htmlFor='default-input'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Content
              </label>
              <div
                ref={editorRef}
                className='w-full border border-gray-300 min-h-[150px] p-2 '
              ></div>
            </div>
            <button
              className='p-2 bg-gradient-to-r from-[#ff6550] to-[#ff7002] rounded-md hover:shadow-lg text-white'
              type='submit'
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
