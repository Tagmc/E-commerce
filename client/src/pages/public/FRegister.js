import { useParams, useNavigate } from "react-router-dom";
import path from "../../utils/Path";
import { useEffect } from "react";
import Swal from 'sweetalert2';
const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 'fail') Swal.fire('Oops!', 'Sign up is not successful', 'error').then(() => {
      navigate(`/${path.LOGIN}`);
    });
    if (status === 'success') Swal.fire('Congratulations!', 'Sign up is successful', 'success').then(() => {
      navigate(`/${path.LOGIN}`);
    });
  }, []);
  return (
    <>
      <div className="h-screen w-screen bg-gray-400"></div>
    </>
  )
}
export default FinalRegister;