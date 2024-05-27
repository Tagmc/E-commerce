import usePagination from "../hooks/usePagination";
import PagiItem from "./PagiItem";
import { useSearchParams } from "react-router-dom";
const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get('page') || 1);
  //console.log(pagination);
  const range = () => {
    const currentPage = +params.get('page') || 1;
    const pageSize = +process.env.REACT_APP_LIMIT_PAGE || 10;
    const start = Math.min(((currentPage - 1) * pageSize) + 1, totalCount);
    const end = Math.min(currentPage * pageSize, totalCount);
    return `${start} - ${end}`;
  }
  return (
    <div className="flex w-12 justify-content-between align-items-center">
      {!+params.get('page') ? <span className="text-sm font-italic">{`Show items ${Math.min(1, totalCount)} - ${Math.min(+process.env.REACT_APP_LIMIT_PAGE, totalCount)} of ${totalCount}`}</span> : ''}
      {+params.get('page') ? <span className="text-sm font-italic">{`Show items ${range()} of ${totalCount}`}</span> : ''}
      <div className="flex align-items-center">
        {pagination?.map(item => (
          <PagiItem key={item}>
            {item}
          </PagiItem>
        ))}
      </div>
    </div>
  )
}
export default Pagination;