import logo from "../../../assets/icons/logo-with-name-v1.svg";

const Header = () => {
  return (
    <header className="bg-secondary">
      <div className="mx-auto flex h-20 items-center px-4">
        <a href="#">
          <img src={logo} className="w-50 px-3" alt="Logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
