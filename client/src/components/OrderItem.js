import { formatMoney } from "../utils/helpers";
import { InputNumber } from 'primereact/inputnumber';
import { useState, useEffect } from "react";
import { updateCart } from "../store/user/userSlice";
import { useDispatch } from "react-redux";

const OrderItem = ({ el, defaultQuantity = 1 }) => {
  const [quantity, setQuatity] = useState(() => defaultQuantity);
  const handleValueChange = (e) => {
    if (e.value >= 1) { setQuatity(e.value); }

  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCart({ pid: el?.product?._id, quantity, color: el?.color }));
  }, [quantity])
  return (
    <>
      <div key={el._id} className="col-6 flex gap-2  align-items-center border-bottom-1 ">
        <img src={el?.thumbnail} alt="thumb" className="w-7rem h-7rem" style={{ objectFit: "cover" }} />
        <div className="flex flex-column gap-1 justify-content-start">
          <span className="font-bold text-lg text-base">{el?.title}</span>
          <span className="text-xs font-semibold">{el.color}</span>
        </div>
      </div>
      <div className="col-3 flex align-items-center justify-content-center border-bottom-1">
        <InputNumber value={quantity} className="text-justify z-1" onValueChange={handleValueChange} showButtons buttonLayout="horizontal" step={1}
          decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
      </div>
      <div className="col-3 text-lg flex align-items-center justify-content-center font-bold border-bottom-1">
        {formatMoney(el?.price * quantity)} VNĐ
      </div>
    </>
  )
}
export default OrderItem