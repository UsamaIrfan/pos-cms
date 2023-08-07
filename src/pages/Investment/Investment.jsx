import { Col, Row, Typography } from 'antd';
import React from 'react';

import InvestmentForm from '@components/investment/InvestmentForm';

const CreateInvestment = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Typography.Title level={3} type='primary'>
            Invest into the business
          </Typography.Title>
          <InvestmentForm />
        </Col>
      </Row>
    </>
  );
};

export default CreateInvestment;
