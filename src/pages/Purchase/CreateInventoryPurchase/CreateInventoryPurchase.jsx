import { Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditPurchaseForm } from '@components/index';

const CreateInventoryPurchase = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Typography.Title level={3} type='primary'>
            Create Inventory Purchase
          </Typography.Title>
          <CreateEditPurchaseForm />
        </Col>
      </Row>
    </>
  );
};

export default CreateInventoryPurchase;
