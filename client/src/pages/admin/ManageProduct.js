import { useForm } from 'react-hook-form';
import { apiGetProducts, apiDeleteProduct } from '../../apis';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { formatMoney, renderStar } from '../../utils/helpers';
import InputForm from '../../components/InputForm';
import moment from 'moment';
import Pagination from '../../components/Pagination';
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce'
import UpdateProduct from './UpdateProduct';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CustomizeVarriants from '../../components/CustomizeVarriants';
const ManageProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editProduct, setEditProduct] = useState(null);
  const [customizeVarriants, setCustomizeVarriants] = useState(null);
  const { register, reset, formState: { errors }, watch } = useForm();
  const [update, setUpdate] = useState(false);
  const render = useCallback(() => {
    setUpdate(!update);
  })
  const fetchProducts = async (params) => {
    const response = await apiGetProducts({ ...params, limit: +process.env.REACT_APP_LIMIT });
    if (response?.success) {
      setCounts(response.counts);
      setProducts(response.products);
    }
  }

  const queryDebounce = useDebounce(watch('q'), 800)
  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString()
      })
    } else {
      navigate({
        pathname: location.pathname,
      })
    }
  }, [queryDebounce]);
  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
  }, [params, update]);
  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure remove this product?',
      icon: 'warning',
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(id);
        if (response.success) {
          toast.success(response.mes);
        } else {
          toast.error(response.mes);
        }
        render();
      }
    })
  }
  return (
    <>
      <div className='w-12 h-screen flex flex-column gap-4 relative'>
        <div className="h-5rem flex justify-content-between align-items-center text-2xl font-bold p-4 border-200 border-1 border-x-none border-top-none">
          <span>Manage Product</span>
        </div>
        <div className='flex w-12 justify-content-end align-items-center px-4 '>
          <form>
            <InputForm
              id="q"
              register={register}
              errors={errors}
              placeholder={'Search products by title...'}
            />
          </form>
        </div>
        {editProduct && <div className='absolute h-full w-12 bg-bluegray-400 top-0 z-4'>
          <UpdateProduct editProduct={editProduct} setEditProduct={setEditProduct} render={render} />
        </div>}
        {customizeVarriants && <div className='absolute h-full w-12 bg-bluegray-400 top-0 z-4'>
          <CustomizeVarriants customizeVarriants={customizeVarriants} setCustomizeVarriants={setCustomizeVarriants} render={render} />
        </div>}
        {!editProduct && !customizeVarriants && <div className='px-4 z-0'>
          <table className=' text-center w-12 text-sm border-solid border-1 border-900'>
            <thead className="bg-gray-600 text-sm border-solid border-1 border-900">
              <tr>
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Thumb</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Brand</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Quantity</th>
                <th className="px-3 py-2">Sold At</th>
                <th className="px-3 py-2">Color</th>
                <th className="px-3 py-2">Ratings</th>
                <th className="px-3 py-2">Varriants</th>
                <th className="px-3 py-2">createdAt</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className='py-2'>
                    <img src={item.thumb} alt="product" style={{ height: "45px", width: "45px" }} />
                  </td>
                  <td>
                    {item.title}
                  </td>
                  <td>
                    {item.brand}
                  </td>
                  <td>
                    {item.category}
                  </td>
                  <td>
                    {formatMoney(item.price)}
                  </td>
                  <td>
                    {item.quantity}
                  </td>
                  <td>
                    {item.sold}
                  </td>
                  <td>
                    {item.color}
                  </td>
                  <td className='text-yellow-300'>
                    {renderStar(item.totalRatings)}
                  </td>
                  <td>
                    {item?.varriants?.length || 0}
                  </td>
                  <td>
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td>
                    <span onClick={() => setEditProduct(item)} className='text-red-900 hover:underline cursor-pointer hover:text-orange-800 px-1'><i class="fa-solid fa-pen-to-square"></i></span>
                    <span onClick={() => handleDeleteProduct(item._id)} className='text-red-900 hover:underline cursor-pointer hover:text-orange-800 px-1'><i class="fa-solid fa-trash-can"></i></span>
                    <span onClick={() => setCustomizeVarriants(item)} className='text-red-900 hover:underline hover:text-orange-800 cursor-pointer px-1'><i class="fa-solid fa-table-cells-large"></i></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='w-12 flex justify-content-end px-4 py-3 z-0'>
            <Pagination totalCount={counts} />
          </div>
        </div>}
      </div>
    </>
  )
}

export default ManageProduct;