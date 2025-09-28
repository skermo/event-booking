import logo from "../../../assets/icons/logo-with-name.svg";

const Header = () => {
  return (
    <header class="bg-secondary">
      <div class="mx-auto flex h-20 items-center px-4">
        <a href="#">
          <img src={logo} class="w-50 px-3" alt="Logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
