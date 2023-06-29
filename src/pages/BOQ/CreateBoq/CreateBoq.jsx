import { Card, Col, Row, Timeline, Typography } from 'antd';
import React from 'react';

import { CreateEditBoqForm } from '@components/index';

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
            <Timeline>
              <Timeline.Item color='blue'>
                Enter basic tender information
              </Timeline.Item>
              <Timeline.Item color='green'>
                Enter tender BOQs (Bill Of Quantity)
              </Timeline.Item>
              <Timeline.Item color='gray'>Add Sections to BOQs</Timeline.Item>
              <Timeline.Item color='gray'>Add Sections items</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateBoq;
