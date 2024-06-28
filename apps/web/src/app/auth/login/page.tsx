import LoginForm from "./components/LoginForm";

const LoginPage = () => {

  return (
    <main className="min-h-[93vh] flex justify-center items-center">
      <section className="container mx-auto">
        <div className="p-4 flex flex-col  rounded-lg w-full max-w-[500px] mx-auto">
          <LoginForm />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
