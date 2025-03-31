import { ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 py-10'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
