import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='flex justify-between p-4 sm:px-10 bg-gray-200 shadow-md shadow-gray-300'>
      <div className='flex items-center'>
        <img src='ib.png' alt='ind-blog-logo' className='w-10 h-10' />
        <Link to='/'>
          <span className='text-lg sm:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff1600] to-[#ff7002]'>
            Ind Blog
          </span>
        </Link>
      </div>
      <div className='flex items-center sm:gap-4 gap-2'>
        <Link to='/'>
          <p className='cursor-pointer'>Home</p>
        </Link>
        <Link to='/signin'>
          <p className='cursor-pointer bg-[#ff4f01] p-2 rounded-lg text-white sm:tracking-wider shadow-sm shadow-blue-700 hover:shadow-blue-800 hover:shadow-md'>
            Sign in
          </p>
        </Link>
        <Link to='/signup'>
          <p className='cursor-pointer bg-blue-600 p-2 rounded-lg text-white sm:tracking-wider shadow-sm shadow-blue-700 hover:shadow-[#ff4f01] hover:shadow-md'>
            Register
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
