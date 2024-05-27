import { createSearchParams, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts, apiUpdateCart } from "../../apis";
import { useCallback, useEffect, useRef, useState } from "react";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import ReactImageMagnify from 'react-image-magnify';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { formatMoney, formatPrice, renderStar } from '../../utils/helpers';
import { ProductTemplate } from '../../components/Product';
import ProductInformation from "../../components/ProductInformation";
import DOMPurify from 'dompurify';
import clsx from "clsx";
import Swal from 'sweetalert2';
import path from "../../utils/Path";
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../store/user/asyncAction";
const DetailProduct = () => {
  const titleRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector(state => state.user);
  const [product, setProduct] = useState(null);
  const [relateProduct, setRelateProduct] = useState(null);
  const { pid, title, category } = useParams();
  const [value, setValue] = useState(1); //quantity
  const [currentImage, setCurrentImage] = useState(null);
  const [varriant, setVarriant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: '',
    thumb: '',
    images: [],
    price: '',
    color: ''
  })
  const toast = useRef(null);
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response?.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumb);
    }
  }
  console.log(product);
  useEffect(() => {
    if (varriant) {
      setCurrentProduct({
        title: product?.varriants?.find(el => el?.sku === varriant)?.title,
        color: product?.varriants?.find(el => el?.sku === varriant)?.color,
        images: product?.varriants?.find(el => el?.sku === varriant)?.images,
        thumb: product?.varriants?.find(el => el?.sku === varriant)?.thumb,
        price: product?.varriants?.find(el => el?.sku === varriant)?.price,
      })
    } else {
      setCurrentProduct({
        title: product?.title,
        color: product?.color,
        images: product?.images || [],
        thumb: product?.thumb,
        price: product?.price,
      })
    }
  }, [varriant, product])
  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response?.success) setRelateProduct(response.products)
  }
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    titleRef.current.scrollIntoView({block: 'start'});
  }, [pid]);
  const items = [
    {
      label: 'category',
      template: () => <Link to={`/${product?.category}`} className="no-underline text-600 text-sm hover:text-red-500">{product?.category}</Link>
    }
    ,
    {
      label: { title },
      template: () => <Link to={`/${product?.category}/${pid}/${title}`} className="no-underline text-600 text-sm">{title}</Link>
    }
  ];
  const home = { icon: 'pi pi-home', url: '/' };
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
  const handleAddToCart = async () => {
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
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({ redirect: location.pathname }).toString()
          });
        }
      })
    }
    const response = await apiUpdateCart({ pid: pid, color: currentProduct?.color ? currentProduct?.color : product?.color, quantity: value, price: currentProduct?.price || product?.price, thumbnail: currentProduct?.thumb || product?.thumb, title: currentProduct?.title || product?.title });
    if (response?.success) {
      toast.current.show({ severity: 'success', summary: 'Success', detail: response.mes });
      dispatch(getCurrent())
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: response.mes });
    }
  }
  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-2 w-11">
        <div className="mb-3">
          <img src={product} className="w-12 shadow-2" style={{ width: "143px", height: "120px" }} />
        </div>
      </div>
    );
  };
  const handleValueChange = useCallback((e) => {
    setValue(e.value);
  }, [value]);
  return (
    <>
      <div className="p-3 pl-0 w-12 flex flex-wrap align-items-center">
        <div className="font-bold col-12">{product?.varriants?.find(el => el?.sku === varriant)?.title || product?.title}</div>
        <BreadCrumb model={items} home={home} className="border-x-none border-y-none pl-2 pt-1" />
      </div>
      <div ref={titleRef} className="w-12 p-3 px-0 grid justify-content-between">
        <div className="col-6 lg:col-4 ">
          <div className="border-solid border-1 border-200 ">
            <ReactImageMagnify className="z-2" {...{
              smallImage: {
                alt: '',
                isFluidWidth: true,
                src: currentProduct?.thumb || currentImage
              },
              largeImage: {
                src: currentProduct?.thumb || currentImage,
                width: 1800,
                height: 1500
              }
            }} />
          </div>
          <div className="w-12 mt-2">
            <Carousel value={product?.images ? product?.images : ''} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} autoplayInterval={3000} circular showIndicators={false} className='mt-3' style={{ width: "100%" }} />
          </div>
        </div>
        <div className="col-6 lg:col-5">
          <div className="flex align-items-center justify-content-between">
            <div className="text-3xl font-semibold ml-4">{`${formatMoney(currentProduct?.price || product?.price)} VNĐ`}</div>
            <span className="text-sm text-red-500 font-semibold text-right">Kho: {product?.quantity}</span>
          </div>
          <div className="flex align-items-center mt-3">
            <div className=" text-lg ml-4 mr-2">
              {renderStar(product?.totalRatings)?.map(item => (<span key={item} className="text-yellow-300">{item}</span>))}
            </div>
            <span className="text-red-500 text-sm font-italic">(Đã bán: {product?.sold})</span>
          </div>
          <ul>
            {product?.description?.length > 1 && product?.description?.map(item => (<li className="mt-2 text-sm text-gray-600">{item}</li>))}
            {product?.description?.length === 1 && <div className="text-justify text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}></div>}
          </ul>
          <div className="my-3 pl-4 flex gap-2">
            <span className="font-bold">Color:</span>
            <div className="flex flex-wrap gap-2  align-items-center w-12 ">
              <div onClick={() => setVarriant(null)} className={clsx("flex align-items-center p-2 border-1 border-round-lg cursor-pointer", !varriant && 'border-red-500')}>
                <img src={product?.thumb} alt="thumb" className="w-4rem  h-3rem" />
                <span className="flex flex-column text-sm">
                  <span>{product?.color}</span>
                  <span className="text-sm">{formatMoney(product?.price)} VND</span>
                </span>
              </div>
              {product?.varriants?.map(el => (
                <div key={el.sku} onClick={() => setVarriant(el?.sku)} className={clsx("flex align-items-center p-2 border-1 border-round-lg cursor-pointer", varriant === el?.sku && 'border-red-500')}>
                  <img src={el?.thumb} alt="thumb" className="w-4rem  h-3rem" />
                  <span className="flex flex-column text-sm">
                    <span>{el?.color}</span>
                    <span className="text-sm">{formatMoney(el?.price)} VND</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="pl-4 my-2">
            <div className="mb-2 font-semibold">Quantity: </div>
            <InputNumber value={value} className="text-justify z-1" onValueChange={handleValueChange} showButtons buttonLayout="horizontal" step={1}
              decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
          </div>
          <div className="pl-4 ">
            <Toast ref={toast} />
            <Button onClick={handleAddToCart} label="ADD TO CART" className="w-12 text-white" severity="danger" />
          </div>
        </div>
        <div className="col-12 lg:col-3">
          <div className="flex align-items-center border-solid border-1 border-300 p-3">
            <div className="p-2 border-circle surface-900 text-white">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <div className="mt-1 ml-2">
              <div>Guarantee</div>
              <div className="text-sm text-color-secondary">Quantity Checked</div>
            </div>
          </div>
          <div className="flex align-items-center border-solid border-1 border-300 p-3 mt-2">
            <div className="p-2 border-circle surface-900">
              <i class="fa-solid fa-truck text-white"></i>
            </div>
            <div className="mt-1 ml-2">
              <div>Free Shipping</div>
              <div className="text-sm text-color-secondary">Free On All Products</div>
            </div>
          </div>
          <div className="flex align-items-center border-solid border-1 border-300 p-3 mt-2">
            <div className="p-2 border-circle surface-900 text-white">
              <i class="fa-solid fa-gift"></i>
            </div>
            <div className="mt-1 ml-2">
              <div>Special Gift Cards</div>
              <div className="text-sm text-color-secondary">Special Gift Cards</div>
            </div>
          </div>
          <div className="flex align-items-center border-solid border-1 border-300 p-3 mt-2">
            <div className="p-2 border-circle surface-900 text-white">
              <i class="fa-solid fa-arrow-rotate-left"></i>
            </div>
            <div className="mt-1 ml-2">
              <div>Free Return</div>
              <div className="text-sm text-color-secondary">Within 7 Days</div>
            </div>
          </div>
          <div className="flex align-items-center border-solid border-1 border-300 p-3 mt-2">
            <div className="p-2 border-circle surface-900 text-white">
              <i class="fa-solid fa-tty"></i>
            </div>
            <div className="mt-1 ml-2">
              <div>Consultancy</div>
              <div className="text-sm text-color-secondary">Lifetime 24/7/356</div>
            </div>
          </div>
        </div>
        <div className="col-12 mt-4">
          <ProductInformation />
        </div>
        <div className="col-12 pb-1 border-bottom-2 mb-3 border-red-500 text-gray-600 font-bold text-xl uppercase">
          OTHER CUSTOMERS ALSO BUY
        </div>
        <div className="col-12">
          <Carousel value={relateProduct ? relateProduct : ''} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={ProductTemplate} autoplayInterval={3000} circular showIndicators={false} className='mt-3' />
        </div>
      </div>
    </>
  );
}
export default DetailProduct;