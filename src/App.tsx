import { HeadProvider } from "react-head";
import { QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createQueryClient from "./lib/createQueryClient";
import HomePage from "./pages";
import UserAdd from "./pages/admin/add_user";
import AdminPage from "./pages/admin/admin";
import ManageUsers from "./pages/admin/manage_users";
import EmployeePage from "./pages/employee";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/employee",
    element: <EmployeePage />,
  },
  {
    path: "/admin/manage-users",
    element: <ManageUsers />,
  },
  {
    path: "/admin/manage-users/add",
    element: <UserAdd />,
  },
]);

function App() {
  return (
    <HeadProvider>
      <QueryClientProvider client={createQueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HeadProvider>
  );
}

export default App;
