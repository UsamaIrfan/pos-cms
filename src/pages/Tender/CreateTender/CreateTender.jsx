import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditTenderForm, TenderTimeline } from '@components/index';

const CreateTender = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Typography.Title level={3} type='primary'>
            Create Tender
          </Typography.Title>
          <CreateEditTenderForm />
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
            <TenderTimeline selected={1} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateTender;
