import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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
            <Input label="Email" name="email" type="email" />
            <Input label="Fullname" name="fullname" type="text" />
            <Input label="Phone" name="phone" type="tel" />
            <Input label="Password" name="password" type="password" />
            <Button type="submit" variant="px-8 py-2 bg-blue-600 text-white w-full rounded-md hover:bg-gray-300 hover:text-blue-600 transition duration-300">Register</Button>
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
