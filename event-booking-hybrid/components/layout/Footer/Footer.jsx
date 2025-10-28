import Link from "next/link";
import logo from "../../..//public/icons/logo-with-name-v2.svg";
import * as routes from "../../../routes/routes.js";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-amber-900 to-primary flex items-center justify-center text-white py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <Link href="#">
          <img src={logo.src} className="w-50 px-3" alt="Logo" />
        </Link>

        <div className="flex gap-4">
          <Link href={routes.ABOUT_US} className="uppercase">
            About us
          </Link>
          <p>|</p>
          <Link href={routes.SEARCH} className="uppercase">
            Tickets
          </Link>
        </div>
        <p>
          Copyright @Bookit. Built with love in Bosnia and Herzegovina. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
