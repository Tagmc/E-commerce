import { NavLink } from 'react-router-dom';
import { createSlug } from '../../utils/helpers';
import { useSelector } from "react-redux";
//useSelector to get variable in redux
function Sibar() {
  const { categories } = useSelector(state => state.app);
  return (
    <div className="border-solid border-200 border-1">
      <div className="bg-red-500 text-white p-3 font-bold"><i className="fa-solid fa-list mr-2"></i>ALL COLECTIONS</div>
      <div className="flex flex-column ">
        {categories?.map(item => (
          <NavLink
            className={({ isActive }) => isActive ? 'text-red-500 hover:text-red-500 no-underline mb-4 px-3 py-2 text-sm text-color' : 'no-underline px-3 text-sm py-2 text-color mb-4 hover:text-red-500'}
            key={createSlug(item.title)}
            to={createSlug(item.title)}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sibar;