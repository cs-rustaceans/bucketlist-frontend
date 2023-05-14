import Cookies from "js-cookie";
import { PropsWithChildren } from "react";
import { Title } from "react-head";
import { Link } from "react-router-dom";

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
];

export default function Layout({ children }: PropsWithChildren) {
  const role = Cookies.get("role");
  return (
    <>
      <Title>Mama are mere</Title>
      <div className="bg-slate-700 p-4">
        <div className="container mx-auto px-3 text-white flex">
          <span className="font-bold mr-3">Bucket List Manager</span>
          {links
            .filter(link => link.role === undefined || link.role === role)
            .map(link => (
              <Link to={link.href} className="px-3" key={link.href}>
                {link.text}
              </Link>
            ))}
          <span className="mr-auto"></span>
          {role === undefined ? (
            <Link to={"/login"} className="px-3">
              Login
            </Link>
          ) : (
            <Link to={"/logout"} className="px-3">
              Logout
            </Link>
          )}
        </div>
      </div>
      <div className="container mx-auto px-3 py-6">{children}</div>
    </>
  );
}
