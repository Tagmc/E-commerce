import { apiGetProducts } from '../apis/product';
import { useState, useEffect, memo } from 'react';
import { renderStar } from "../utils/helpers";
import { formatMoney } from "../utils/helpers";
import { Button } from 'primereact/button';
import Countdown from './Countdown';
const DealDaily = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [dealDaily, setDealDaily] = useState(null);
  const [expireTime, setExpireTime] = useState(false);
  const fetchDealDaily = async () => {
    const response = await apiGetProducts({ limit: 1, totalRatings: 5 });
    if (response.success) {
      setDealDaily(response.products[0]);
      const h = 24 - new Date().getHours();
      const m = 60 - new Date().getMinutes();
      const s = 60 - new Date().getSeconds();
      setHour(h);
      setMinute(m);
      setSecond(s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  }
  let idInterval;
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond(pre => pre - 1);
      else {
        if (minute > 0) {
          setMinute(pre => pre - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour(pre => pre - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime)
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    }
  }, [second, minute, hour, expireTime]);
  return (
    <>
      <div className="mt-4 w-12 border-solid border-200 border-1 flex flex-wrap p-2 align-items-center justify-content-center">
        <i className="fa-solid fa-star text-right p-0 text-3xl text-red-500 col-2"></i>
        <div className="col-10 text-center font-bold text-lg">DAILY DEALS</div>
        <div className='col-12'>
          <img src={`${dealDaily?.thumb || ''}`} alt={dealDaily?.title} className="w-12"  />
        </div>
        <div className='col-12 flex flex-column w-12 align-items-center text-xl'>
          <span className=' overflow-hidden text-overflow-ellipsis w-12 text-center hover:text-red-500' style={{height: "25px"}}>{dealDaily?.title}</span>
        </div>
        <div className='col-12 text-center'>
          <span className='my-1 text-yellow-500 text-2xl text-center'>{renderStar(dealDaily?.totalRatings)}</span>
        </div>
        <div className='font-semibold overflow-hidden' >{formatMoney(dealDaily?.price)} VNĐ</div>
        <div className='col-12 flex w-12 align-items-center justify-content-between'>
          <Countdown unit={`Hours`} number={hour}/>
          <Countdown unit={`Minutes`} number={minute}/>
          <Countdown unit={`Seconds`} number={second}/>
        </div>
        <div className='col-12 mt-3' style={{paddingBottom: "12px"}}>
          <Button label="OPTIONS" className='w-12' icon="pi pi-align-justify" severity="danger" />
        </div>
      </div>
    </>
  );
}

export default memo(DealDaily);