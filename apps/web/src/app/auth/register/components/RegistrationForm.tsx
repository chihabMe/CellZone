"use client";
import Button from "@/components/ui/Button";
import FormController from "@/components/ui/FormController";
import { handleRegisterAction } from "../actions";
import { useState } from "react";

export default function RegistrationForm() {
  const [error, setError] = useState("");
  return (
    <form
      action={async function (data) {
        const res = await handleRegisterAction(data);
        setError(res.error);
      }}
      className="flex  flex-col space-y-3 "
    >
      <FormController
        name="email"
        label="email"
        placeholder="adam@email.com"
        type="email"
      />

      <FormController
        name="username"
        label="username"
        placeholder="username"
        type="text"
      />
      <FormController
        name="password"
        label="password"
        placeholder="password"
        type="password"
      />
      {error && <span className="text-red-400 pt-1">{error}</span>}
      <div className="py-2"></div>
      <Button className="text-gray-900 py-2">register</Button>
    </form>
  );
}
