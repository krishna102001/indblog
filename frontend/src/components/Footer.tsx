const Footer = () => {
  return (
    <div className='bg-gray-700 text-white p-2 sm:p-4  sm:px-10'>
      <div className='flex flex-col justify-center'>
        <div className='flex justify-between items-center'>
          <span className='font-semibold sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff1600] to-[#ff7002] mb-1'>
            Ind Blog
          </span>
          <p>
            Made in ❤️ by{" "}
            <a
              href='https://github.com/krishna102001'
              className='hover:underline hover:underline-offset-4 hover:decoration-[#ff7002]  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500'
              target='_blank'
            >
              Krishna
            </a>
          </p>
        </div>
        <hr />
        <div className='flex justify-center items-center mt-1 text-sm sm:text-lg'>
          <span className='text-lg pr-1'>&#169;</span>
          {new Date().getFullYear()} IND BLOG™. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
