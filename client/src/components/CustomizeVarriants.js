import { memo, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import InputForm from "./InputForm";
import { Button } from "primereact/button";
import { getBase64 } from "../utils/helpers";
import Swal from 'sweetalert2';
import { apiAddVarriants } from "../apis/product";
const CustomizeVarriants = ({ customizeVarriants, setCustomizeVarriants, render }) => {
  const { register, formState: { errors }, reset, handleSubmit, watch } = useForm();
  const [hover, setHover] = useState(null);
  const [preview, setPreview] = useState({
    thumb: null,
    images: []
  })
  useEffect(() => {
    reset({
      title: customizeVarriants?.title,
      color: customizeVarriants?.color,
      price: customizeVarriants?.price,
    });
  }, [customizeVarriants]);
  const handlePreview = async (file) => {
    const base64Thumb = await getBase64(file);
    if (base64Thumb) setPreview(pre => ({ ...pre, thumb: base64Thumb }));
  }
  const handlePreviewImages = async (files) => {
    const imagesPre = [];
    for (let file of files) {
      // if (file.type != 'image/png' && file.type != 'image/jpg') {
      //   show();
      //   return;
      // }
      const base64 = await getBase64(file);
      imagesPre.push(base64);
    }
    if (imagesPre.length > 0) setPreview(pre => ({ ...pre, images: imagesPre }))
  }
  console.log(customizeVarriants);
  useEffect(() => {
    if (watch('thumb') instanceof FileList && watch('thumb').length > 0) { handlePreview(watch('thumb')[0]); }
  }, [watch('thumb')]);
  useEffect(() => {
    if (watch('images') instanceof FileList && watch('images').length > 0) {
      handlePreviewImages(watch('images'));
    }
  }, [watch('images')]);
  const handleAddVarriant = async (data) => {
    if (data.color === customizeVarriants.color) Swal.fire('Oops', 'Color not changed', 'info');
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) {
        formData.append('thumb', data.thumb[0]);
      }
      if (data.images) {
        for (const image of data.images) {
          formData.append('images', image)
        }
      }
      const response = await apiAddVarriants(formData, customizeVarriants?._id);
      if (response?.success) {
        Swal.fire('Congratulations!', 'Add varriants is successful', 'success').then(() => {
          reset();
          setPreview({
            thumb: null,
            images: []
          });
        });
      } else {
        Swal.fire('Fail!', 'Add varriants is failed', 'error').then(() => {
          reset();
          setPreview({
            thumb: null,
            images: []
          });
        });
      }
    }
  }
  return (
    <div className='w-12 h-full flex flex-column gap-4'>
      <div className="h-5rem flex justify-content-between align-items-center text-2xl font-bold p-4 border-200 border-1 border-x-none border-top-none">
        <span>Customize varriants of Product</span>
        <span onClick={() => setCustomizeVarriants(null)} className="text-base font-normal cursor-pointer hover:underline">Back</span>
      </div>
      <form onSubmit={handleSubmit(handleAddVarriant)} className="p-4">
        <div className='flex gap-4 mt-3'>
          <InputForm
            style="w-12"
            label='Name of product'
            register={register}
            errors={errors}
            id='title'
            validate={{
              required: 'Title is required'
            }}
            placeholder={'Title of product'}
          />
        </div>
        <div className='flex gap-4 mt-3'>
          <InputForm
            style="w-12"
            label='Price'
            register={register}
            errors={errors}
            id='price'
            validate={{
              required: 'Price is required'
            }}
            placeholder={'Price of product'}
            type='number'
          />
          <InputForm
            style="w-12"
            label='Color of product'
            register={register}
            errors={errors}
            id='color'
            validate={{
              required: 'Color is required'
            }}
            placeholder={'Color of product'}
          />
        </div>
        <div className='flex flex-column gap-2 mt-3'>
          <label className='font-semibold' htmlFor='thumb'>Upload thumb</label>
          <input
            type='file'
            id='thumb'
            {...register('thumb', { required: 'Thumb is required' })}
          />
          {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
        </div>
        {preview.thumb && <div className='mt-3'>
          <img style={{ width: "226px", height: "226px" }} src={preview.thumb} alt='thumbnail' />
        </div>}
        <div className='flex flex-column gap-2 mt-3'>
          <label className='font-semibold' htmlFor='products'>Upload images of product</label>
          <input
            type='file'
            id='products'
            {...register('images', { required: 'Images is required' })}
            multiple
          />
          {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
        </div>
        <div className='flex flex-wrap'>
          {preview.images?.length > 0 && preview.images?.map((ele, index) =>
            <div className='mt-3 ml-2 relative' onMouseEnter={() => setHover(ele.name)} onMouseLeave={() => setHover(null)}>
              <img style={{ width: "150px", height: "150px" }} src={ele} alt='thumbnail' key={index} />
              {/* {hover === ele.name && <div className='absolute  w-12 h-full top-0 left-0 scale-down-center bg-black-alpha-50 flex align-items-center justify-content-center text-xl cursor-pointer' onClick={() => handleRemoveImage(ele.name)}><i class="fa-solid fa-trash"></i></div>} */}
            </div>)}
        </div>
        <div className='mt-4'>
          <Button type='submit' label='Add varriant' severity='primary' />
        </div>
      </form>
    </div>
  );
}
export default memo(CustomizeVarriants);