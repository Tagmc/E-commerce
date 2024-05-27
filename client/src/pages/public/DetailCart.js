import { useSelector } from "react-redux";
import { Link, createSearchParams, redirect, useLocation, useNavigate } from 'react-router-dom';
import { formatMoney } from "../../utils/helpers";
import { Button } from 'primereact/button';
import OrderItem from "../../components/OrderItem";
import path from "../../utils/Path";
import Swal from "sweetalert2";
const DetailCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentCart, current } = useSelector(state => state.user);
  const handleSubmit = () => {
    if (!current?.address) {
      return Swal.fire({
        icon: 'info',
        title: 'Almost',
        text: 'Please update your address before checkout',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Go update',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({redirect: location.pathname}).toString()
          })
        }
      });
    } else {
      window.open(`/${path.CHECK_OUT}`, '_blank')
    }
  }
  return (
    <>
      <div className="w-12">
        <div className="h-5rem flex justify-content-between align-items-center text-2xl font-bold px-4 border-200 border-1 border-x-none border-top-none">
          <span>My Cart</span>
        </div>
        <div className="grid w-11 mx-auto my-3 border-solid border-1 ">
          <div className="col-6 text-center border-right-1 border-bottom-1 font-bold text-white bg-red-500">Products</div>
          <div className="col-3 text-center border-right-1 border-bottom-1 font-bold text-white bg-red-500">Quantity</div>
          <div className="col-3 text-center font-bold text-white border-bottom-1 bg-red-500">Price</div>
          {currentCart?.map(el => (
            <OrderItem el={el} key={el._id} defaultQuantity={el?.quantity} />
          ))}
        </div>
        <div className="w-11 mt-3 mb-5 flex flex-column align-items-end justify-content-center gap-3">
          <div className="flex w-12">
            <div className="col-9"></div>
            <div className="col-3 flex justify-content-between">
              <span>
                Subtotal:
              </span>
              <span className=" font-semibold text-base">{formatMoney(currentCart?.reduce((sum, el) => +el?.price * el?.quantity + sum, 0))} VNĐ</span>
            </div>
          </div>
          <span className="font-italic text-sm">Shipping, taxes, discounts calculated at checkout</span>
          <Button onClick={handleSubmit} label="Check out" severity="danger" className="text-white font-bold" />
        </div>
      </div>
    </>
  )
}
export default DetailCart;