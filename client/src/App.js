import { Routes, Route } from 'react-router-dom';
import { Login, Home, Public } from './pages/public';
import path from './utils/Path';
import { useEffect } from 'react';
import { getCategories } from "./store/app/asyncAction";
import 'primeicons/primeicons.css';
import { useDispatch, useSelector } from 'react-redux';
import '/node_modules/primeflex/primeflex.css';
import FAQ from './pages/public/FAQ';
import Product from './pages/public/Product';
import Blogs from './pages/public/Blogs';
import DetailProduct from './pages/public/DetailProduct';
import Services from './pages/public/Services';
import FinalRegister from './pages/public/FRegister';
import ResetPassword from './pages/public/ResetPassword';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageUser from './pages/admin/ManageUser';
import ManageOrder from './pages/admin/ManageOrder';
import ManageProduct from './pages/admin/ManageProduct';
import CreateProduct from './pages/admin/CreateProduct';
import MemberLayout from './pages/member/MemberLayout';
import Personal from './pages/member/Personal';
import MyCart from './pages/member/MyCart';
import History from './pages/member/History';
import WishList from './pages/member/WishList';
import Cart from './components/Cart';
import { showCart } from './store/app/appSlice';
import DetailCart from './pages/public/DetailCart';
import Checkout from './pages/member/Checkout';
function App() {
  const dispatch = useDispatch();
  const { isShowCart } = useSelector(state => state.app);
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className='relative'>
      {isShowCart && <div onClick={() => dispatch(showCart())} className='absolute top-0 right-0 left-0 bottom-0 bg-black-alpha-50 z-5 flex justify-content-end'>
        <Cart />
      </div>}
      <Routes>
        <Route path={path.CHECK_OUT} element={<Checkout />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS__CATEGORY} element={<Product />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<DetailCart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<WishList />} />
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
