import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token, user } = getAuthCredentials();
  const location = useLocation();
  const noCompany = user?.user?.company?.length < 1;
  if (!token) {
    // not logged in so redirect to login page with the return url
    return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} />;
  }

  if (token && noCompany && location.pathname !== ROUTES.COMPANY.CREATE) {
    return (
      <Navigate
        to={ROUTES.COMPANY.CREATE}
        state={{ from: location.pathname }}
      />
    );
  }

  // authorized so return child components
  return <>{children}</>;
};

export default PrivateRoute;
