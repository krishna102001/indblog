import { useState } from "react";
import LabelledInput from "../components/LabelledInput";
import { signinType } from "@krishnakantmaurya/indblog-common";
import AuthHeader from "../components/AuthHeader";

const Auth = () => {
  const [signInInput, setSignInInput] = useState<signinType>({
    email: "",
    password: "",
  });
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh]'>
      <div className='flex flex-col items-center'>
        {/* {JSON.stringify(signInInput)} */}
        <div className='bg-white rounded-md drop-shadow-lg shadow-lg p-10 px-16'>
          <AuthHeader />
          <div className='mt-4'>
            <LabelledInput
              label='Email'
              type='email'
              placeholder='indblog@gmail.com'
              onChange={(e) =>
                setSignInInput({ ...signInInput, email: e.target.value })
              }
            />
            <LabelledInput
              label='Password'
              placeholder='krishna12'
              onChange={(e) =>
                setSignInInput({ ...signInInput, password: e.target.value })
              }
            />
          </div>
          <button className='text-gray-100 bg-gradient-to-r from-[#ff1600] to-[#ff7002] p-2 px-4 rounded-full shadow-md hover:shadow-[#ff6900] mt-1'>
            Login
          </button>
          <div className='flex font-extralight justify-end text-xs mt-4'>
            <p className='mr-1 text-blue-600 underline'>Create account now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
