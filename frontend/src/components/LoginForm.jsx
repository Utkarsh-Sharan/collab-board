import { LoaderIcon } from "react-hot-toast";
import { useAuthStore } from "../store/useAuth.store.js";

function LoginForm() {
  const { isLoggingIn, setActiveTab, setActiveForm } = useAuthStore();

  const handleActiveForm = () => {
    setActiveForm("resetPassword");
  }

  const handleActiveTab = () => {
    setActiveTab("signup");
  };

  return (
    <>
      <div className="mt-10">
        <h1 className="text-3xl">Welcome Back!</h1>
        <p className="text-orange-400 text-lg">
          Please enter your details to sign in.
        </p>
      </div>

      <div className="mt-10">
        <h4 className="text-sm font-light">Email</h4>
        <input
          type="text"
          placeholder="john.doe@example.com"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="email"
        />

        <div className="mt-4 flex justify-between items-center">
          <h4 className="font-light text-sm">Password</h4>
          <a
            className="text-sm font-light text-teal-500 cursor-pointer"
            onClick={handleActiveForm}
          >
            Forgot password?
          </a>
        </div>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="password"
        />

        <button
          type="submit"
          className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <LoaderIcon className="w-full h-5 animate-spin" />
          ) : (
            "Login"
          )}
        </button>

        <div className="mt-10 text-center">
          <p>
            Don't have an account?{" "}
            <button className="text-teal-500" onClick={handleActiveTab}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
