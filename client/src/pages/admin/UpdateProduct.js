import { memo } from "react";
import { Button } from 'primereact/button';
import { Editor } from "primereact/editor";
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { getBase64 } from '../../utils/helpers';
import { useForm } from 'react-hook-form';
import InputForm from '../../components/InputForm';
import Select from '../../components/Select';
import { apiUpdateProduct } from '../../apis/product';
import Swal from 'sweetalert2';
const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
  const { register, formState: { errors }, reset, handleSubmit, watch } = useForm();
  const [hover, setHover] = useState(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState({
    thumb: null,
    images: []
  });
  const { categories } = useSelector(state => state.app);

  useEffect(() => {
    reset({
      title: editProduct?.title || '',
      price: editProduct?.price || '',
      quantity: editProduct?.quantity || 0,
      color: editProduct?.color || '',
      category: editProduct?.category || '',
      brand: editProduct?.brand?.toLowerCase() || ''
    });
    setDescription((typeof editProduct?.description === 'object') ? editProduct?.description?.join(', ') : editProduct?.description);
    setPreview({
      thumb: editProduct?.thumb || "",
      images: editProduct?.images || []
    });
  }, [editProduct]);
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
  // const handleRemoveImage = (name) => {
  //   const files = [...watch('images')];
  //   reset({
  //     images: files?.filter(item => item.name !== name)
  //   });
  //   if (preview?.images?.some(item => item.name === name)) setPreview(pre => ({...pre, images: preview.images.filter(el => el.name !== name)}))
  // }
  useEffect(() => {
    if (watch('thumb') instanceof FileList && watch('thumb').length > 0) { handlePreview(watch('thumb')[0]); }
  }, [watch('thumb')]);
  useEffect(() => {
    if (watch('images') instanceof FileList && watch('images').length > 0) {
      handlePreviewImages(watch('images'));
    }
  }, [watch('images')]);
  const handleUpdateProduct = async (data) => {
    if (!description) {
      return;
    }
    if (data?.category) data.category = categories?.find(item => item.title === data.category)?.title;

    const finalPayload = { ...data, description };
    finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]
    //console.log(finalPayload);
    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    // if (finalPayload.thumb) {
    //   formData.append('thumb', finalPayload?.thumb?.length === 0 ? preview.thumb : finalPayload.thumb[0]);
    // }
    finalPayload.images = data.images?.length === 0 ? preview.images : data.images;
    for (const image of finalPayload.images) {
      formData.append('images', image)
    }

    const response = await apiUpdateProduct(formData, editProduct._id);
    //console.log(response);
    if (response?.success) {
      Swal.fire('Congratulations!', response.mes, 'success').then(() => {
        reset();
        setDescription(null);
        setPreview({
          thumb: null,
          images: []
        });
        render();
        setEditProduct(null);
      });
    } else {
      Swal.fire('Fail!', response.mes, 'error').then(() => {
        reset();
        setDescription(null);
        setPreview({
          thumb: null,
          images: []
        });
      });
    }
  }
  return (
    <div className='w-12 h-full flex flex-column gap-4'>
      <div className="h-5rem flex justify-content-between align-items-center text-2xl font-bold p-4 border-200 border-1 border-x-none border-top-none">
        <span>Update Product</span>
        <span onClick={() => setEditProduct(null)} className="text-base font-normal cursor-pointer hover:underline">Cancel</span>
      </div>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label='Name of product'
            register={register}
            errors={errors}
            id='title'
            validate={{
              required: 'Title is required'
            }}
            placeholder={'Title of product'}
          />
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
              label='Quantity'
              register={register}
              errors={errors}
              id='quantity'
              validate={{
                required: 'Quantity is required'
              }}
              placeholder={'Quantity of product'}
              type='number'
            />
            <InputForm
              style="w-12"
              label='Color'
              register={register}
              errors={errors}
              id='color'
              validate={{
                required: 'Color is required'
              }}
              placeholder={'Color of product'}
            />
          </div>
          <div className='w-12 flex gap-4 mt-3'>
            <Select
              label='Category'
              options1={categories?.map(item => ({ code: item.title, value: item.title }))}
              register={register}
              errors={errors}
              id='category'
              validate={{
                required: 'Category is required'
              }}
            />
            <Select
              label='Brand'
              options1={categories?.find(item => item.title === watch('category'))?.brand?.map(el => ({ code: el.toLowerCase(), value: el }))}
              register={register}
              errors={errors}
              id='brand'
              validate={{
                required: 'Brand is required'
              }}
            />
          </div>
          <div className="card mt-3">
            <label>Description</label>
            <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '320px' }} />
            {!description && <small className='text-red-400 font-semibold'>Description is required</small>}
          </div>
          <div className='my-3'>

          </div>
          <div className='flex flex-column gap-2 mt-3'>
            <label className='font-semibold' htmlFor='thumb'>Upload thumb</label>
            <input
              type='file'
              id='thumb'
              {...register('thumb')}
            />
            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
          </div>
          {preview.thumb && <div className='mt-3'>
            <img style={{ width: "150px", height: "150px" }} src={preview.thumb} alt='thumbnail' />
          </div>}
          <div className='flex flex-column gap-2 mt-3'>
            <label className='font-semibold' htmlFor='products'>Upload images of product</label>
            <input
              type='file'
              id='products'
              {...register('images')}
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
            <Button type='submit' label='Update Product' severity='primary' />
          </div>
        </form>
      </div>
    </div>
  )
}
export default memo(UpdateProduct);