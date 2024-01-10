import Button from '@/components/ui/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="bg-gray-900 py-4">
      <div className="container mx-auto flex max-w-7xl justify-between items-center">
        <h1 className="text-white text-lg font-bold">Logo</h1>
        <Button
          variant="px-8 py-2 bg-white text-black rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
          onClick={() => (data ? signOut() : signIn())}
          type="button">
          {data ? 'Logout' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
