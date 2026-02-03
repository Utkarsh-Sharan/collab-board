import { LoaderIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuth.store.js";

function SignupForm() {
  const { isSigningUp, setActiveTab } = useAuthStore();

  const handleActiveTab = () => {
    setActiveTab("login");
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-3xl">Create an Account</h1>
        <p className="text-orange-400 text-lg">
          Join CollabBoard to start managing your projects.
        </p>
      </div>

      <div className="mt-10">
        <h4 className="text-sm font-light">Full Name</h4>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="fullName"
        />

        <h4 className="text-sm font-light mt-4">User Name</h4>
        <input
          type="text"
          placeholder="john-doe"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="userName"
        />

        <h4 className="text-sm font-light mt-4">Email</h4>
        <input
          type="text"
          placeholder="john.doe@example.com"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="email"
        />

        <h4 className="text-sm font-light mt-4">Password</h4>
        <input
          type="password"
          placeholder="Create a password"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="password"
        />

        <button
          type="submit"
          className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold"
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <LoaderIcon className="w-full h-5 animate-spin text-center" />
          ) : (
            "Sign Up"
          )}
        </button>

        <div className="mt-10 text-center">
          <p>
            Already have an account?{" "}
            <button className="text-teal-500" onClick={handleActiveTab}>
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
