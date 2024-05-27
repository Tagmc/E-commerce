import { formatMoney } from "../utils/helpers";
import label from "../assets/th.jpg";
import label1 from "../assets/label1.png";
import { renderStar } from "../utils/helpers";
import SelectOptions from "./selectOptions";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import path from '../utils/Path';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import ReactImageMagnify from 'react-image-magnify';
import { useCallback, useEffect } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { apiUpdateCart, apiUpdateWishList } from "../apis";
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from "../store/user/asyncAction";
import Swal from 'sweetalert2';
export const ProductCard2 = (props) => {
  const { product } = props;
  const [value, setValue] = useState(1);
  const [isShow, setIsShow] = useState(null);
  const navigate = useNavigate();
  const { current } = useSelector(state => state.user);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const handleMouseEnter = () => {
    setIsShow(true);
  }
  const handleValueChange = useCallback((e) => {
    setValue(e.value);
  }, [value]);
  const dispatch = useDispatch();
  const productTemplate1 = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-2 w-11">
        <div className="mb-3">
          <img src={product} className="w-12 shadow-2" style={{ width: "143px", height: "120px" }} />
        </div>
      </div>
    );
  };
  const handleMouseLeave = () => {
    setIsShow(false);
  }
  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === 'MENU') {
      navigate(`/${product?.category?.toLowerCase()}/${product?._id}/${product?.title}`)
    }
    if (flag === 'CART') {
      if (!current) {
        return Swal.fire({
          title: 'Almost...',
          text: 'Please login first!',
          icon: 'info',
          cancelButtonText: 'Not now!',
          showCancelButton: true,
          confirmButtonText: 'Go login page'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/${path.LOGIN}`);
          }
        })
      }
      const response = await apiUpdateCart({ pid: product._id, color: product.color, title: product.title, thumbnail: product.thumb, price: product.price });
      if (response?.success) {
        toast.current.show({ severity: 'success', summary: 'Success', detail: response.mes });
        dispatch(getCurrent())
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: response.mes });
      }
    }
    if (flag === 'QUICK_VIEW') {
      setVisible(true);
    }
    if (flag === 'WISHLIST') {
      const response = await apiUpdateWishList(product?._id);
      if (response) {
        dispatch(getCurrent());
        toast.current.show({ severity: 'success', summary: 'Success', detail: response.mes });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: response.mes });
      }
    }
  }
  const handleClick = () => {
    navigate(`/${product?.category?.toLowerCase()}/${product?._id}/${product?.title}`);
  }
  return (
    <div>
      <div className="flex justify-content-start"><Toast ref={toast} /></div>
      <div className="no-underline text-pink-900 border-1 surface-border h-23rem border-round m-2 text-center py-5 px-3 flex flex-column justify-content-between relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
        <div className="mb-3 w-12 relative" >
          {isShow && <div className='absolute bottom-0 w-12 flex justify-content-center gap-2 icon z-0' >
            {current?.cart?.some(el => el.product === product._id) ? <span title="Add to Cart" ><SelectOptions icon={<i class="fa-solid fa-cart-shopping text-green-700"></i>} /></span> : <span title="Add to Cart" onClick={(e) => handleClickOptions(e, 'CART')}><SelectOptions icon={<i class="fa-solid fa-cart-shopping"></i>} /></span>}
            <Dialog header="Detail Product" visible={visible} style={{ width: '50vw', zIndex: "999" }} onHide={() => setVisible(false)} >
              <div className="w-12 p-3 px-0 grid justify-content-between">
                <div className="col-6 ">
                  <div className="border-solid border-1 border-200 ">
                    <ReactImageMagnify className="z-2" {...{
                      smallImage: {
                        alt: '',
                        isFluidWidth: true,
                        src: product?.thumb
                      },
                      largeImage: {
                        src: product?.thumb,
                        width: 1800,
                        height: 1500
                      }
                    }} />
                  </div>
                  <div className="w-12 mt-2">
                    <Carousel value={product?.images ? product?.images : ''} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={productTemplate1} autoplayInterval={3000} circular showIndicators={false} className='mt-3' style={{ width: "100%" }} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="flex align-items-center justify-content-between">
                    <div className="text-3xl font-semibold ml-4">{`${formatMoney(product?.price)} VNĐ`}</div>
                    <span className="text-sm text-red-500 font-semibold text-right">Kho: {product?.quantity}</span>
                  </div>
                  <div className="flex align-items-center mt-3">
                    <div className=" text-lg ml-4 mr-2">
                      {renderStar(product?.totalRatings)?.map(item => (<span key={item} className="text-yellow-300">{item}</span>))}
                    </div>
                    <span className="text-red-500 text-sm font-italic">(Đã bán: {product?.sold})</span>
                  </div>
                  <ul>
                    {product?.description?.map(item => (<li className="mt-2 text-sm text-gray-600">{item}</li>))}
                  </ul>

                </div>
              </div>
            </Dialog>
            <span title="More information" onClick={(e) => handleClickOptions(e, 'MENU')}><SelectOptions icon={<i class="fa-solid fa-bars"></i>} /></span>
            <span title="Like" onClick={(e) => handleClickOptions(e, 'WISHLIST')}>{current?.wishlist?.some(i => i._id === product?._id) ? <SelectOptions icon={<i className="fa-solid fa-heart text-red-500" ></i>} /> : <SelectOptions icon={<i className="fa-solid fa-heart" ></i>} />}</span>
          </div>}
          <img src={`${product?.thumb || ''}`} alt={product?.title} className="w-12" style={{ width: "226px", height: "226px" }} />
        </div>
        {/* {product.tab === 1 && <img src={label} className='absolute object-cover' style={{ width: "60px", top: "-10px", left: "-10px" }} />}
      {product.tab === 2 && <img src={label1} className='absolute object-cover' style={{ width: "50px", top: "-10px", left: "-10px" }} />} */}
        <div className='flex flex-column text-left'>
          <span className='my-2 text-yellow-500'>{renderStar(product?.totalRatings)}</span>
          <span className='text-sm overflow-hidden text-overflow-ellipsis w-12' style={{ height: "17px" }}>{product?.title}</span>
        </div>
        <div className='text-left'>{formatMoney(product?.price)} VNĐ</div>
      </div>
    </div>
  );
};

