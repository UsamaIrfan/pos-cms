import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditBoqForm, TenderTimeline } from '@components/index';

const CreateBoq = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Typography.Title level={3} type='primary'>
            Create BOQ
          </Typography.Title>
          <CreateEditBoqForm />
        </Col>
        <Col
          xs={24}
          lg={8}
          style={{
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Card>
            <TenderTimeline selected={2} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateBoq;
