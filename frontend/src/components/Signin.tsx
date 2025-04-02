import { useState } from "react";
import LabelledInput from "./LabelledInput";
import { signinType } from "@krishnakantmaurya/indblog-common";
import axios, { AxiosError } from "axios";
import { backend_url } from "../config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [signInInput, setSignInInput] = useState<signinType>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { setUserData } = useAppContext();
  const navigate = useNavigate();

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backend_url}/api/v1/user/signin`,
        signInInput
      );
      if (data.success) {
        setSignInInput({ email: "", password: "" });
        toast.success("Login Successfully!!");
        localStorage.setItem("token", data.jwt_token);
        if (data.jwt_token) {
          const user: { name: string; email: string; id: string } = jwtDecode(
            data.jwt_token
          );
          setUserData(user);
          setIsLoading(false);
          navigate("/blogs");
        }
      }
      console.log(data);
    } catch (error: unknown) {
      setIsLoading(false);
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
        disabled={isLoading}
        className={`text-gray-100 bg-gradient-to-r from-[#ff1600] to-[#ff7002] p-2 px-4 rounded-full shadow-md hover:shadow-[#ff6900] mt-1 ${
          isLoading && "text-gray-900"
        } `}
        onClick={handleSubmit}
        type='button'
      >
        Login
      </button>
    </>
  );
};

export default Signin;
