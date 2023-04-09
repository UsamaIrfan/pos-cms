import { getAuthCredentials, isAuthenticated } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import Logo from '@components/ui/logo';
import LoginForm from '@components/auth/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const { token, permissions } = getAuthCredentials();
  useEffect(() => {
    if (isAuthenticated({ token, permissions })) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [token, permissions]);
  return (
    <div
      className='row justify-content-center align-items-center m-0 p-0'
      style={{ height: '100vh' }}
    >
      <div className='col-4 border p-4'>
        <div className='col-4 mb-2'>{/* <Logo /> */}</div>
        <h3 className='text-body mb-4 mt-4 text-center text-base italic'>
          Login to Auction180
        </h3>
        <LoginForm />
      </div>
    </div>
  );
}
