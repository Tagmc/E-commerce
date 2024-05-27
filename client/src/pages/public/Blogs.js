import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
const Blogs = () => {
  const items = [
    {
      label: 'Blog',
      template: () => <Link to={`/blogs`} className="no-underline text-600 text-sm">Blogs</Link>
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
        <div className='col-12 lg:col-9 flex flex-wrap'>
          <div className='col-12 lg:col-6 p-0'>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/articles/blog4_1024x1024.jpg?v=1492594943' style={{ width: "440px", height: "280px" }} />
          </div>
          <div className='col-12 lg:col-5 p-0'>
            <div className='text-lg font-bold hover:text-red-500'>
              THE STANDARD LOREM IPSUM PASSAGE, USED SINCE THE 1500S
            </div>
            <div className='text-sm text-color-secondary mt-2'>By Tada Theme Apr 14, 2017</div>
            <div className='mt-3 text-700'>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia dolore consequuntur magni dolores eos...
            </div>
            <div className='text-red-500 mt-3 cursor-pointer'>Read More<i className="text-xs fa-solid fa-arrow-right-long ml-2"></i></div>
          </div>
          <div className='col-12 lg:col-6 p-0 mt-5'>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1492594940' style={{ width: "440px", height: "280px" }} />
          </div>
          <div className='col-12 lg:col-5 p-0 mt-5'>
            <div className='text-lg font-bold hover:text-red-500'>
              THE STANDARD LOREM IPSUM PASSAGE, USED SINCE THE 1500S
            </div>
            <div className='text-sm text-color-secondary mt-2'>By Tada Theme Apr 14, 2017</div>
            <div className='mt-3 text-700'>
              Shoe street style leather tote oversized sweatshirt A.P.C. Prada Saffiano crop slipper denim shorts spearmint. Braid skirt round sunglasses seam leather vintage Levi plaited. Flats holographic Acne grunge collarless denim chunky sole cuff tucked t-shirt strong eyebrows. Clutch center part dress dungaree slip dress. Skinny jeans knitwear minimal tortoise-shell sunglasses...
            </div>
            <div className='text-red-500 mt-3 cursor-pointer'>Read More<i className="text-xs fa-solid fa-arrow-right-long ml-2"></i></div>
          </div>
          <div className='col-12 lg:col-6 p-0 mt-5'>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/articles/blog2_1024x1024.jpg?v=1492594930' style={{ width: "440px", height: "280px" }} />
          </div>
          <div className='col-12 lg:col-5 p-0 mt-5'>
            <div className='text-lg font-bold hover:text-red-500'>
              THE STANDARD LOREM IPSUM PASSAGE, USED SINCE THE 1500S
            </div>
            <div className='text-sm text-color-secondary mt-2'>By Tada Theme Apr 14, 2017</div>
            <div className='mt-3 text-700'>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia dolore consequuntur magni dolores eos...
            </div>
            <div className='text-red-500 mt-3 cursor-pointer'>Read More<i className="text-xs fa-solid fa-arrow-right-long ml-2"></i></div>
          </div>
        </div>
        <div className='col-12 lg:col-3'>
          <div className='border-solid border-1 border-200'>
            <div className='p-2 text-white bg-red-500 font-bold text-xl'>RECENT ARTICLES</div>
            <div className='text-900 mt-4 font-semibold p-2 px-3'>The standard Lorem Ipsum passage, used since the 1500s</div>
            <div className='text-sm text-color-secondary mt-2 px-3'>Apr 14, 2017</div>
            <div className='text-900 mt-4 font-semibold p-2 px-3'>Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC</div>
            <div className='text-sm text-color-secondary mt-2 px-3'>Apr 14, 2017</div>
            <div className='text-900 mt-4 font-semibold p-2 px-3'>Quisque porta felis est ut malesuada lorem dignissim</div>
            <div className='text-sm text-color-secondary mt-2 px-3 mb-6'>Apr 14, 2017</div>
          </div>
          <div>
            <img className='w-12 mt-5' src='https://digital-world-2.myshopify.com/cdn/shop/files/9069783_orig_400x_5a30224e-9dc2-442a-85fd-0b09a896a89a_400x.jpg?v=1613168570' />
          </div>
        </div>
      </div>
    </>
  );
}
export default Blogs;