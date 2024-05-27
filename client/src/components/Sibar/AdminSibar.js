import logo from '../../assets/logo_digital_new_250x.png';
import { adminSibar } from '../../utils/constant';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
const activeStyle = 'mt-2 no-underline text-white flex align-items-center gap-2 p-2 font-semibold bg-gray-900';
const notActiveStyle = 'mt-2 no-underline text-white flex align-items-center gap-2 p-2 font-semibold hover:bg-gray-500';
const AdminSibar = () => {
  const [active, setActive] = useState([]);
  const handleShowTabs = (tabID) => {
    if (active.some(item => item === tabID)) setActive(pre => pre.filter(el => el !== tabID));
    else setActive(pre => [...pre, tabID])
  }
  return (
    <>
      <div className="h-full ml-0 surface-400">
        <Link to={`/`} className='flex flex-wrap p-4 flex-auto algin-items-center justify-content-center gap-2'>
          <img src={logo} className='bg-contain' />
          <div className='mb-4'>Admin Workspace</div>
        </Link>
        <div className=''>
          {adminSibar.map(item => (
            <>
              {item.type === 'SINGLE' && <NavLink
                className={({isActive}) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}
                to={item.path} >
                <div>{item.icon}</div>
                <div>{item.text}</div>
              </NavLink>}
              {item.type === 'PARENT' && <div onClick={() => handleShowTabs(+item.id)} className='flex flex-column cursor-pointer '>
                <div className='text-white flex align-items-center justify-content-between hvoer:bg-gray-600 gap-2 p-2 font-semibold hover:bg-gray-900'>
                  <div className='flex align-items-center gap-2'>
                    <div>{item.icon}</div>
                    <div>{item.text}</div>
                  </div>
                  {!active.some(id => id === item.id) ? <i class="fa-solid fa-caret-down"></i> : <i class="fa-solid fa-caret-right"></i>}
                </div>
                {active.some(id => +id === +item.id) && <div className='flex flex-column'>
                  {item.submenu.map(el => (
                    <NavLink  className={({isActive}) => clsx(isActive && activeStyle, !isActive && notActiveStyle, 'pl-6')} onClick={e => e.stopPropagation()}  to={el.path} >
                      {el.text}
                    </NavLink>
                  ))}
                </div>}
              </div>}
            </>
          ))}
        </div>
      </div>
    </>
  )
}
export default AdminSibar;