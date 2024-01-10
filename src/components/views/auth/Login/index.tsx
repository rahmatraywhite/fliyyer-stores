import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const LoginView = () => {
    const router = useRouter();
    const { push, query } = router;
    const callbackUrl: any = query.callbackUrl || '/register';
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: form.email.value,
          password: form.password.value,
          callbackUrl: Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl,
        });
        if (!res?.error) {
          console.log("Login successful");
          push(callbackUrl);
        } else {
          console.error("Email or password is incorrect");
          form.reset();
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="flex items-center max-w-xl mx-auto justify-center h-screen">
      <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Login</h1>
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
              Login
            </button>
          </form>
        </div>
        <p className="mt-4 text-gray-600 text-center">
            Dont have an account? <Link href="/auth/register" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
