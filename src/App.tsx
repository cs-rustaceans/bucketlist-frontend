import { HeadProvider } from "react-head";
import { QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createQueryClient from "./lib/createQueryClient";
import { UserProvider } from "./lib/hooks/useUser";
import HomePage from "./pages";
import AdminPage from "./pages/admin/AdminPage";
import AddDestinationPage from "./pages/admin/destinations/AddDestinationPage";
import DestinationsOverviewPage from "./pages/admin/destinations/DestinationsOverviewPage";
import EditDestinationPage from "./pages/admin/destinations/EditDestinationPage";
import UserAdd from "./pages/admin/users/AddUser";
import EditUser from "./pages/admin/users/EditUser";
import UsersOverview from "./pages/admin/users/UsersOverview";
import DestinationsEmployeeOverviewPage from "./pages/employee/destinations/DestinationsEmployeeOverviewPage";
import EmployeePage from "./pages/employee/EmployeePage";
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
    path: "/admin/destinations",
    element: <DestinationsOverviewPage />,
  },
  {
    path: "/admin/destinations/add",
    element: <AddDestinationPage />,
  },
  {
    path: "/admin/destinations/:destinationId",
    element: <EditDestinationPage />,
  },
  {
    path: "/destinations",
    element: <DestinationsEmployeeOverviewPage />,
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
