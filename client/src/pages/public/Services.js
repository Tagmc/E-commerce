import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
const Services = () => {
  const items = [
    {
      label: 'Blog',
      template: () => <Link to={`/services`} className="no-underline text-600 text-sm">Service</Link>
    }
  ];
  const home = { icon: 'pi pi-home', url: '/' };
  return (
    <>
      <div className="p-3 pl-0 w-12 flex flex-wrap align-items-center">
        <div className="font-bold col-12">Blogs</div>
        <BreadCrumb model={items} home={home} className="border-x-none border-y-none pl-2 pt-1" />
      </div>
      <div className="w-12 p-3 px-0 grid justify-content-between">
        <div className='col-12 lg:col-6'>
          <img src='https://digital-world-2.myshopify.com/cdn/shop/files/9069783_orig_400x_5a30224e-9dc2-442a-85fd-0b09a896a89a_400x.jpg?v=1613168570' style={{ height: "277px" }} className='w-12' />
        </div>
        <div className='col-12 lg:col-6 text-600'>
          <div>
            Cras magna tellus, congue vitae congue vel, facilisis id risus. Proin semper in lectus id faucibus. Aenean vitae quam eget mi aliquam viverra quis quis velit.
          </div>
          <div className='mt-3'>
            Curabitur mauris diam, posuere vitae nunc eget, blandit pellentesque mi. Pellentesque placerat nulla at ultricies malesuada. Aenean mi lacus, malesuada at leo vel, blandit iaculis nisl.
          </div>
          <div className='mt-3'>
            Praesent vestibulum nisl sed diam euismod, a auctor neque porta. Vestibulum varius ligula non orci tincidunt rutrum. Suspendisse placerat enim eu est egestas, aliquam venenatis elit accumsan. Donec metus quam, posuere sit amet odio et, ultricies consequat nibh.</div>
        </div>
        <div className='col-12 font-bold text-center text-600 text-3xl my-6'>We Offer Best Services</div>
        <div className='col-4 text-center'>
          <i class="fa-solid fa-gear text-6xl text-400 "></i>
          <div className='text-lg text-600 mt-4'>Customizable Page</div>
          <div className='text-600 text-sm mt-2'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
        </div>
        <div className='col-4 text-center'>
          <i class="fa-regular fa-image text-6xl text-400 "></i>
          <div className='text-lg text-600 mt-4'>Revolution Slider</div>
          <div className='text-600 text-sm mt-2'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
        </div>
        <div className='col-4 text-center'>
          <i className="fa-solid fa-box-archive text-400 text-6xl"></i>
          <div className='text-lg text-600 mt-4'>Drag & Drop Page</div>
          <div className='text-600 text-sm mt-2'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
        </div>
        <div className='col-4 text-center mt-8 mb-6'>
          <i class="fa-regular fa-image text-6xl text-400 "></i>
          <div className='text-lg text-600 mt-4'>Revolution Slider</div>
          <div className='text-600 text-sm mt-2'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
        </div>
        <div className='col-4 text-center mt-8 mb-6'>
          <i class="fa-solid fa-box-archive text-6xl text-400 "></i>
          <div className='text-lg text-600 mt-4'>Drag & Drop Page</div>
          <div className='text-600 text-sm mt-2'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
        </div>
        <div className='col-4 text-center mt-8 mb-6'>
          <i class="fa-solid fa-gear text-6xl text-400 "></i>
          <div className='text-lg text-600 mt-4'>Customizable Page</div>
          <div className='text-600 text-sm mt-2'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
        </div>
      </div>
    </>
  );
}
export default Services;