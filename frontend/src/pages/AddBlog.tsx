import { blogCreateType } from "@krishnakantmaurya/indblog-common";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { backend_url } from "../config";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [blog, setBlog] = useState<blogCreateType>({ title: "", content: "" });
  const [file, setFile] = useState<File | undefined>();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill>(null);
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const { data } = await axios.post(
            `${backend_url}/api/v1/blog/image-upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (data.success) {
            const url = data.url;
            const range = quillRef.current?.getSelection();
            if (range && range.index !== undefined) {
              quillRef.current?.insertEmbed(range.index, "image", url);
            }
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
            console.error(error);
          }
        }
      }
    };
  };
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ font: [] }],
              [{ header: [1, 2, 3, 4, 5, false] }],
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["image", "link"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        },
      });
    }
  }, []);
  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const content = quillRef.current?.root.innerHTML;
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", content || "");
      if (typeof file === "undefined") {
        return;
      }
      formData.append("image", file);
      const { data } = await axios.post(
        `${backend_url}/api/v1/blog`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // console.log(data);
      if (data.success) {
        toast.success("Blog Published Successfully");
        setBlog({ title: "", content: "" });
        setFile(undefined);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
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
              required
            />
            <label
              className='block mb-2 text-sm font-medium text-gray-900 mt-4'
              htmlFor='file_input'
            >
              Title Image
            </label>
            <input
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5'
              id='file_input'
              type='file'
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target?.files[0]);
                }
              }}
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
