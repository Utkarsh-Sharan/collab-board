import { LoaderIcon } from "react-hot-toast";
import icon from "../assets/collab-board-icon.png";
import { useAuthStore } from "../store/useAuth.store.js";

function LoginSignupPage() {
  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    login({email, password});
  };

  return (
    <>
      <section className="h-screen light-background flex items-center justify-center">
        {/* Left Half */}
        <div className="flex-col items-center w-2/4 gap-2 border-2 border-orange-200 rounded-2xl px-10 py-20">
          <div className="flex items-center gap-2">
            <img src={icon} alt="app-image" className="w-6" />
            <h3 className="text-xl font-semibold">CollabBoard</h3>
          </div>

          <div className="flex items-center gap-10 mt-10">
            <button className="text-lg font-semibold">Login</button>
            <button className="text-lg font-semibold">Sign Up</button>
          </div>

          <hr />

          <div className="mt-10">
            <h1 className="text-3xl">Welcome Back!</h1>
            <p className="text-orange-400 text-lg">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-10">
              <h4 className="text-lg font-light">Email</h4>
              <input
                type="text"
                placeholder="Enter your email..."
                className="w-full px-5 py-2 border border-orange-100 rounded-md"
                name="email"
              />

              <h4 className="text-lg font-light mt-2">Password</h4>
              <input
                type="password"
                placeholder="Enter your password..."
                className="w-full px-5 py-2 border border-orange-100 rounded-md"
                name="password"
              />

              <button
                type="submit"
                className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (<LoaderIcon className="w-full h-5 animate-spin text-center"/>) : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p>
              Don't have an account?{" "}
              <a href="#" className="text-teal-500">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginSignupPage;
