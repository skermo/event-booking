import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo-with-name-v1.svg";
import searchIcon from "../../../assets/icons/search-icon.svg";
import { HOME, SEARCH } from "../../../routes/routes.js";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-secondary">
      <div className="flex justify-between items-center">
        <div className="flex h-20 items-center px-4">
          <img
            src={logo}
            className="w-50 px-3 cursor-pointer"
            alt="Logo"
            onClick={() => navigate(HOME)}
          />
        </div>
        <Link to={SEARCH} className="text-white font-bold font-xl px-3">
          <img
            src={searchIcon}
            className="w-15 px-3 cursor-pointer"
            alt="Logo"
            onClick={() => navigate(HOME)}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
