import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const RegisterView = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      router.push('/auth/login');
    } else {
      console.log('error');
    }
  };

  return (
    <div className="flex items-center max-w-xl mx-auto justify-center h-screen">
      <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Register</h1>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
              Register
            </button>
          </form>
        </div>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account? <Link href="/auth/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
