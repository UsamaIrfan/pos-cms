import { Card, Col, Row, Timeline, Typography } from 'antd';
import React from 'react';

import { CreateEditSectionItemForm } from '@components/index';

const CreateSectionItem = () => {
  return (
    <>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Create Section Item
        </Typography.Title>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <CreateEditSectionItemForm />
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
              <Timeline.Item color='blue'>Add Sections to BOQs</Timeline.Item>
              <Timeline.Item color='green'>Add Sections items</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateSectionItem;
