import { useMemo } from "react";
import { generateRange } from '../utils/helpers';
const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = +process.env.REACT_APP_LIMIT_PAGE || 10;
    const PaginationCount = Math.ceil(+totalProductCount / pageSize);
    const totalPaginationItem = siblingCount + 5;

    if (PaginationCount <= totalPaginationItem) return generateRange(1, PaginationCount);

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < PaginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = PaginationCount - 4;
      const rightRange = generateRange(rightStart, PaginationCount);
      return [1, 'DOTS', ...rightRange];
    }
    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, 'DOTS', PaginationCount]
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, PaginationCount);

    if (isShowLeft && isShowRight) {
      // console.log(siblingLeft, siblingRight);
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [1, 'DOTS', ...middleRange, 'DOTS', PaginationCount];
    }

  }, [totalProductCount, currentPage, siblingCount])

  return paginationArray;

}
export default usePagination;