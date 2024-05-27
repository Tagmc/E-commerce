import { useCallback, useState, useRef } from 'react';
import backlog from '../../assets/backlog.jpg';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { apiLogin, apiRegister, apiForgotPassword } from '../../apis/user';
import { Toast } from 'primereact/toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import path from '../../utils/Path';
function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [firstname, setFistname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email1, setEmail1] = useState('');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Congratulations', detail: 'Please check your email to active account' });
  };
  const show1 = (response) => {
    toast.current.show({ severity: 'error', summary: 'Failed', detail: response.mes });
  };
  const handleClickLogin = useCallback(async () => {
    const payload = {};
    payload.email = email1;
    payload.password = password;
    const response = await apiLogin(payload);
    //console.log(response);
    if (response?.success) {
      dispatch(login({ isLoggedIn: true, token: response.accessToken, userData: response.userData }));
      resetInfo();
      if (searchParams.get('redirect')) {
        navigate(searchParams.get('redirect'));
      }
      else {
        navigate(`/${path.HOME}`);
      }
    } else {
      show1(response);
    }
  }, [email1, password]);
  const resetInfo = () => {
    setFistname('');
    setLastname('');
    setEmail1('');
    setPassword('');
    setPhone('');
  }
  const handleClickSignup = useCallback(async () => {
    const payload = {};
    payload.firstname = firstname;
    payload.lastname = lastname;
    payload.password = password;
    payload.email = email1;
    payload.mobile = phone;
    const response = await apiRegister(payload);
    if (response?.success) {
      show();
      resetInfo();
    } else {
      show1(response);
    }
  }, [firstname, lastname, password, email1, phone]);
  const handleForgotPassword = () => {
    setVisible(true);
  }
  const handleSubmit = async (e) => {
    const response = await apiForgotPassword({ email });
    if (response?.success) {
      toast.current.show({ severity: 'success', summary: 'Congratulations', detail: 'Please check your email to reset password' });
    } else {
      show1(response);
    }
    //setVisible(false);
  }
  return (
    <>
      <div className="grid w-screen h-screen overflow-hidden bg-blue-200">
        <div className="grid w-8 mx-auto my-auto bg-white h-29rem border-round-2xl">
          <div className="col-1 lg:col-6 px-0 py-0">
            <img src={backlog} className="w-12 px-0 py-0 h-full border-round-2xl border-noround-right" />
          </div>
          {isRegister === false && <div className='col-10 lg:col-6'>
            <div className='text-center mt-5 text-4xl font-bold '>Login</div>
            <div className="card flex justify-content-center mt-4">
              <FloatLabel className="">
                <InputText id="email" value={email1} onChange={(e) => setEmail1(e.target.value)} />
                <label for="email">Email</label>
              </FloatLabel>
            </div>
            <div className="card flex justify-content-center mt-4">
              <FloatLabel>
                <InputText id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <label for="password">Password</label>
              </FloatLabel>
            </div>
            <div className='flex justify-content-center mt-5'>
              <Toast ref={toast} />
              <Button label="Login" onClick={handleClickLogin} className='w-6' severity="secondary" />
            </div>
            <div className='text-gray-500 font-semibold hover:underline cursor-pointer text-center mt-5'>
              <div onClick={handleForgotPassword}>Forgot password</div>
              <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                  <div className="flex flex-column px-8 py-5 gap-4 modal" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--bluegray-100), var(--bluegray-400))' }}>
                    <div className="inline-flex flex-column gap-2">
                      <label htmlFor="username" className="text-primary-50 font-semibold">
                        Email
                      </label>
                      <InputText id="email-reset" label="Email" placeholder='Enter your email' className="bg-white-alpha-20 border-none p-3 text-base" onChange={(e) => setEmail(e.target.value)}></InputText>
                    </div>
                    <div className="flex align-items-center gap-2">
                      <Toast ref={toast} />
                      <Button label="Submit" onClick={handleSubmit} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                      <Button label="Back" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                  </div>
                )}
              ></Dialog>
            </div>
            <div className='flex justify-content-center mt-4'>
              <div>Do you have an Account?</div>
              <div className='text-gray-500 font-semibold hover:underline cursor-pointer text-center ml-1' onClick={() => setIsRegister(true)}>
                Sign Up
              </div>
            </div>
          </div>}
          {isRegister === true && <div className='col-6'>
            <div className='text-center mt-3 text-4xl font-bold '>Sign up</div>
            <div className="card flex justify-content-center mt-2">
              <FloatLabel>
                <InputText id="email" value={email1} onChange={(e) => setEmail1(e.target.value)} />
                <label for="email">Email</label>
              </FloatLabel>
            </div>
            <div className="card flex justify-content-center mt-4">
              <div>
                <FloatLabel className="text-right">
                  <InputText id="firstname" className='' value={firstname} onChange={(e) => setFistname(e.target.value)} style={{ width: '50%' }} />
                  <label for="firstname" style={{ left: "55%" }}>First Name</label>
                </FloatLabel>
              </div>
              <div className=''>
                <FloatLabel>
                  <InputText id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} style={{ width: '50%' }} />
                  <label for="lastname">Last Name</label>
                </FloatLabel>
              </div>
            </div>
            <div className="card flex justify-content-center mt-4">
              <FloatLabel>
                <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <label for="phone">Phone</label>
              </FloatLabel>
            </div>
            <div className="card flex justify-content-center mt-4">
              <FloatLabel>
                <InputText id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <label for="password">Password</label>
              </FloatLabel>
            </div>
            <div className='flex justify-content-center mt-5'>
              <Toast ref={toast} />
              <Button label="Sign up" onClick={handleClickSignup} className='w-6' severity="secondary" />
            </div>
            <div className='text-gray-500 font-semibold hover:underline cursor-pointer text-center mt-3' onClick={() => setIsRegister(false)}>Go Back</div>
          </div>}
        </div>
      </div>
    </>
  );
};

export default Login;