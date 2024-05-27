import { memo, useState } from "react";
import { productInfoTabs } from "../utils/constant";
const activeStyles = '';
const notActiveStyles = '';
const ProductInformation = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <div className="flex align-items-center relative" style={{ bottom: '-1px' }}>
        {productInfoTabs.map(item => (
          <span key={item.id} className={`bg-gray-200 border-1 border-200 border-solid p-2 mr-2 cursor-pointer ${activeTab === item.id && 'bg-white border-bottom-none'}`} onClick={() => setActiveTab(item.id)}>{item.name}</span>
        ))}
      </div>
      <div className="w-12 border-solid border-1 border-200 py-3">
        <div className="text-2xl text-gray-600 font-bold px-3">
          {productInfoTabs.some(item => item.id === activeTab) && productInfoTabs.find(e => e.id === activeTab)?.title}
        </div>
        <div className="text-lg text-gray-500 px-3 gap-2">
          {productInfoTabs.some(item => item.id === activeTab) && productInfoTabs.find(e => e.id === activeTab)?.content}
        </div>
      </div>
    </>
  )
};
export default memo(ProductInformation);