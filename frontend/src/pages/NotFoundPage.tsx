import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className='relative flex items-center justify-center h-screen bg-white overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-full opacity-40 z-0'></div>
      <div className='text-center p-8 bg-white rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 z-10 border border-gray-400'>
        <h1 className='text-6xl font-extrabold text-red-500'>404</h1>
        <p className='mt-4 text-xl text-gray-700'>Page Not Found</p>
        <div className='mt-6'>
          <Link
            to='/'
            className='inline-block px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-lg hover:bg-indigo-600'
          >
            Go Home
          </Link>
        </div>
        <div className='mt-4 text-sm text-gray-600'>
          <p>Looks like you're lost in space!</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
