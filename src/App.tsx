import { HeadProvider } from "react-head";
import { QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createQueryClient from "./lib/createQueryClient";
import { UserProvider } from "./lib/hooks/useUser";
import HomePage from "./pages";
import UserAdd from "./pages/admin/AddUser";
import AdminPage from "./pages/admin/AdminPage";
import EditUser from "./pages/admin/EditUser";
import UsersOverview from "./pages/admin/UsersOverview";
import EmployeePage from "./pages/EmployeePage";
import Login from "./pages/Login";
import { PageNotFound } from "./pages/PageNotFound";

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
  {
    path: "/admin/users/:userId",
    element: <EditUser />,
  },
  {
    path: "/page-not-found",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <HeadProvider>
      <QueryClientProvider client={createQueryClient()}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </QueryClientProvider>
    </HeadProvider>
  );
}

export default App;
