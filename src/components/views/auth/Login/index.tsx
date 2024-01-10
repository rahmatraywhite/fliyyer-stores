import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import GoogleButton from 'react-google-button';

const LoginView = () => {
  const router = useRouter();
  const { push, query } = router;
  const callbackUrl: any = query.callbackUrl || '/';

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    try {
      setLoading(false);
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl: Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl,
      });
      if (!res?.error) {
        console.log('Login successful');
        push(callbackUrl);
      } else {
        setError('Email or password is incorrect');
        form.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="flex items-center max-w-xl mx-auto justify-center h-screen">
      <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Login</h1>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" name="email" type="email" />
            <Input label="Password" name="password" type="password" />
            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}
            <div className="flex flex-col justify-center mx-auto my-auto items-center gap-4 ">
              <GoogleButton
                onClick={() =>
                  signIn('google', { callbackUrl, redirect: false })
                }
              />
              <Button variant='w-full bg-blue-500' type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
        <p className="mt-4 text-gray-600 text-center">
          Dont have an account?{' '}
          <Link href="/auth/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
