import { AUTH_CRED } from '@utils/constants';
import { ROUTES } from '@utils/routes';
import { Spin } from 'antd';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove(AUTH_CRED);
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  return (
    <div
      style={{ width: '100%', height: '100vh' }}
      className='d-flex justify-content-center align-items-center'
    >
      <Spin />
    </div>
  );
}

export default Logout;
