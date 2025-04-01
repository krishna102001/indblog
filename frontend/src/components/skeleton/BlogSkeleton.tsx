const BlogSkeleton = () => {
  return (
    <div className='max-w-full animate-pulse flex-1 mt-4'>
      <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-6xl mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-5xl mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-4xl mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default BlogSkeleton;
