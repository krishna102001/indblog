const Home = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3'>
      <div className='m-10 mt-20 sm:ml-32 sm:mt-32 col-span-2 '>
        <div className='relative inline-block p-[2px] text-sm ml-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500'>
          <p className='bg-gray-200 rounded-full px-2 py-1 font-extralight text-black'>
            AI Enhanced Summary
          </p>
        </div>

        <h1 className='text-6xl sm:text-8xl'>
          Human <br />
          Stories & ideas
        </h1>
        <p className='mt-8 text-xl sm:text-2xl font-light'>
          A perfect place to read, write and share your thoughts
        </p>
        <p className='bg-gray-900 rounded-full text-[#ff7002] max-w-max p-2 px-6 mt-7 hover:shadow-md hover:shadow-orange-500 hover:text-[#f59347]'>
          Start Writing
        </p>
      </div>

      <div className='ml-auto hidden sm:block'>
        <img
          src='homo-img.webp'
          alt='home-picture'
          className='w-md h-[600px]'
        />
      </div>
    </div>
  );
};

export default Home;
