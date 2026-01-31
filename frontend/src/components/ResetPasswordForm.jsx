import { useAuthStore } from "../store/useAuth.store.js";

function ResetPasswordForm() {
  const { setActiveForm, forgotPassword } = useAuthStore();

  const handleActiveForm = () => {
    setActiveForm("login/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");

    forgotPassword({ email });
  };

  return (
    <>
      <button
        className="mt-10 text-md text-teal-500"
        onClick={handleActiveForm}
      >
        {"<- Back to login"}
      </button>

      <div className="mt-3">
        <h1 className="text-3xl">Forgot your password?</h1>
        <p className="text-orange-400 text-lg">
          Please enter your email. You will receive an email to reset your
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <h4 className="text-sm font-light">Email</h4>
          <input
            type="text"
            placeholder="john.doe@example.com"
            className="w-full px-5 py-2 border border-orange-100 rounded-md"
            name="email"
          />

          <button
            type="submit"
            className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold text-center"
          >
            Receive Email
          </button>
        </div>
      </form>
    </>
  );
}

export default ResetPasswordForm;
