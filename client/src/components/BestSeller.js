import { apiGetProducts } from '../apis/product';
import { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import { ProductTemplate } from './Product';
import image1 from '../assets/img-banner1.avif';
import image2 from '../assets/img-banner2.avif';
import { getNewProducts } from "../store/products/asyncAction";
import { useDispatch, useSelector } from 'react-redux';
const tabs = [
  {
    id: 1,
    name: 'best sellers'
  },
  {
    id: 2,
    name: 'new arrivals'
  },
]
const BestSeller = () => {
  const dispatch = useDispatch();
  const [bestSeller, setBestSeller] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);
  const { newProducts } = useSelector(state => state.product)
  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: '-sold' })
    if (response?.success) {
      setBestSeller(response.products);
      setProducts(response.products);
      products?.forEach(item => item.tab === activeTab);
    }
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts())
  }, []);
  useEffect(() => {
    if (activeTab === 1) setProducts(bestSeller);
    if (activeTab === 2) setProducts(newProducts);
    
  }, [activeTab])
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
  return (
    <>
      <div className='flex align-items-center gap-8 border-bottom-2 border-red-500 p-2 pl-0 mt-3'>
        {tabs.map(item =>
          <span
            className={`text-2xl capitalize font-semibold text-400 cursor-pointer ${activeTab === item.id ? 'text-900' : ''}`}
            key={item.id}
            onClick={() => setActiveTab(item.id)}
          >{item.name}</span>
        )}
      </div>
      <div className="card">
        <Carousel value={products ? products : ''} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={ProductTemplate} autoplayInterval={3000} circular showIndicators={false} className='mt-3'/>
      </div>
      <div className='mt-3 flex justify-content-between'>
        <img src={image1} alt='Anh 1' className='col-6 pl-0' />
        <img src={image2} alt='Anh 2' className='col-6 pr-0' />
      </div>
    </>
  )
}

export default BestSeller;