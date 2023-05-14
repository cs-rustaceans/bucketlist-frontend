import { HeadProvider } from "react-head";
import { QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createQueryClient from "./lib/createQueryClient";
import HomePage from "./pages";
import UserAdd from "./pages/admin/AddUser";
import AdminPage from "./pages/admin/AdminPage";
import UsersOverview from "./pages/admin/UsersOverview";
import EmployeePage from "./pages/EmployeePage";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
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
    path: "/admin/users",
    element: <UsersOverview />,
  },
  {
    path: "/admin/users/add",
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
