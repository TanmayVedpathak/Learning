import Image from "next/image";
import Link from "next/link";

import logoImg from "@/assets/logo.png";

import style from "./main-header.module.css";

import NavLink from "./NavLink";

const MainHeader = () => {
  return (
    <>
      <header className={style.header}>
        <Link className={style.logo} href="/">
          <Image src={logoImg} alt="Restaurant logo" width={80} height={80} preload />
          NextLevel Food
        </Link>

        <nav className={style.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
