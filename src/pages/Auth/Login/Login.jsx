import { getAuthCredentials, isAuthenticated } from '@utils/auth';
import { THEME_OPTIONS } from '@utils/enums';
import Images from '@utils/images';
import { ROUTES } from '@utils/routes';
import { Image, Typography } from 'antd';
import cn from 'classnames';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Colors from 'src/theme/Colors';

import styles from './Login.module.css';

// import Logo from '@components/ui/logo';
import LoginForm from '@components/auth/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.app.theme);
  const { token, permissions } = getAuthCredentials();
  useEffect(() => {
    if (isAuthenticated({ token, permissions })) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [token, permissions]);

  const onRegister = () => navigate(ROUTES.REGISTER);
  const onForgot = () => navigate(ROUTES.FORGOT_PASSWORD);

  return (
    <div className='row m-0 p-0' style={{ minHeight: '100vh' }}>
      <Row className='m-0 p-0'>
        <Col
          sm={0}
          lg={3}
          className={cn(
            styles.leftContainer,
            'd-none d-md-flex flex-column h-100 align-items-center bg-gray'
          )}
          style={{
            background:
              theme === THEME_OPTIONS.DARK
                ? Colors.default.black4
                : Colors.default.white2
          }}
        >
          <Typography.Title level={3}>ProXcure</Typography.Title>
          <div className='pt-3'>
            <Typography.Text className='f-primary-medium'>
              Think less, Procure more
            </Typography.Text>
          </div>
          <div className={styles.imageContainer}>
            <Image src={Images.loginImage} preview={false} />
          </div>
          <div className='pt-3 w-50 text-center'>
            <Typography.Text className='f-primary-light'>
              We make it easier for you. <br />
              Get started with simplicity
            </Typography.Text>
          </div>
        </Col>
        <Col
          sm={12}
          lg={9}
          className='d-flex align-items-md-center justify-content-center flex-column'
          style={{
            background:
              theme === THEME_OPTIONS.DARK
                ? Colors.default.black1
                : Colors.default.white1
          }}
        >
          <Col sm={12} md={6}>
            <Typography.Title level={3} className='d-md-none'>
              ProXcure
            </Typography.Title>
            <div className='text-left w-100'>
              <Typography.Title level={2}>Sign in</Typography.Title>
              <Typography.Text className='f-primary-light'>
                or{' '}
                <Typography.Link type='secondary' onClick={onRegister}>
                  create an account
                </Typography.Link>
              </Typography.Text>
            </div>
            <div className='mt-5'>
              <LoginForm />
            </div>
            <Typography.Link onClick={onForgot}>
              Forgot Password?
            </Typography.Link>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
