import { useState } from "react";
import AuthHeader from "../components/AuthHeader";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh]'>
      <div className='flex flex-col items-center'>
        <div className='bg-white rounded-md drop-shadow-lg shadow-lg p-10 px-16 min-w-96'>
          <AuthHeader isRegister={isRegister} />
          <div className='mt-4'>{isRegister ? <Signup /> : <Signin />}</div>

          <div className='flex font-extralight justify-end text-sm mt-4 cursor-pointer'>
            <p
              className='mr-1 text-blue-600 underline'
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have account ?" : "Create account now"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
