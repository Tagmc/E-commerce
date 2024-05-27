import { Outlet } from "react-router-dom";
import { Header, Navigation } from "../../components";
import TopHeader from "../../components/TopHeader";
import Footer from "../../components/Footer";


function Public() {
  return (
    <>
      <TopHeader />
      <div className="grid w-10 flex-column mx-auto align-items-center mt-2">
        <div className="col-12 mb-5"><Header /></div>
        <Navigation />
          <Outlet />
        </div>
      <Footer />
    </>

  );
};

export default Public;