import icon from "../assets/collab-board-icon.png";
import { useAuthStore } from "../store/useAuth.store.js";
import LoginForm from "../components/LoginForm.jsx";
import SignupForm from "../components/SignupForm.jsx";
import ResetPasswordForm from "../components/ResetPasswordForm.jsx";

function LoginSignupPage() {
  const { activeForm, activeTab, setActiveTab } = useAuthStore();

  const handleActiveTab = (e) => {
    const clickedBtn = e.target.id;

    clickedBtn === "login-btn" ? setActiveTab("login") : setActiveTab("signup");
  };

  return (
    <>
      {/* Left Half */}
      <section className="flex-col items-center w-11/12 md:max-w-xl gap-2 border-2 border-orange-200 rounded-2xl px-10 py-20">
        <div className="flex items-center gap-2">
          <img src={icon} alt="app-image" className="w-6" />
          <h3 className="text-xl font-semibold">CollabBoard</h3>
        </div>

        {activeForm === "login/signup" ? (
          <>
            <div className="flex items-center gap-10 mt-10">
              <button
                className={`text-lg font-semibold ${activeTab === "login" ? "border-b-4 border-orange-400" : "border-b-4 border-transparent"}`}
                id="login-btn"
                onClick={handleActiveTab}
              >
                Login
              </button>
              <button
                className={`text-lg font-semibold ${activeTab === "signup" ? "border-b-4 border-orange-400" : "border-b-4 border-transparent"}`}
                id="signup-btn"
                onClick={handleActiveTab}
              >
                Signup
              </button>
            </div>

            <div className="border-b-2 border-orange-200"></div>

            {activeTab === "login" ? <LoginForm /> : <SignupForm />}
          </>
        ) : (
          <ResetPasswordForm />
        )}
      </section>
    </>
  );
}

export default LoginSignupPage;
