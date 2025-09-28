import logo from "../../../assets/icons/logo-with-name-v2.svg";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-amber-900 to-primary flex items-center justify-center text-white py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <a href="#">
          <img src={logo} className="w-50 px-3" alt="Logo" />
        </a>

        <div className="flex gap-4">
          <p className="uppercase">About us</p>
          <p>|</p>
          <p className="uppercase">Tickets</p>
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
