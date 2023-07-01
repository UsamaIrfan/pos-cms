import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditBoqForm, TenderTimeline } from '@components/index';

const CreateBoq = () => {
  return (
    <>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Create BOQ
        </Typography.Title>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <CreateEditBoqForm />
        </Col>
        <Col xs={24} lg={6}>
          <Card>
            <TenderTimeline selected={2} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateBoq;
