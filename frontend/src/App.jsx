import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginSignupPage from "./pages/LoginSignupPage.jsx";
import WorkspacePage from "./pages/WorkspacePage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import PageLoader from "./components/PageLoader.jsx";
import { useAuthStore } from "./store/useAuth.store.js";
import { useEffect } from "react";
import BoardInvitePage from "./pages/BoardInvitePage.jsx";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <main className="h-screen light-background">
      <Routes>
        <Route path="/" element={<Navigate to="/workspace" />} />
        <Route
          path="/workspace/*"
          element={authUser ? <WorkspacePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={
            !authUser ? <LoginSignupPage /> : <Navigate to={"/workspace"} />
          }
        />
        <Route
          path="/reset-password/:resetToken"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/board-invite/:inviteToken"
          element={authUser ? <BoardInvitePage /> : <Navigate to={"/login"} />}
        />
      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
