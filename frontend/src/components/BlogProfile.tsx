const BlogProfile = ({ name }: { name: string }) => {
  return (
    <div className='flex items-center mb-1'>
      <div className='relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-300 rounded-full cursor-pointer '>
        <span className='text-xs text-gray-600 '>{name[0]}</span>
      </div>
      <div className='flex items-center text-gray-400 ml-1'>
        <h1 className='text-xs'>{name}</h1>
        <div className='bg-gray-300 w-1 h-1 rounded-full mx-1'></div>
        <p className='text-xs'>23 Feb 2025</p>
      </div>
    </div>
  );
};

export default BlogProfile;
