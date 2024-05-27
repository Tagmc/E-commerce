import { Link } from "react-router-dom";
import { memo, useEffect } from "react";
import path from "../utils/Path";
import { getCurrent } from "../store/user/asyncAction";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../store/user/userSlice";
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector(state => state.user)
  useEffect(() => {
    const setTimeoutId = setTimeout(() => { if (isLoggedIn) dispatch(getCurrent()); }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <div className="grid p-3 bg-red-500 align-items-center text-sm text-white">
        <div className="grid w-10 mx-auto mt-2 align-items-center text-xs justify-content-between">
          <div className="text-white text-xs px-2 hover:text-color col-5 md:col-3 lg:col-3">
            ORDER ONLINE OR CALL US (+1800) 000 8808
          </div>
          <div className='h-1rem surface-300' style={{ width: "1px" }}>
          </div>
          <div className="flex align-items-center text-white lg:col-2">
            <i className="fa-solid fa-money-bill mr-1 hover:text-color"></i>
            <div className="hover:text-color">VNĐ</div>
          </div>
          <div className="col-0 md:col-2 lg:col-2"></div>
          {isLoggedIn && current ? <div className="text-sm col-5 md:col-2 lg:col-2">{`Welcome, ${current?.lastname} ${current?.firstname}`}<span className="ml-2 p-2 cursor-pointer border-circle hover:surface-300" onClick={() => dispatch(logout())}><i class="fa-solid fa-right-from-bracket"></i></span></div> : (<><Link className="px-2 hover:text-color no-underline text-white col-5 md:col-2 lg:col-2" to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
            <div className="col-1 md:col-2 lg:col-2 flex align-items-center justify-content-between">
              <div className='h-1rem surface-300' style={{ width: "1px" }}>
              </div>
              <div>
                <i class="fa-brands fa-facebook-f text-xs hover:text-color cursor-pointer"></i>
              </div>
              <div className='h-1rem surface-300' style={{ width: "1px" }}>
              </div>
              <div>
                <i class="fa-brands fa-twitter text-xs hover:text-color cursor-pointer"></i>
              </div>
              <div className='h-1rem surface-300 ' style={{ width: "1px" }}>
              </div>
              <div className="">
                <i class="fa-brands fa-instagram text-xs hover:text-color cursor-pointer"></i>
              </div>
              <div className='h-1rem surface-300' style={{ width: "1px" }}>
              </div>
              <div>
                <i class="fa-brands fa-google text-xs hover:text-color cursor-pointer"></i>
              </div></div></>)}
        </div>
      </div>
    </>
  )
}
export default memo(TopHeader);