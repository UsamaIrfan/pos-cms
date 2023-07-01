import { getAuthCredentials } from '@utils/auth';
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

import styles from './CreateCompany.module.css';

// import Logo from '@components/ui/logo';
import CreateCompanyForm from '@components/company/CreateCompanyForm';

export default function CreateCompany() {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.app.theme);
  const { token, user } = getAuthCredentials();

  const hasCompany = user?.user?.company?.length > 0;

  useEffect(() => {
    if (hasCompany && token) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [token, hasCompany]);

  return (
    <div className='row m-0 p-0 h-100'>
      <Row className='m-0 p-0'>
        <Col
          sm={0}
          lg={3}
          className={cn(
            'd-none d-md-flex flex-column h-100 align-items-center justify-content-center bg-gray'
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
              <Typography.Title level={2}>
                Register Your Company
              </Typography.Title>
            </div>
            <div className='mt-5'>
              <CreateCompanyForm />
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
