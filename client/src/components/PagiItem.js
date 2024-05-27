import { useSearchParams, useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { Button } from 'primereact/button';
const PagiItem = ({ children }) => {
  const navigate = useNavigate();
  const temp = children;
  const [params] = useSearchParams();
  const location = useLocation();
  const handlePagination = () => {
    const queries = Object.fromEntries([...params])
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString()
    })
  }
  return (
    <>
      {temp === "DOTS" ? (<div className="p-3 pb-0 flex align-items-end border-round-2xl hover:bg-gray-300 ">
        <i class="fa-solid fa-ellipsis"></i>
      </div>) : (<Button className={`p-3 ml-1 flex align-items-end border-round-2xl hover:bg-gray-300 ${+params.get('page') === +children && ('bg-gray-500')} ${!+params.get('page') && +children === 1 && 'bg-gray-500'}`}
       type="button" onClick={handlePagination} >
        {children}
      </Button>)}
    </>
  )
}
export default PagiItem;