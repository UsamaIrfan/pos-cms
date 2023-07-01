import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditTenderForm, TenderTimeline } from '@components/index';

const CreateTender = () => {
  return (
    <>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Create Tender
        </Typography.Title>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <CreateEditTenderForm />
        </Col>
        <Col xs={24} lg={6}>
          <Card>
            <TenderTimeline selected={1} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateTender;
