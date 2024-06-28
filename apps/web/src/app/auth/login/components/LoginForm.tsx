"use client";
import { FormEvent, useActionState, useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import FormController from "@/components/ui/FormController";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res && res.error) {
        setError(res.error ?? "Invalid Inputs");
      } else {
        console.log("pass");

        router.push("/");
        router.refresh(); 

      }
    } catch (err) {
      console.error(err);
      setError("Invalid Inputs");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex  flex-col space-y-3 ">
      <FormController
        label="email"
        placeholder="adam@email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <FormController
        label="password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      {error && (
        <span className="text-red-400 pt-1">{"Invalid password or email"}</span>
      )}
      <div className="py-2"></div>

      <Button className="text-gray-900 py-2">login</Button>
    </form>
  );
};

export default LoginForm;
