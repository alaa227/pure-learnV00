import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import { createHashRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Toaster } from "react-hot-toast";
import UserProvideer, { userCont } from "./context/User.context";
function App() {
  function RootElement() {
    const { token } = useContext(userCont); // استخدام Context للحصول على حالة المستخدم

    // إذا لم يكن هناك Token، عرض الصفحة التعريفية
    if (!token) {
      return <LandingPage />;
    }

    // إذا كان هناك Token، عرض الصفحات المحمية
    return (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    );
  }
  const routes = createHashRouter([
    // (Landing Page)
    {
      path: "/",
      element: <LandingPage />,
    },

    // ProtectedRoute /app
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },

        // { path: "goals", element: <Goals /> },

        { path: "*", element: <NotFound /> },
      ],
    },

    //
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
        // { path: "forgot-password", element: <ForgetPass /> },
        // { path: "verifyCode", element: <VerifyResetCode /> },
        // { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvideer>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </UserProvideer>
    </>
  );
}

export default App;
