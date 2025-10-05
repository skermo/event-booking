import { useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo-with-name-v1.svg";
import { HOME } from "../../../routes/routes.js";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-secondary">
      <div className="mx-auto flex h-20 items-center px-4">
        <img
          src={logo}
          className="w-50 px-3 cursor-pointer"
          alt="Logo"
          onClick={() => navigate(HOME)}
        />
      </div>
    </header>
  );
};

export default Header;
