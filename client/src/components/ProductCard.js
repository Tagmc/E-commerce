import { renderStar, formatMoney } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
const ProductCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex align-items-center col-12 lg:col-4 border-1 border-solid border-300 mt-3"  onClick={() => { navigate(`/${props?.category}/${props?.id}/${props?.title}`); }}>
        <img src={props.image} alt="Image" className='w-5rem cursor-pointer' />
        <div className='flex flex-wrap ml-2'>
          <span className='col-12 hover:text-red-500 cursor-pointer'>{props.title}</span>
          <span className='col-12 text-yellow-500'>{renderStar(props.totalRatings)}</span>
          <span className='col-12'>{formatMoney(props.price)} VNĐ</span>
        </div>
      </div>
    </>
  )
}

export default ProductCard;