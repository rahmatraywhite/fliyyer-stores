import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className='bg-gray-900 py-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-white text-lg font-bold'>Ngasal Ae</h1>
        <button
          onClick={() => (data ? signOut() : signIn())}
          className='px-8 py-2 bg-white text-black rounded-md hover:bg-blue-600 hover:text-white transition duration-300'
        >
          {data ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
