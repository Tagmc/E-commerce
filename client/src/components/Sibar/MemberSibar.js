import logo from '../../assets/logo_digital_new_250x.png';
import { memberSibar } from '../../utils/constant';
import { NavLink, Link } from 'react-router-dom';
import { memo, useState } from 'react';
import clsx from 'clsx';
import { Avatar } from 'primereact/avatar';
import { useSelector } from 'react-redux';
const activeStyle = 'mt-2 no-underline text-white flex align-items-center gap-2 p-2 font-semibold bg-gray-900';
const notActiveStyle = 'mt-2 no-underline text-white flex align-items-center gap-2 p-2 font-semibold hover:bg-gray-500';
const MemberSibar = () => {
  const [active, setActive] = useState([]);
  const handleShowTabs = (tabID) => {
    if (active.some(item => item === tabID)) setActive(pre => pre.filter(el => el !== tabID));
    else setActive(pre => [...pre, tabID])
  };
  const { current } = useSelector(state => state.user);
  return (
    <>
      <div className="h-full ml-0 surface-400">
        <div className='w-12 flex flex-column flex-wrap p-4 flex-auto algin-items-center justify-content-center gap-2'>
          <div className='text-center'>
            <Avatar size="xlarge" image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className="mr-2 cursor-pointer" shape="circle" />
          </div>
          <div className=' text-center mb-2 font-semibold text-xl'>{current?.lastname} {current?.firstname}</div>
        </div>
        <div className=''>
          {memberSibar.map(item => (
            <>
              {item.type === 'SINGLE' &&
                <NavLink
                  className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}
                  to={item.path} onClick={e => e.stopPropagation()}>
                  <div>{item.icon}</div>
                  <div>{item.text}</div>
                </NavLink>}
            </>
          ))}
          <NavLink
            to={'/'} className={clsx(notActiveStyle)} >
            <i class="fa-solid fa-rotate-left"></i>Go Home
          </NavLink>
        </div>
      </div>
    </>
  )
}
export default memo(MemberSibar);