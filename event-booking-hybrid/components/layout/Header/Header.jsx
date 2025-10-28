import Link from "next/link";
import logo from "../../../public/icons/logo-with-name-v1.svg";
import searchIcon from "../../../public/icons/search-icon.svg";
import { HOME, SEARCH } from "../../../routes/routes.js";

const Header = () => {
  return (
    <header className="bg-secondary">
      <div className="flex justify-between items-center">
        <div className="flex h-20 items-center px-4">
          <Link href={HOME}>
            <img
              src={logo.src}
              className="w-50 px-3 cursor-pointer"
              alt="Logo"
            />
          </Link>
        </div>
        <Link href={SEARCH} className="text-white font-bold font-xl px-3">
          <img
            src={searchIcon.src}
            className="w-15 px-3 cursor-pointer"
            alt="Search"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
