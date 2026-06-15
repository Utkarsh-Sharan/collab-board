import { LoaderIcon } from "lucide-react";
import { useAuthStore } from "../../store/useAuth.store.js";
import { useState } from "react";

function SignupForm() {
  const [signupFormData, setSignupFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp, setActiveTab } = useAuthStore();

  const handleActiveTab = () => {
    setActiveTab("login");
  }

  const handleChange = (e) => {
    setSignupFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = () => {
    signup(signupFormData);
  }

  return (
    <form>
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
          value={signupFormData.fullName}
          onChange={handleChange}
        />

        <h4 className="text-sm font-light mt-4">User Name</h4>
        <input
          type="text"
          placeholder="john-doe"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="userName"
          value={signupFormData.userName}
          onChange={handleChange}
        />

        <h4 className="text-sm font-light mt-4">Email</h4>
        <input
          type="text"
          placeholder="john.doe@example.com"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="email"
          value={signupFormData.email}
          onChange={handleChange}
        />

        <h4 className="text-sm font-light mt-4">Password</h4>
        <input
          type="password"
          placeholder="Create a password"
          className="w-full px-5 py-2 border border-orange-100 rounded-md"
          name="password"
          value={signupFormData.password}
          onChange={handleChange}
        />

        <button
          className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold"
          disabled={isSigningUp}
          onClick={handleSubmit}
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
    </form>
  );
}

export default SignupForm;
