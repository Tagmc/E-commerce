import { memo, useEffect, useState } from "react";
import { colors } from '../utils/constant';
import { Checkbox } from "primereact/checkbox";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "../apis";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import path from "../utils/Path";
import { Message } from 'primereact/message';
import useDebounce from "../hooks/useDebounce";
const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [bestPrice, setBestPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState([]);
  const [color, setColor] = useState([]);
  const [price, setPrice] = useState({
    from: '',
    to: ''
  })
  const onColorChange = (e) => {
    let _selectedColor = [...selectedColor];

    if (e.checked)
      _selectedColor.push(e.value);
    else
      _selectedColor = _selectedColor.filter(color => color.id !== e.value.id);

    let _color = [];
    _selectedColor.map(item => _color.push(item.name));
    setColor(_color);
    setSelectedColor(_selectedColor);
  };
  useEffect(() => {
    if (color.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: color.join(',')
        }).toString()
      })
    } else {
      navigate(`/${category}`);
    }
  }, [color]);
  const fetchProductByBestPrice = async () => {
    const response = await apiGetProducts({ sort: '-price', limit: 1 });
    if (response?.success) {
      setBestPrice(response.products[0]?.price)
    }

  };
  useEffect(() => {
    if (type === 'input') fetchProductByBestPrice();
  }, [type]);

  useEffect(() => {
    if (price.from > price.to) {
      <Message severity="warn" text="from price can not greater than to price" />
    }
  }, [price])

  const debounceFrom = useDebounce(price.from, 500);
  const debounceTo = useDebounce(price.to, 500);
  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) data.from = price.from;
    if (Number(price.to) > 0) data.to = price.to;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(data).toString()
    })
  }, [debounceFrom, debounceTo])
  return (
    <>
      <div className="p-2 px-4 text-xs cursor-pointer text-gray-500 border-1 border-gray-800 flex relative z-5" onClick={() => changeActiveFilter(name)}>
        <span className="capitalize">{name}</span>
        <div className="ml-4 ">
          <i class="fa-solid fa-angle-down"></i>
        </div>
        {activeClick === name && <div className="absolute border-1 border-200 bg-white p-2 left-0" style={{ width: "460px", top: "100%" }}>
          {type === 'checkbox' &&
            <div >
              <div className="p-2 flex align-items-center justify-content-between " style={{ minWidth: "128px" }}>
                <div className="">{selectedColor.length} selected</div>
                <div className="underline hover:text-red-500" onClick={e => { e.stopPropagation(); setSelectedColor([]); setColor([]) }}>Reset</div>
              </div>
              <div onClick={e => e.stopPropagation()}>
                {colors.map((color) => (
                  <div key={color.id} className="flex align-items-center mt-1">
                    <Checkbox inputId={color.id} name="color" value={color} onChange={onColorChange} checked={selectedColor.some((item) => item.id === color.id)} />
                    <label htmlFor={color.id} className="ml-2">
                      {color.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>}
          {type === 'input' && <div onClick={e => e.stopPropagation()}>
            <div className="p-2 flex align-items-center justify-content-between " style={{ minWidth: "300px" }}>
              <div className="">{`The highest price is ${Number(bestPrice).toLocaleString()} VNĐ`}</div>
              <div className="underline hover:text-red-500" onClick={e => { e.stopPropagation(); setPrice([{from: ``, to: ``}]); changeActiveFilter(null) }}>Reset</div>
            </div>
            <div className="flex justify-content-between">
              <div className="flex flex-column gap-2 mt-3">
                <FloatLabel>
                  <InputText type="number" mode="currency" value={price.from} onChange={(e) => setPrice(prev => ({...prev, from: e.target.value}))} id="from" className="p-inputtext-sm" />
                  <label for="from">From</label>
                </FloatLabel>
              </div>
              <div className="flex flex-column gap-2 mt-3">
                <FloatLabel>
                  <InputText type="number" value={price.to} onChange={(e) => setPrice(prev => ({...prev, to: e.target.value}))} id="to" className="p-inputtext-sm" />
                  <label for="to">To</label>
                </FloatLabel>
              </div>
            </div>

          </div>}
        </div>}
      </div >
    </>
  );
}

export default memo(SearchItem);