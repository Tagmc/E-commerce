import slide1 from "../assets/banner.jpg";
import slide2 from "../assets/background_slide2.webp"
import { useState } from "react";
import { Galleria } from 'primereact/galleria';
function Banner() {
  const [images, setImages] = useState([
    {
      src: `${slide1}`,
    },
    {
      src: `${slide2}`,
    }
  ]);
  const itemTemplate = (item) => {
    return <img src={item.src} className="w-12" style={{ objectFit: "cover", aspectRatio: 4/3, height: "394px"}} />;
  }

  return (
    <>
      <div className="">
        <Galleria value={images} numVisible={2} circular style={{ width: "100%"}}
          showItemNavigators showItemNavigatorsOnHover showThumbnails={false} item={itemTemplate} />
      </div>
    </>
  );
};
export default Banner;