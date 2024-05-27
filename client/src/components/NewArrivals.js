import { apiGetProducts } from '../apis/product';
import { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import { ProductTemplate } from './Product';

const NewArrivals = () => {
  const [products, setProduct] = useState(null);
  const featureProduct = async () => {
    const response = await apiGetProducts({});
    if (response?.success) {
      setProduct(response.products);
    }
  }
  useEffect(() => {
    featureProduct();
  }, [])

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
  console.log(products)
  return (
    <>
      <div className="pb-1 border-bottom-2 mb-3 border-red-500 px-0 font-semibold text-2xl w-12 uppercase">New Arrivals</div>
      <div className="card">
        <Carousel value={products ? products : ''} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={ProductTemplate} autoplayInterval={3000} circular showIndicators={false} className='mt-3' />
      </div>
    </>
  )
}
export default NewArrivals;