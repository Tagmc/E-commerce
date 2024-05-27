import { Banner, BestSeller, DealDaily } from '../../components';
import BlogPosts from '../../components/BlogPosts';
import Sibar from '../../components/Sibar/Sibar';
import HotColections from '../../components/HotColections';
import NewArrivals from '../../components/NewArrivals';
import FeatureProduct from '../../components/featureProduct';

function Home() {
  return (
    <div className='grid w-12 mt-4 justify-content-between'>
      <div className='col-12 lg:col-3 p-0 mt-1'>
        <Sibar />
      </div>
      <div className='col-12 lg:col-9 mt-1 p-0 pl-3'>
        <Banner />
      </div>
      <div className='col-12 lg:col-3 p-0 pb-3'>
        <DealDaily />
      </div>
      <div className='col-12 lg:col-9 pl-3 py-0 pr-0'>
        <BestSeller />
      </div>
      <div className='col-12 px-0'>
        <FeatureProduct />
      </div>
      <div className='col-12 px-0 h-full'>
        <NewArrivals />
      </div>
      <div className='col-12 px-0 h-full'>
        <HotColections />
      </div>
      <div className='col-12 px-0 h-full'>
        <BlogPosts />
      </div>
    </div>
  );
}
export default Home;