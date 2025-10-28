import './globals.css'
import Footer from "../../components/layout/Footer/Footer";
import Header from "../../components/layout/Header/Header";

export const metadata = {
  title: "Bookit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
