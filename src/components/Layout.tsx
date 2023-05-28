import { PropsWithChildren } from "react";
import { Title } from "react-head";
import { Link } from "react-router-dom";
import { useUser } from "../lib/hooks/useUser";

interface LinkData {
  href: string;
  text: string;
  role?: string;
}

const links: LinkData[] = [
  {
    href: "/",
    text: "Home",
    role: undefined,
  },
  {
    href: "/admin",
    text: "Admin",
    role: "admin",
  },
  {
    href: "/employee",
    text: "Employee",
    role: "employee",
  },
  {
    href: "/admin/users",
    text: "Manage users",
    role: "admin",
  },
  {
    href: "/admin/destinations",
    text: "Manage destinations",
    role: "admin",
  },
  {
    href: "/destinations",
    text: "Destinations",
    role: "employee",
  },
];

export default function Layout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  const { isLoading, user, logout } = useUser();

  return (
    <>
      <Title>{title}</Title>
      {isLoading && <h2 className="text-2xl font-semibold mb-6">Loading...</h2>}
      {!isLoading && (
        <>
          <div className="bg-slate-700 p-4">
            <div className="container mx-auto px-3 text-white flex">
              <span className="font-bold mr-3">Bucket List Manager</span>
              {links
                .filter(
                  link => link.role === undefined || link.role === user?.role
                )
                .map(link => (
                  <Link to={link.href} className="px-3" key={link.href}>
                    {link.text}
                  </Link>
                ))}
              <span className="mr-auto"></span>
              {user?.role === undefined ? (
                <Link to={"/login"} className="px-3">
                  Login
                </Link>
              ) : (
                <button className="px-3" onClick={logout}>
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="container mx-auto px-3 py-6">{children}</div>
        </>
      )}
    </>
  );
}
