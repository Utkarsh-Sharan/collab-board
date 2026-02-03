import { LoaderIcon } from "lucide-react";
import icon from "../assets/collab-board-icon.png";
import { useAuthStore } from "../store/useAuth.store.js";
import { useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

function ResetPasswordPage() {
  const { isResettingPassword, resetForgotPassword, isPasswordReset } =
    useAuthStore();
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newPassword = formData.get("newPassword");

    resetForgotPassword(resetToken, { newPassword });
  };

  const goToLoginPage = (e) => {
    e.preventDefault();

    navigate("/login");
  };

  return (
    <main className="h-screen light-background flex items-center justify-center">
      <section className="flex-col items-center w-11/12 md:max-w-xl gap-2 border-2 border-orange-200 rounded-2xl px-10 py-20">
        <div className="flex items-center gap-2">
          <img src={icon} alt="app-image" className="w-6" />
          <h3 className="text-xl font-semibold">CollabBoard</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <h1 className="text-3xl">Hey there!</h1>
            <p className="text-orange-400 text-lg">
              Please enter your new password.
            </p>
          </div>

          {isPasswordReset ? (
            <>
              <div className="mt-10 flex justify-center items-center gap-1">
                <Check className="text-md text-teal-500" />
                <p className="text-md text-teal-500">
                  Password reset successful
                </p>
              </div>

              <button
                type="button"
                className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
                onClick={goToLoginPage}
              >
                {"<- Back to Login"}
              </button>
            </>
          ) : (
            <>
              <div className="mt-10">
                <h4 className="text-sm font-light">New Password</h4>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  className="w-full px-5 py-2 border border-orange-100 rounded-md"
                  name="newPassword"
                />
              </div>
              <button
                type="submit"
                className="mt-10 bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
                disabled={isResettingPassword}
              >
                {isResettingPassword ? (
                  <LoaderIcon className="w-full h-5 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}

export default ResetPasswordPage;
