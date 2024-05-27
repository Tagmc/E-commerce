import { useSelector } from "react-redux";
import { ProductCard2 } from "../../components/ProductCard2";

const WishList = () => {
  const { current } = useSelector(state => state.user);
  console.log(current);
  return (
    <>
      <div className="w-12">
        <div className="h-5rem flex justify-content-between align-items-center text-2xl font-bold px-4 border-200 border-1 border-x-none border-top-none">
          <span>Wish List</span>
        </div>
        <div className="flex flex-wrap p-4">
          {current?.wishlist?.map(el => (
            <div className="p-1 border-1 ml-2 bg-white border-round-xl">
              <ProductCard2 product={el} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default WishList;
