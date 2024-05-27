import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
const HotColections = () => {
  const { categories } = useSelector(state => state.app);
  const navigate = useNavigate();
  return (
    <>
      <div className="pb-1 border-bottom-2 mb-3 border-red-500 px-0 font-semibold text-2xl w-12 uppercase">Hot Colections</div>
      <div className='flex flex-wrap justify-content-between'>
        {categories?.map(item => (
          <div key={item.id} className='col-12 lg:col-4  flex align-items-center  border-1 border-300 border-solid mt-4' >
            <div className='col-6'>
              <img src={item?.image} />
            </div>
            <div className='col-6'>
              <div className='font-bold uppercase'>{item.title}</div>
              {item?.brand?.map(element => (
                <div className='text-500 mt-2 hover:text-red-500 cursor-pointer' onClick={() => {navigate({
                  pathname: `/${item.title}`,
                  search: createSearchParams({ brand: element }).toString(),
                })}}>
                  <i className="fa-solid fa-chevron-right mr-1 text-xs"></i> {element}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default HotColections;