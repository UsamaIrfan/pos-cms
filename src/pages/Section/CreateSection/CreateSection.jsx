import { Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditOrderForm } from '@components/index';

const CreateBoqSection = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24}>
          <Typography.Title level={3} type='primary'>
            Create Orders
          </Typography.Title>
          <CreateEditOrderForm />
        </Col>

        {/* <Col
          xs={24}
          lg={8}
          style={{
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Card>
            <TenderTimeline selected={3} />
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

export default CreateBoqSection;
