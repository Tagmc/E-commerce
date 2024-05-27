import logo from '../assets/logo_digital_new_250x.png';
import 'primeicons/primeicons.css';
import { Avatar } from 'primereact/avatar';
import { Link } from 'react-router-dom';
import path from "../utils/Path";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { showCart } from '../store/app/appSlice';
const Header = () => {
  const dispatch = useDispatch();
  const { current } = useSelector(state => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="grid w-full justify-content-between align-items-center h-7rem py-4 mb-4">
      <Link to={`/${path.HOME}`} className='col-12 md:col-4'>
        <img src={logo} alt="" />
      </Link>
      <div className='col-4 lg:col-2'>
        <div className='flex align-items-center text-sm'>
          <i className=" mr-1 fa-solid fa-phone text-red-500"></i>
          <div className='font-semibold'>(+1800) 000 8808</div>
        </div>
        <small className='text-xs'>Mon-Sat 9:00AM - 8:00PM</small>
      </div>
      <div className='h-3rem surface-300' style={{ width: "1px" }}>
      </div>
      <div className='text-center'>
        <div className='flex align-items-center text-sm'>
          <i className="fa-solid fa-envelope mr-1 text-red-500"></i>
          <div className='font-semibold'>SUPPORT@TADATHEMES.COM</div>
        </div>
        <small className='text-xs'>Online Support 24/7</small>
      </div>
      <div className='h-3rem surface-300' style={{ width: "1px" }}>
      </div>
      <div className=''>
        <i className='text-3xl pi pi-heart text-red-500' ></i>
      </div>
      <div className='h-3rem surface-300' style={{ width: "1px" }}>
      </div>
      {current && <>
        <div onClick={() => dispatch(showCart())} className='cursor-pointer flex align-items-center justify-content-center gap-2'>
          <div className='flex align-items-center text-xl mr-2'>
            <i class="fa-solid fa-bag-shopping mr-1 text-red-500 cursor-pointer"></i>
            <div className='text-sm'>{current?.cart?.length || 0} item(s)</div>
          </div>
        </div>
        <div className='h-3rem surface-300' style={{ width: "1px" }}></div>
        <div className='col-6 md:col-2 lg:col-2 justify-content-start flex align-items-center no-underline relative text-sm cursor-pointer '
          onClick={() => setIsShowOption(prev => !prev)}
        >
          <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className="mr-2 cursor-pointer" shape="circle" />
          <div className='hover:text-red-500'>Profile</div>
          {isShowOption && <div className='absolute top-100 left-0 bg-gray-100 p-1 w-12 flex flex-column'>
            <Link className='p-2  no-underline text-color hover:bg-blue-100 ' to={`/${path.MEMBER}/${path.PERSONAL}`}>Personal</Link>
            {current.role === "1945" && <Link className='p-2 text-color no-underline hover:bg-blue-100 ' to={`${path.ADMIN}/${path.DASHBOARD}`}>Admin Workspace</Link>}
          </div>}
        </div> </>}
    </div >
  );
}
export default Header;