import { Outlet, Navigate } from 'react-router-dom';
import path from '../../utils/Path';
import { useSelector } from 'react-redux';
import MemberSibar from '../../components/Sibar/MemberSibar';
const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user);
  if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <>
      <div className='flex w-screen h-screen overflow-auto mx-0 bg-bluegray-400 relative text-white' style={{ height: "100vw" }}>
        <div className='col-2 p-0 ml-0 fixed top-0 bottom-0'>
          <MemberSibar />
        </div>
        <div className='col-2'></div>
        <div className='flex-auto'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MemberLayout;