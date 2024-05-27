import { Header } from "../../components";
import Footer from "../../components/Footer";
import TopHeader from "../../components/TopHeader";
import { InputText } from "primereact/inputtext";
import { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useParams,useNavigate } from "react-router-dom";
import { apiResetpassword } from "../../apis/user";
import path from "../../utils/Path";
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const toast = useRef(null);
  const navigate = useNavigate();
  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Password was successfully changed!' });
  };
  const show1 = (response) => {
    toast.current.show({ severity: 'error', summary: 'Failed', detail: response.mes });
  };
  const handleClickReset = async () => {
    const response = await apiResetpassword({password, token});
    if (response?.success) {
      show();
    } else {
      show1(response);
    }
  }
  const handleClickBack = () => {
    navigate(`/${path.LOGIN}`);
  }
  return (
    <>
      <TopHeader />
      <div className="grid w-10 flex-column mx-auto align-items-center mt-2">
        <Header />
        <div className="pt-5 w-12 pl-2 border-x-none border-solid border-bottom-none border-1 text-2xl">
        </div>
        <div className="card flex flex-wrap justify-content-center mt-2 w-12 py-5">
          <label for="password" className="col-12 text-center font-bold mb-4 text-xl">Enter your new password: </label>
          <InputText id="password" className="w-4" placeholder="Type here" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='flex justify-content-center col-12 mt-2'>
          <Toast ref={toast} />
          <Button label="Submit" onClick={handleClickReset} className='w-4' severity="secondary" />
        </div>
        <div className='flex justify-content-center col-12 mb-6'>
          <Toast ref={toast} />
          <Button label="Back" onClick={handleClickBack} className='w-4' severity="secondary" />
        </div>
      </div>
      <Footer />
    </>
  );
}
export default ResetPassword;