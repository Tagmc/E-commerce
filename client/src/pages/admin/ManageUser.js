import { apiGetUsers, apiUpdateUser, apiDeleteUser } from "../../apis/user";
import { useCallback, useEffect, useState, useRef } from 'react';
import { roles, blockStatus } from "../../utils/constant";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import useDebounce from '../../hooks/useDebounce';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useSearchParams } from "react-router-dom";
import InputForm from "../../components/InputForm";
import Select from "../../components/Select";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const [value, setValue] = useState('');
  const [editEl, setEditEl] = useState(null);
  const [params] = useSearchParams();
  const [update, setUpdate] = useState(false);
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    phone: '',
    isBlocked: ''
  });
  const fetchUser = async (params) => {
    const response = await apiGetUsers({ ...params, limit: +process.env.REACT_APP_LIMIT_PAGE });
    if (response?.success) {
      setUsers(response);
    }
  }
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update])
  const queriDebounce = useDebounce(value, 800);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriDebounce) {
      queries.q = queriDebounce;
    }
    fetchUser(queries);

  }, [queriDebounce, params, update]);
  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, editEl._id);
    if (response?.success) {
      reset();
      setEditEl(null);
      render();
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  }
  const handleDelete = (uid) => {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'Are you ready remove this user?',
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else {
          toast.error(response.mes);
        }
      }
    })

  }
  return (
    <>
      <div>
        <div className="h-5rem flex justify-content-between align-items-center text-2xl font-bold px-4 border-200 border-1 border-x-none border-top-none">
          <span>Manage Users</span>
        </div>
        <div className="w-12 p-3">
          <div className="flex mb-3">
            <div className="col-9">

            </div>
            <div className="p-inputgroup flex-1">
              <InputText placeholder="Search name user..." value={value} onChange={(e) => setValue(e.target.value)} />
              <Button icon="pi pi-search" className="p-button-warning" />
            </div>
          </div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            {editEl && <Button type="submit" label="Update" severity="danger" className="mb-2" />}
            <table className="mb-3 text-center w-12 border-solid border-1 border-900">
              <thead className="bg-gray-600 text-sm border-solid border-1 border-900">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Email address</th>
                  <th className="px-4 py-2">First name</th>
                  <th className="px-4 py-2">Last name</th>
                  <th className="px-6 py-2">Role</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-5 py-2">Status</th>
                  <th className="px-4 py-2">Created At</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody >
                {users?.users?.map((item, index) => (
                  <tr key={item._id} className="border-solid border-900 border-1">
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">
                      {editEl?._id === item._id ?
                        <InputForm
                          key={editEl?._id}
                          register={register}
                          errors={errors}
                          id={'email'}
                          defaultValue={editEl?.email}
                          validate={{
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "invalid email address"
                            }
                          }}
                        /> :
                        <span>{item.email}</span>
                      }
                    </td>
                    <td className="px-3 py-2">
                      {editEl?._id === item._id ?
                        <InputForm
                          register={register}
                          errors={errors}
                          id={'firstname'}
                          defaultValue={editEl?.firstname}
                          validate={{ required: 'First name is required' }}
                        /> : <span>{item.firstname}</span>}
                    </td>
                    <td className="px-3 py-2">
                      {editEl?._id === item._id ?
                        <InputForm
                          register={register}
                          errors={errors}
                          id={'lastname'}
                          defaultValue={editEl?.lastname}
                          validate={{ required: 'Last name is required' }}
                        /> : <span>{item.lastname}</span>}
                    </td>
                    <td className="px-3 py-2">{editEl?._id === item._id ?
                      <Select
                        register={register}
                        errors={errors}
                        id={'role'}
                        defaultValue={item.role}
                        validate={{
                          required: 'Role is required',
                        }}
                        options1={roles}
                      /> : <span>{roles.find(role => +role.code === +item.role)?.value}</span>}</td>
                    <td className="px-3 py-2">
                      {editEl?._id === item._id ?
                        <InputForm
                          register={register}
                          errors={errors}
                          id={'mobile'}
                          defaultValue={editEl?.mobile}
                          validate={{
                            required: 'Mobile is required',
                            pattern: {
                              value: /^[62|0]+\d{9}/gi,
                              message: "Invalid phone number"
                            }
                          }}
                        /> : <span>{item.mobile}</span>}
                    </td>
                    <td className="px-3 py-2">{editEl?._id === item._id ?
                      <Select
                        register={register}
                        errors={errors}
                        id={'isBlocked'}
                        defaultValue={item.isBlocked}
                        validate={{
                          required: 'Status is required',
                        }}
                        options1={blockStatus}
                      /> : <span>{item.isBlocked ? 'Blocked' : 'Active'}</span>}</td>
                    <td className="px-3 py-2">{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                    <td className="px-3 py-2">
                      {editEl?._id === item._id ? <span onClick={() => { reset(); setEditEl(null) }} className="px-2 text-orange-400 hover:underline cursor-pointer">Back</span> : <span onClick={() => setEditEl(item)} className="px-2 text-orange-400 hover:underline cursor-pointer">Edit</span>}
                      <span onClick={() => handleDelete(item._id)} className="px-2 text-orange-400 hover:underline cursor-pointer">Delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          <div className="w-12 flex justify-content-end">
            <Pagination
              totalCount={users?.counts}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUser;