"use client";
import Button from "@/components/ui/Button";
import FormController from "@/components/ui/FormController";
import { handleRegisterAction } from "../actions";
import { useState } from "react";

export default function RegistrationForm() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });
  return (
    <form
      action={async function (data) {
        const res = await handleRegisterAction({
          email: data.get("email") as string,
          password: data.get("password") as string,
          username: data.get("username") as string,
        });
        if (res && res.validationErrors)
          setErrors({
            email: res?.validationErrors?.email?._errors as unknown as string,
            password: res?.validationErrors?.password?._errors as unknown as string,
            username: res?.validationErrors?.username?._errors as unknown as string,
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
      <div className="py-2"></div>
      <Button className="text-gray-900 py-2">register</Button>
    </form>
  );
}
