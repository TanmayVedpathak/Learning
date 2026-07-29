"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  pagePath: string;
  text: string;
};

const NavLink = ({ pagePath, text }: NavLinkProps) => {
  const path = usePathname();

  return (
    <>
      <Link href={pagePath} className={path.startsWith(`${pagePath}`) ? "active" : ""}>
        {text}
      </Link>
    </>
  );
};

export default NavLink;
