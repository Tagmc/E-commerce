import { memo } from "react";
import { InputText } from "primereact/inputtext";

const Footer = () => {
  return (
    <div className="bottom-0 w-12">
      <div className="grid bg-red-500 align-items-center justify-content-between text-white">
        <div className="grid w-10 mx-auto justify-content-between">
          <div className="py-5 col-5" >
            <div className="text-white text-2xl">SIGN UP TO NEWSLETTER</div>
            <small className="text-400 ">Subscribe now and receive weekly newsletter</small>
          </div>
          <div className="py-5 col-6 relative">
            <InputText type="text" className="w-12 bg-red-200 border-round-xl" placeholder="Email address" />
            <i className="fa-solid fa-envelope absolute" style={{bottom: "45%", right:"5%"}}></i>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className="grid surface-800 align-items-center justify-content-between">
        <div className="grid w-10 mx-auto justify-content-between">
          <div className="col-6 lg:col-3 my-6" >
            <div className="text-white font-semibold border-solid border-3 border-y-none border-right-none border-red-500 pl-2">ABOUT US</div>
            <div className="text-sm text-white mt-3"><i class="fa-solid fa-location-dot"></i> Address:    <span className="text-sm text-400"> 474 Ontario St Toronto, ON M4X 1M7 Canada</span></div>
            <div className="text-sm text-white mt-3"><i class="fa-solid fa-phone"></i> Phone: <span className="text-sm text-400"> (+1234)56789xxx</span></div>
            <div className="text-sm text-white mt-3"><i class="fa-solid fa-envelope"></i> Mail: <span className="text-sm text-400"> tadathemes@gmail.com</span></div>
          </div>
          <div className="col-6 lg:col-3 my-6">
            <div className="text-white font-semibold border-solid border-3 border-y-none border-right-none border-red-500 pl-2">INFORMATION</div>
            <div className="text-sm text-400 mt-3">Typography</div>
            <div className="text-sm text-400 mt-3">Gallery</div>
            <div className="text-sm text-400 mt-3">Store Location</div>
            <div className="text-sm text-400 mt-3">Today's Deals</div>
            <div className="text-sm text-400 mt-3">Contact</div>
          </div>
          <div className="col-6 lg:col-3 my-6">
          <div className="text-white font-semibold border-solid border-3 border-y-none border-right-none border-red-500 pl-2">WHO WE ARE</div>
            <div className="text-sm text-400 mt-3">Help</div>
            <div className="text-sm text-400 mt-3">Free Shipping</div>
            <div className="text-sm text-400 mt-3">FAQs</div>
            <div className="text-sm text-400 mt-3">Return & Exchange</div>
            <div className="text-sm text-400 mt-3">Testimonials</div>
          </div>
          <div className="col-6 lg:col-3 my-6">
            <div className="text-white font-semibold border-solid border-3 border-y-none border-right-none border-red-500 pl-2">#DIGITALWORLDSTORE</div>
          </div>
        </div>
      </div>
      <div className="grid surface-900 align-items-center justify-content-between">
        <div className="grid w-10 text-center mx-auto ">
          <div className="col-12 text-center py-4 text-white font-semibold">CopyRight By Em Huy Tap Code</div>
        </div>
        </div>
    </div>
  )
}
export default memo(Footer);