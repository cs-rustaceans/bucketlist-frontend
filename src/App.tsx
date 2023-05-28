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
import AddUserPage from "./pages/admin/users/AddUserPage";
import EditUserPage from "./pages/admin/users/EditUserPage";
import UsersOverviewPage from "./pages/admin/users/UsersOverviewPage";
import AddDestinationToBucketListPage from "./pages/employee/destinations/AddDestinationToBucketlistPage";
import DestinationsEmployeeOverviewPage from "./pages/employee/destinations/DestinationsEmployeeOverviewPage";
import EmployeePage from "./pages/employee/EmployeePage";
import LoginPage from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";

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
    path: "/admin/users",
    element: <UsersOverviewPage />,
  },
  {
    path: "/admin/users/add",
    element: <AddUserPage />,
  },
  {
    path: "/admin/users/:userId",
    element: <EditUserPage />,
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
    path: "/destinations/:destinationId",
    element: <AddDestinationToBucketListPage />,
  },
  {
    path: "/page-not-found",
    element: <NotFoundPage />,
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
