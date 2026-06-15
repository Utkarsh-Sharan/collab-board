import { LoaderIcon } from "lucide-react";
import { useAuthStore } from "../../store/useAuth.store.js";
import { Check } from "lucide-react";
import { useState } from "react";

function ResetPasswordForm() {
  const [formData, setFormData] = useState({ email: "" });
  const {
    setActiveForm,
    requestPasswordReset,
    isRequestingPasswordReset,
    isResetPasswordMailSent,
  } = useAuthStore();

  const handleActiveForm = () => {
    setActiveForm("login/signup");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = () => {
    requestPasswordReset(formData);
  };

  return (
    <>
      <button
        className="mt-10 text-md text-teal-500"
        onClick={handleActiveForm}
      >
        {"<- Back to login"}
      </button>

      <div className="mt-4">
        <h1 className="text-3xl">Forgot your password?</h1>
        <p className="text-orange-400 text-lg">
          Please enter your email. You will receive an email to reset your
          password.
        </p>
      </div>

      <form>
        <div className="mt-10">
          <h4 className="text-sm font-light">Email</h4>
          <input
            type="text"
            placeholder="john.doe@example.com"
            className="w-full px-5 py-2 border border-orange-100 rounded-md"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="mt-10">
            {isResetPasswordMailSent ? (
              <div className="flex justify-center items-center gap-1">
                <Check className="text-md text-teal-500" />
                <p className="text-md text-teal-500">Email sent successfully</p>
              </div>
            ) : (
              <button
                className="bg-orange-400 w-full rounded-md py-3 text-lg font-semibold flex justify-center"
                disabled={isRequestingPasswordReset}
                onClick={handleSubmit}
              >
                {isRequestingPasswordReset ? (
                  <LoaderIcon className="w-full h-5 animate-spin" />
                ) : (
                  "Receive Email"
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default ResetPasswordForm;
