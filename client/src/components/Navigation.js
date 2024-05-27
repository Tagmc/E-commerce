import { navigation } from '../utils/constant';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div className="w-full mt-3 border-solid border-x-none border-500 border-1 h-3rem py-2 flex">
      <div className='flex col-12 lg:col-4 justify-content-between align-items-center'>
        {navigation.map(item =>
        (<NavLink to={item.path} key={item.id} className={({ isActive }) => isActive ? "no-underline  text-sm text-red-500 hover:text-red-500 " : "no-underline text-color text-sm hover:text-red-500"}>
          {item.value}
        </NavLink>)
        )}
      </div>
    </div>
  );
}
export default Navigation;