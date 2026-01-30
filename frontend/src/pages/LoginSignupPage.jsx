import icon from "../assets/collab-board-icon.png";
import { useAuthStore } from "../store/useAuth.store.js";
import LoginForm from "../components/LoginForm.jsx";
import SignupForm from "../components/SignupForm.jsx";

function LoginSignupPage() {
  const { login, activeTab, setActiveTab, signup } = useAuthStore();

  const handleActiveTab = (e) => {
    const clickedBtn = e.target.id;

    clickedBtn === "login-btn" ? setActiveTab("login") : setActiveTab("signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (activeTab === "login") {
      login({ email, password });
    } else {
      const fullName = formData.get("fullName");
      const userName = formData.get("userName");

      signup({ email, password, fullName, userName });
    }
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
            <button
              className="text-lg font-semibold"
              id="login-btn"
              onClick={handleActiveTab}
            >
              Login
            </button>
            <button
              className="text-lg font-semibold"
              id="signup-btn"
              onClick={handleActiveTab}
            >
              Sign Up
            </button>
          </div>

          <hr />

          <form onSubmit={handleSubmit}>
            {activeTab === "login" ? <LoginForm /> : <SignupForm />}
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginSignupPage;
