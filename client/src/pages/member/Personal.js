import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useEffect, useRef } from "react";
import { Button } from 'primereact/button';
import { apiUpdateCurrent } from "../../apis/user";
import { getCurrent } from "../../store/user/asyncAction";
import { Toast } from 'primereact/toast';
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
const Personal = () => {
  const toast = useRef(null);
  const show = (response) => {
    toast.current.show({ severity: response?.success === true ? 'success' : 'error', summary: response?.success === true ? 'Success' : 'Error', detail: response?.mes });
  };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleSubmit, register, formState: { errors, isDirty }, reset } = useForm();
  const { current } = useSelector(state => state.user);
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      address: current?.address
    })
  }, [current]);
  const dispatch = useDispatch();
  const handleUpdateInfor = async (data) => {
    const formData = new FormData();
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateCurrent(data);
    if (response?.success) {
      Swal.fire('Congratulations!', response.mes, 'success')
      dispatch(getCurrent());
      show(response);
      if (searchParams.get('redirect')) navigate(searchParams.get('redirect'));
    } else {
      Swal.fire('Fail!', response.mes, 'error')
      show(response);
    }
  }
  return (
    <div className="w-12">
      <div className="h-5rem flex justify-content-between align-items-center text-2xl font-bold px-4 border-200 border-1 border-x-none border-top-none">
        <span>Personal</span>
      </div>
      <form onSubmit={handleSubmit(handleUpdateInfor)} className="p-4 w-6 mx-auto flex flex-column gap-4">
        <InputForm
          style={"py-2"}
          label='First Name'
          register={register}
          errors={errors}
          id='firstname'
          validate={{
            required: 'First name is required'
          }}
        />
        <InputForm
          style={"py-2"}
          label='Last Name'
          register={register}
          errors={errors}
          id='lastname'
          validate={{
            required: 'Last name is required'
          }}
        />
        <InputForm
          style={"py-2"}
          label='Email address'
          register={register}
          errors={errors}
          id='email'
          validate={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          }}
        />
        <InputForm
          style={"py-2"}
          label='Phone'
          register={register}
          errors={errors}
          id='mobile'
          validate={{
            required: 'Mobile is required',
            pattern: {
              value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
              message: "Invalid phone number"
            }
          }}
        />
         <InputForm
          style={"py-2"}
          label='Address'
          register={register}
          errors={errors}
          id='address'
          validate={{
            required: 'Address is required',
          }}
        />
        <div className="flex align-items-center gap-2">
          <span className="font-medium">Account status:</span>
          <span className="text-red-600">{current?.isBlocked ? 'Blocked' : 'Active'}</span>
        </div>
        <div className="flex align-items-center gap-2">
          <span className="font-medium">Role:</span>
          <span className="text-red-600">{+current?.role === 1975 ? 'User' : 'Admin'}</span>
        </div>
        <div className="flex align-items-center gap-2">
          <span className="font-medium">Created At:</span>
          <span >{moment(current?.createdAt).fromNow()}</span>
        </div>
        {isDirty && <><Toast ref={toast} /> <div className="flex justify-content-end">
          <Button  type="submit"  label="Update information" />
        </div> </>}
      </form>
    </div>
  )
}

export default Personal;