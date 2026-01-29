import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginSignupPage from "./pages/LoginSignupPage.jsx";
import { useAuthStore } from "./store/useAuth.store.js";
import PageLoader from "./components/PageLoader.jsx";
import { useEffect } from "react";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/workspace" />} />
        <Route
          path="/workspace"
          element={authUser ? <WorkspacePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={
            !authUser ? <LoginSignupPage /> : <Navigate to={"/workspace"} />
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
