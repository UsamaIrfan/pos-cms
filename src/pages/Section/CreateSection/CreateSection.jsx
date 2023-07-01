import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditSectionForm, TenderTimeline } from '@components/index';

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
            <TenderTimeline selected={3} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateBoqSection;
