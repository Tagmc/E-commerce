import { apiGetOrders, apiGetUserOrders } from "../../apis";
import { useEffect, useState } from 'react';
import InputForm from "../../components/InputForm";
import { useForm } from "react-hook-form";
import Pagination from "../../components/Pagination";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import moment from 'moment';
import CustomSelect from "../../components/CustomSelect";
import { statusOrder } from "../../utils/constant";
const History = () => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const { register, formState: { errors }, watch, setValue } = useForm();
  const q = watch('q');
  const status = watch('status');
  const fetchOrders = async (params) => {
    const response = await apiGetUserOrders({ ...params, limit: +process.env.REACT_APP_LIMIT });
    if (response?.success) {
      setCounts(response.counts);
      setOrders(response.orders);
    }
  }
  useEffect(() => {
    if (params) {
      const pr = Object.fromEntries([...params]);
      fetchOrders(pr)
    } else {
      fetchOrders();
    }
  }, [params]);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearchStatus = ({ value }) => {
    if (value) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ status: value }).toString()
      })
    } else {
      navigate({
        pathname: location.pathname,
      })
    }
  }
  return (
    <div className="w-12">
      <div className="h-5rem flex justify-content-between align-items-center text-2xl font-bold px-4 border-200 border-1 border-x-none border-top-none">
        <span>History</span>
      </div>
      <div className='flex w-12 justify-content-end align-items-center my-3 px-4 '>
        <form className="flex align-items-center gap-3">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            placeholder={'Search orders by status...'}
          />
          <CustomSelect
            options={statusOrder}
            value={status}
            onChange={val => handleSearchStatus(val)}
            classname={'w-4'}
          />
        </form>
      </div>
      <div className="w-12 px-4">
        <table className=' text-center w-12 text-sm border-solid border-1 border-900'>
          <thead className="bg-gray-600 text-sm border-solid border-1 border-900">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Total</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">createdAt</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => (
              <tr key={item._id} className="">
                <td className="border-bottom-1 border-bluegray-600">{index + 1}</td>
                <td className='py-2 border-bottom-1 border-bluegray-600'>
                  <span className="flex flex-column">
                    {item.products.map(el =>
                      <span key={el._id}  className="flex align-items-center gap-2">
                        <img src={el?.thumbnail} className="w-2 mb-1 h-3rem border-round" />
                        <span className="flex flex-column">
                          <span className="text-red-600 text-sm">{el?.title}</span>
                          <span className="flex align-items-center text-xs gap-2">
                            <span>Quantity:</span>
                            <span className="text-red-600">{el?.quantity}</span>
                          </span>
                        </span>
                      </span>)}
                  </span>
                </td>
                <td className="border-bottom-1 border-bluegray-600">
                  {item.total} $
                </td>
                <td className="border-bottom-1 border-bluegray-600">
                  {item.status}
                </td>
                <td className="border-bottom-1 border-bluegray-600">
                  {moment(item.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="border-bottom-1 border-bluegray-600">

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='w-12 flex justify-content-end px-4 py-3 z-0'>
        <Pagination totalCount={counts} />
      </div>
    </div>
  )
}
export default History;