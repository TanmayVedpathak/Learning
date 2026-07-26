import Link from "next/link";

import NavLink from "./NavLink";

const MainHeader = () => {
  return (
    <>
      <header id="main-header">
        <div id="logo">
          <Link href="/">NextNews</Link>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink pagePath="/news" text="News" />
            </li>
            <li>
              <NavLink pagePath="/archive" text="Archive" />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
