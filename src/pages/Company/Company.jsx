import { useCompanyQuery } from '@services/company';
import { getAuthCredentials } from '@utils/auth';
import { Col, Row, Spin, Typography } from 'antd';
import React from 'react';

import CreateCompanyForm from '@components/company/CreateCompanyForm';

const Company = () => {
  const { user } = getAuthCredentials();
  const { data, isLoading } = useCompanyQuery(user?.user?.company?.[0]?.id);

  const company = data?.data;
  return (
    <>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Company Settings
        </Typography.Title>
      </Row>

      <Col xs={24} lg={12}>
        <Spin spinning={isLoading}>
          <CreateCompanyForm
            initialValues={
              company
                ? {
                    ...company,
                    otherDetails: JSON.parse(company?.otherDetails)
                  }
                : {}
            }
          />
        </Spin>
      </Col>
    </>
  );
};

export default Company;
