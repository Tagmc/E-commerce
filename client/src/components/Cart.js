import { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../store/app/appSlice";
import { formatMoney } from "../utils/helpers";
import { Button } from 'primereact/button';
import { apiRemoveCart } from "../apis";
import { Toast } from 'primereact/toast';
import { getCurrent } from "../store/user/asyncAction";
import { useNavigate } from "react-router-dom";
import path from "../utils/Path";
const Cart = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCart } = useSelector(state => state.user);
  const updateCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response?.success) {
      //console.log(current);
      toast.current.show({ severity: 'success', summary: 'Success', detail: response.mes });
      dispatch(getCurrent());
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: response.mes });
    }
  }
  
  return (
    <div className="w-3 surface-900 text-white" onClick={(e) => e.stopPropagation()}>
      <header className="p-3 font-bold text-2xl flex justify-content-between align-items-center border-x-none border-solid border-1 border-top-none">
        <div>Your Cart</div>
        <div onClick={() => dispatch(showCart())} className="font-normal cursor-pointer hover:text-red-500"><i class="fa-solid fa-xmark"></i></div>
      </header>
      <section className="h-30rem overflow-y-auto py-3 px-3">
        <Toast ref={toast} />
        {!currentCart && <span className="text-sm font-italic">Your cart is empty.</span>}
        {currentCart && currentCart?.map(el => (
          <div key={el._id} className="flex gap-2 mb-2">
            <img src={el?.thumbnail} alt="thumb" className="w-4rem h-4rem" style={{ objectFit: "cover" }} />
            <div className="flex flex-column gap-1 col-6 justify-content-center">
              <span className="font-bold text-sm text-red-500">{el?.title}</span>
              <span className="text-xs">{el.color}</span>
              <span className="text-xs">{`Quantity: ${el?.quantity}`}</span>
              <span className="text-sm">{formatMoney(el?.price * el?.quantity)} VND</span>
            </div>
            <div className="flex align-items-center col-3 justify-content-end pl-2 text-xl" onClick={() => updateCart(el.product?._id, el?.color)}><span className="" ><i class="fa-regular fa-trash-can hover:bg-gray-600 cursor-pointer border-round-xl p-2"></i></span>
            </div>
          </div>
        ))}
      </section>
      <div className="px-4">
        <div className="flex align-items-center justify-content-between my-2 pt-2 border-top-1">
          <span>
            Subtotal:
          </span>
          <span>
            {formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price) * el?.quantity, 0))} VND
          </span>
        </div>
        <div className="px-0 my-3 w-12 justify-content-between flex align-items-center"><span className="text-center font-italic text-sm">Shipping, taxes, and discounts calculated at checkout.</span></div>
        <div className="w-12"><Button onClick={() => { dispatch(showCart()); navigate(`/${path.MEMBER}/${path.DETAIL_CART}`) }} className="w-12" label="Shopping Cart" severity="danger" raised /></div>
      </div>
    </div>
  )
}
export default memo(Cart);