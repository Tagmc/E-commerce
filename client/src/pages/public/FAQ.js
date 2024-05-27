import { BreadCrumb } from 'primereact/breadcrumb';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const FAQ = () => {
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);
  const [show5, setShow5] = useState(true);
  const items = [
    {
      label: 'FAQs',
      template: () => <Link to={`/faqs`} className="no-underline text-600 text-sm">FAQs</Link>
    }
  ];
  const home = { icon: 'pi pi-home', url: '/' };
  return (
    <>
      <div className="p-3 pl-0 w-12 flex flex-wrap align-items-center">
        <div className="font-bold col-12">FAQs</div>
        <BreadCrumb model={items} home={home} className="border-x-none border-y-none pl-2 pt-1" />
      </div>
      <div className="w-12 p-3 px-0 grid justify-content-between">
        {show && (
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3' onClick={() => setShow(!show)}>
            <div className='hover:text-red-500'>1. What payment you accept?</div>
            <div className='text-2xl'>+</div>
          </div>
        )}
        {!show && (<>
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 bg-red-500' onClick={() => setShow(!show)}>
            <div>1. What payment you accept?</div>
            <div className='text-2xl'>-</div>
          </div>
          <div className='p-3 border-solid border-1 border-200 text-sm text-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </>
        )}
        {show1 && (
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 mt-4' onClick={() => setShow1(!show)}>
            <div className='hover:text-red-500'>2. In what country can you deliver?</div>
            <div className='text-2xl'>+</div>
          </div>
        )}
        {!show1 && (<>
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 bg-red-500 mt-4' onClick={() => setShow1(!show1)}>
            <div>2. In what country can you deliver?</div>
            <div className='text-2xl'>-</div>
          </div>
          <div className='p-3 border-solid border-1 border-200 text-sm text-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </>
        )}
        {show2 && (
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 mt-4' onClick={() => setShow2(!show2)}>
            <div className='hover:text-red-500'>3. what payments you accept?</div>
            <div className='text-2xl'>+</div>
          </div>
        )}
        {!show2 && (<>
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 bg-red-500 mt-4' onClick={() => setShow2(!show2)}>
            <div>3. what payments you accept?</div>
            <div className='text-2xl'>-</div>
          </div>
          <div className='p-3 border-solid border-1 border-200 text-sm text-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </>
        )}
        {show3 && (
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 mt-4' onClick={() => setShow3(!show3)}>
            <div className='hover:text-red-500'>4. how to track my parcel?</div>
            <div className='text-2xl'>+</div>
          </div>
        )}
        {!show3 && (<>
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 bg-red-500 mt-4' onClick={() => setShow3(!show3)}>
            <div>4. how to track my parcel?</div>
            <div className='text-2xl'>-</div>
          </div>
          <div className='p-3 border-solid border-1 border-200 text-sm text-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </>
        )}
        {show4 && (
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 mt-4' onClick={() => setShow4(!show4)}>
            <div className='hover:text-red-500'>5. how to handle my parcel?</div>
            <div className='text-2xl'>+</div>
          </div>
        )}
        {!show4 && (<>
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 bg-red-500 mt-4' onClick={() => setShow4(!show4)}>
            <div>5. how to handle my parcel?</div>
            <div className='text-2xl'>-</div>
          </div>
          <div className='p-3 border-solid border-1 border-200 text-sm text-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </>
        )}
        {show5 && (
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 mt-4 mb-4' onClick={() => setShow5(!show5)}>
            <div className='hover:text-red-500'>6. Why amadea is the best e-commerce theme?</div>
            <div className='text-2xl'>+</div>
          </div>
        )}
        {!show5 && (<>
          <div className='col-12 border-solid border-1 border-200 cursor-pointer flex justify-content-between p-3 bg-red-500 mt-4' onClick={() => setShow5(!show5)}>
            <div>6. Why amadea is the best e-commerce theme?</div>
            <div className='text-2xl'>-</div>
          </div>
          <div className='p-3 border-solid border-1 border-200 mb-4 text-sm text-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </>
        )}
      </div>
    </>
  );
}
export default FAQ;