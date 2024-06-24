import Button from "@/components/ui/Button";
import FormController from "@/components/ui/FormController";
import { handleRegisterAction } from "./actions";
import RegistrationForm from "./components/RegistrationForm";

const RegisterPage = async () => {
  return (
    <main className="min-h-[93vh] flex justify-center items-center">
      <section className="container mx-auto">
        <div className="p-4 flex flex-col  rounded-lg w-full max-w-[500px] mx-auto">
          <RegistrationForm />
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
