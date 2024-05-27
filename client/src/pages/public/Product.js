import { useParams, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { apiGetProducts } from '../../apis';
import { useEffect, useState, useCallback } from 'react';
import { ProductCard2 } from '../../components/ProductCard2';
import SearchItem from '../../components/SearchItem';
import { sorts } from '../../utils/constant';
import InputSelect from '../../components/InputSelect';
import Pagination from '../../components/Pagination';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
const Product = () => {
  const navigate = useNavigate();
  const [products, setProduct] = useState(null);
  const [value, setValue] = useState('');
  const { category, page } = useParams();
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [title, setTitle] = useState('');
  const [sort, setSort] = useState('');
  const fetchProductsByCategory = async (queries) => {
    if (category && category !== 'products') queries.category = category;
    const response = await apiGetProducts(queries);
    if (response?.success) {
      setProduct(response);
    }
  }
  const handleClick = () => {
    setTitle(value);
  }
  // useEffect(() => {
  //   let queries = {};
  //   if (title) queries.title = title;
  //   fetchProductsByCategory(queries);
  // }, [title])

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          {
            price: { gte: queries.from },
          },
          {
            price: { lte: queries.to }
          }
        ]
      }
      delete queries.price
    }
    if (queries.from) {
      queries.price = { gte: queries.from }
    }
    if (queries.to) {
      queries.price = { lte: queries.to }
    }
    if (title) queries.title = title;
    delete queries.from
    delete queries.to

    fetchProductsByCategory({ ...priceQuery, ...queries });
    window.scrollTo(0, 0);
  }, [params, title]);
  const items = [
    {
      label: '',
      template: () => <Link to={`/${category}`} className="no-underline capitalize text-600 text-sm hover:text-red-500">{category === ':category' ? 'Products List' : category}</Link>
    }
    ,
  ];
  const changeActiveFilter = useCallback((name) => {
    if (activeClick === name) {
      setActiveClick(null);
    } else {
      setActiveClick(name);
    }
  }, [activeClick]);
  const home = { icon: 'pi pi-home', url: '/' };
  const changeValueSort = useCallback((value) => {
    setSort(value);
  }, [sort]);
  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          sort: sort
        }).toString()
      })
    }
  }, [sort]);
  return (
    <>
      <div className='w-12 grid'>
        <div className="pt-3 pl-0 w-12 flex flex-wrap align-items-center col-12">
          <div className="font-bold col-12 uppercase">{category === ':category' ? 'Products List' : category}</div>
          <BreadCrumb model={items} home={home} className="border-x-none border-y-none pl-2 pt-1" />
        </div>
        <div className='w-12 col-12 p-2 t border-solid border-1 border-200 my-3 flex flex-wrap justify-content-between mx-2 align-items-center'>
          <div className='col-12 lg:col-3 flex gap-2 flex-column'>
            <span className='font-semibold text-sm'>Filter By</span>
            <div className='flex gap-2 align-items-center'>
              <SearchItem
                name='Price'
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
                type='input'
              />
              <SearchItem
                name='Color'
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
              />
            </div>
          </div>
          <div className='col-12 lg:col-3 gap-2 p-2 gap-2'>
            <span className='font-semibold text-sm'>Sort By</span>
            <div className='flex gap-2 align-items-center'>
              <InputSelect value={sort} changeValue={changeValueSort} options={sorts} />
            </div>
          </div>
          <div className='col-4 lg:col-3'></div>
          <div className="p-inputgroup flex-1 col-3 p-4 pb-2">
            <InputText placeholder="Keyword" className='p-inputtext-sm' value={value} onChange={(e) => setValue(e.target.value)} />
            <Button icon="pi pi-search" onClick={handleClick} className="p-button-severity" />
          </div>

        </div>
        {products?.products?.map(item => (
          <div className='col-6 lg:col-3'>
            <ProductCard2 product={item} />
          </div>

        ))}
        <div className='col-12 my-2 flex justify-content-end'>
          <Pagination totalCount={products?.counts} />
        </div>
      </div>
    </>
  )
}
export default Product;