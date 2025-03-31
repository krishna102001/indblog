import { useState } from "react";
import LabelledInput from "./LabelledInput";
import { signinType } from "@krishnakantmaurya/indblog-common";
import axios, { AxiosError } from "axios";
import { backend_url } from "../config";
import { toast } from "react-toastify";

const Signin = () => {
  const [signInInput, setSignInInput] = useState<signinType>({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/v1/user/signin`,
        signInInput
      );
      if (data.success) {
        setSignInInput({ email: "", password: "" });
        toast.success("Login Successfully!!");
      }
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  }
  return (
    <>
      <LabelledInput
        label='Email'
        type='email'
        value={signInInput.email}
        placeholder='indblog@gmail.com'
        onChange={(e) =>
          setSignInInput({ ...signInInput, email: e.target.value })
        }
      />
      <LabelledInput
        label='Password'
        placeholder='krishna12'
        value={signInInput.password}
        onChange={(e) =>
          setSignInInput({ ...signInInput, password: e.target.value })
        }
      />
      <button
        className='text-gray-100 bg-gradient-to-r from-[#ff1600] to-[#ff7002] p-2 px-4 rounded-full shadow-md hover:shadow-[#ff6900] mt-1'
        onClick={handleSubmit}
      >
        Login
      </button>
    </>
  );
};

export default Signin;
