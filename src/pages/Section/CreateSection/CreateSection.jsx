import { Card, Col, Row, Timeline, Typography } from 'antd';
import React from 'react';

import { CreateEditSectionForm } from '@components/index';

const CreateBoqSection = () => {
  return (
    <>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Create BOQ Section
        </Typography.Title>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <CreateEditSectionForm />
        </Col>

        <Col xs={24} lg={6}>
          <Card>
            <Timeline>
              <Timeline.Item color='blue'>
                Enter basic tender information
              </Timeline.Item>
              <Timeline.Item color='blue'>
                Enter tender BOQs (Bill Of Quantity)
              </Timeline.Item>
              <Timeline.Item color='green'>Add Sections to BOQs</Timeline.Item>
              <Timeline.Item color='gray'>Add Sections items</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateBoqSection;
