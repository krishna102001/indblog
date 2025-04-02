import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const Navbar = () => {
  const { userData, setUserData } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleAvatarClick = () => {
    setShowLogout((prev) => !prev);
  };
  const handleLogout = () => {
    console.log("User logged out");
    setShowLogout(false);
    localStorage.removeItem("token");
    setUserData(undefined);
    navigate("/");
  };
  return (
    <div className='flex justify-between p-4 sm:px-10 bg-gray-200 shadow-md shadow-gray-300'>
      <div className='flex items-center'>
        <img
          src='/ib.png'
          alt='ind-blog-logo'
          className='sm:w-10 sm:h-10 w-6 h-6'
        />
        <Link to='/'>
          <span className='text-lg sm:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff1600] to-[#ff7002]'>
            Ind Blog
          </span>
        </Link>
      </div>
      {userData ? (
        <div className='relative'>
          <div className=' flex items-center'>
            <div className='flex items-center mr-4 sm:mr-8 gap-4 sm:gap-8 font-light'>
              <Link to='/blogs'>
                <div className='flex gap-1 items-center justify-center'>
                  <img
                    src='/open-blog.png'
                    alt='read-blog-logo'
                    className='w-4 h-4'
                  />
                  <p className='hover:underline hover:text-[#ff7002] cursor-pointer'>
                    Read Blogs
                  </p>
                </div>
              </Link>
              <Link to='/create/blog'>
                <div className='flex gap-1 items-center justify-center'>
                  <img
                    src='/write-blog.png'
                    alt='read-blog-logo'
                    className='w-4 h-4'
                  />
                  <p className='hover:underline hover:text-[#ff7002] cursor-pointer'>
                    Write
                  </p>
                </div>
              </Link>
            </div>
            <div
              className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full cursor-pointer '
              onClick={handleAvatarClick}
            >
              <span className='font-medium text-gray-600 '>
                {userData.name[0]}
              </span>
            </div>
            {showLogout && (
              <div className='absolute mt-2 right-0 top-10 bg-white border border-cyan-400 shadow-lg rounded-lg p-2 '>
                <p className='w-full p-1 text-sm text-red-500 hover:text-orange-500 border-b text-left m-1'>
                  Your Blog
                </p>
                <button
                  onClick={handleLogout}
                  className='w-full p-1 text-sm text-red-500 hover:text-orange-500  text-left m-1'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex items-center sm:gap-4 gap-2 font-extralight'>
          <Link to='/'>
            <p className='cursor-pointer text-md mr-4'>Home</p>
          </Link>
          <Link to='/signin'>
            <p className='cursor-pointer bg-[#ff4f01] p-2 px-4 rounded-full text-white text-sm sm:tracking-wider shadow-sm shadow-blue-700 hover:shadow-blue-800 hover:shadow-md'>
              Get Started
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
