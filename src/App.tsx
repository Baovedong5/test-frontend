import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import style from "./styles/app.module.scss";
import Header from "./components/client/header.client";
import ProductTable from "./components/admin/layout.admin";
import HomePage from "./pages/home";
import ProtectedRoute from "./components/admin/protected-router";

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <div className={style["content-app"]}>
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <ProductTable />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
