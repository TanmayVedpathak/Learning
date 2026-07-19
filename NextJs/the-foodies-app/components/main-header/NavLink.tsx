"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

import style from "./nav-link.module.css";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  const path = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? style.active : ""}>
      {children}
    </Link>
  );
};

export default NavLink;
