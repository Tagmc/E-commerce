import payment from '../../assets/payment.svg'
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../utils/helpers';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Paypal from '../../components/PayPal';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Congrat from '../../components/Congrat';
import { getCurrent } from '../../store/user/asyncAction';

const Checkout = () => {
  const dispatch = useDispatch();
  const { currentCart, current } = useSelector(state => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      dispatch(getCurrent());
    }
  }, [isSuccess])
  const columns = [
    { field: 'title', header: 'Products' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'price', header: 'Price' }
  ];
  const priceBodyTemplate = (product) => {
    return formatMoney(product.price) + ' VND';
  };

  return (
    <>
      {isSuccess && <Congrat />}
      <div className="w-12 grid flex mx-auto">
        <div className='col-5'>
          <img src={payment} />
        </div>
        <div className='col-6 flex flex-wrap'>
          <div className="col-12 text-3xl font-bold">Checkout your order</div>
          <div className="card">
            <DataTable value={currentCart} hea tableStyle={{ minWidth: '50rem' }}>
              {columns.map((col, i) => (
                (col.header == 'Price' ? <Column key={col.field} field={priceBodyTemplate} header={col.header} /> : <Column key={col.field} field={col.field} header={col.header} />)
              ))}
            </DataTable>
            <div className='col-12 mt-4 py-0 text-right '>
              <span className='font-semibold'>
                Subtotal:
              </span>
              <span className=" font-semibold text-base text-red-500"> {formatMoney(currentCart?.reduce((sum, el) => +el?.price * el?.quantity + sum, 0))} VNĐ</span>
            </div>
          </div>
          <div className="col-12 justify-content-end flex">
            <div className='font-semibold'>Address:</div> 
            <div className=' ml-2 text-red-500 font-semibold'>{current?.address}</div>
          </div>
          <div className="col-12">
            <Paypal
              payload={{ products: currentCart, total: Math.round(+currentCart?.reduce((sum, el) => +el?.price * el?.quantity + sum, 0) / 23500), address: current.address }}
              setIsSuccess={setIsSuccess}
              amount={Math.round(+currentCart?.reduce((sum, el) => +el?.price * el?.quantity + sum, 0) / 23500)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default Checkout;