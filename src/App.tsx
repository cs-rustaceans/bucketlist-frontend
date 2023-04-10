import { HeadProvider } from "react-head";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages";
import AdminPage from "./pages/admin";
import EmployeePage from "./pages/employee";
import LoginPage from "./pages/login";
import { QueryClientProvider } from "react-query";
import createQueryClient from "./lib/createQueryClient";

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
