"use client";
import Button from "@/components/ui/Button";
import FormController from "@/components/ui/FormController";
import { handleRegisterAction } from "../actions";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";

export default function RegistrationForm() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { execute, isExecuting, hasSucceeded, result } =
    useAction(handleRegisterAction);
  useEffect(() => {
    if (!isExecuting && !hasSucceeded) {
      setErrors({
        email: result?.validationErrors?.email?._errors as unknown as string,
        password: result?.validationErrors?.password
          ?._errors as unknown as string,
        username: result?.validationErrors?.username
          ?._errors as unknown as string,
      });
    }
  }, [isExecuting, hasSucceeded]);
  return (
    <form
      action={async function (data) {
        await execute({
          email: data.get("email") as string,
          password: data.get("password") as string,
          username: data.get("username") as string,
        });
      }}
      className="flex  flex-col space-y-3 "
    >
      <FormController
        name="email"
        label="email"
        placeholder="adam@email.com"
        error={errors.email}
        type="email"
      />

      <FormController
        name="username"
        label="username"
        placeholder="username"
        error={errors.username}
        type="text"
      />
      <FormController
        error={errors.password}
        name="password"
        label="password"
        placeholder="password"
        type="password"
      />
      {result.serverError && (
        <div className="py-4">
          <span className="text-red-400 pt-1">{result.serverError}</span>
        </div>
      )}

      <Button className="text-gray-900 py-2">register</Button>
    </form>
  );
}
