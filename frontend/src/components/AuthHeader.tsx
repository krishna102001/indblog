const AuthHeader = () => {
  return (
    <div className=' flex flex-col items-center'>
      <img src='ib.png' alt='ib-logo' className='w-16 h-16' />
      <div className='mt-2 flex flex-col items-center text-'>
        <p className='text-lg font-medium capitalize tracking-wide'>
          Welcome back to Ind Blog 🔥
        </p>
        <h1 className='mt-2 text-sm'>Can't wait for you too Login</h1>
      </div>
    </div>
  );
};

export default AuthHeader;
