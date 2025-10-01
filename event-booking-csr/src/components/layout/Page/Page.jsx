import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Page = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Page;
