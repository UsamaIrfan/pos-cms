import { getAuthCredentials, isAuthenticated } from '@utils/auth';
import Images from '@utils/images';
import { ROUTES } from '@utils/routes';
import { Image, Typography } from 'antd';
import cn from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import styles from './VerifyForgotPassword.module.css';

import ForgotPasswordTokenForm from '@components/auth/ForgotPasswordTokenForm';
// import Logo from '@components/ui/logo';

export default function VerifyForgotPassword() {
  const navigate = useNavigate();
  const { token, permissions } = getAuthCredentials();
  useEffect(() => {
    if (isAuthenticated({ token, permissions })) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [token, permissions]);

  return (
    <div className='row  m-0 p-0' style={{ height: '100vh' }}>
      <Row className='m-0 p-0'>
        <Col
          sm={0}
          lg={3}
          className={cn(
            styles.leftContainer,
            'd-none d-md-flex flex-column h-100 align-items-center bg-gray'
          )}
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
          <div className='pt-3 text-bg-light w-50 text-center'>
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
        >
          <Col sm={12} md={6}>
            <Typography.Title level={3} className='d-md-none'>
              ProXcure
            </Typography.Title>
            <div className='text-left w-100'>
              <Typography.Title level={2}>OTP Verification</Typography.Title>
              <Typography.Text className='f-primary-light'>
                Please enter the code sent to your email below
              </Typography.Text>
            </div>
            <div className='mt-5'>
              <ForgotPasswordTokenForm />
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
