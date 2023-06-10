import { Card, Col, Row, Timeline, Typography } from 'antd';
import React from 'react';

import { CreateTenderForm } from '@components/index';

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
          <CreateTenderForm />
        </Col>
        <Col xs={24} lg={6}>
          <Card>
            <Timeline pending='Continuing' reverse={true}>
              <Timeline.Item color='blue'>
                Enter basic tender information
              </Timeline.Item>
              <Timeline.Item color='gray'>
                Enter tender BOQs (Bill Of Quantity)
              </Timeline.Item>
              <Timeline.Item color='gray'>Add Sections to BOQs</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateTender;
