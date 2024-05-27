import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { apiGetProducts } from "../apis";
import feature1 from '../assets/feature1.webp';
import feature2 from '../assets/feature2.avif';
import feature3 from '../assets/feature3.avif';
import feature4 from '../assets/feature4.webp';
const FeatureProduct = () => {
  const [product, setProduct] = useState(null);
  const featureProduct = async () => {
    const response = await apiGetProducts({ limit: 9, totalRatings: 4 });
    if (response.success) {
      setProduct(response.products);
    }
  }
  useEffect(() => {
    featureProduct();
  }, [])

  return (
    <div className="">
      <div className="pb-1 border-bottom-2 mb-1 border-red-500 px-0 font-semibold text-2xl col-12 uppercase">Featured Products</div>
      <div className="flex flex-wrap justify-content-between">
        {product?.map((item) => (
          <ProductCard
            key={item.id}
            id={item._id}
            category={item.category}
            image={item.thumb}
            title={item.title}
            totalRatings={item.totalRatings}
            price={item.price}
          />
        ))}
      </div>
      <div className="flex flex-wrap mt-2 w-12 justify-content-between px-0 mb-3">
        <div className="col-12 lg:col-6 pl-0">
          <div className="" >
            <img src={feature1} className="w-12" style={{height: "665px"}} />
          </div>
        </div>
        <div className="col-12 lg:col-3">
          <div className="">
            <img src={feature2} className="w-12" style={{height: "338px"}}/>
          </div>
          <div className="mt-3">
            <img src={feature3} className="w-12" style={{height: "307px"}}/>
          </div>
        </div>
        <div className="col-12 lg:col-3 pr-0">
          <div className="">
            <img src={feature4} className="w-12" style={{height: "665px"}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;