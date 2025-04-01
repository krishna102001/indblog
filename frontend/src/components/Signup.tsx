import { useState } from "react";
import LabelledInput from "./LabelledInput";
import { signupType } from "@krishnakantmaurya/indblog-common";
import axios, { AxiosError } from "axios";
import { backend_url } from "../config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signUpInput, setSignUpInput] = useState<signupType>({
    name: "",
    email: "",
    password: "",
  });
  const { setUserData } = useAppContext();
  const navigate = useNavigate();
  async function handleSubmit() {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/v1/user/signup`,
        signUpInput
      );
      if (data.success) {
        toast.success("Registered Successfully!!");
        setSignUpInput({ name: "", email: "", password: "" });
        localStorage.setItem("token", data.jwt_token);
        if (data.token) {
          const user: signupType = jwtDecode(data.jwt_token);
          setUserData(user);
          navigate("/blogs");
        }
      }
      console.log(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || err.message);
      }
    }
  }
  return (
    <>
      <LabelledInput
        label='Name'
        placeholder='Krishna'
        value={signUpInput.name}
        onChange={(e) =>
          setSignUpInput({ ...signUpInput, name: e.target.value })
        }
      />
      <LabelledInput
        label='Email'
        type='email'
        value={signUpInput.email}
        placeholder='indblog@gmail.com'
        onChange={(e) =>
          setSignUpInput({ ...signUpInput, email: e.target.value })
        }
      />
      <LabelledInput
        label='Password'
        value={signUpInput.password}
        placeholder='krishna12'
        onChange={(e) =>
          setSignUpInput({ ...signUpInput, password: e.target.value })
        }
      />
      <button
        className='text-gray-100 bg-gradient-to-r from-[#ff1600] to-[#ff7002] p-2 px-4 rounded-full shadow-md hover:shadow-[#ff6900] mt-1'
        onClick={handleSubmit}
      >
        Register
      </button>
    </>
  );
};

export default Signup;
