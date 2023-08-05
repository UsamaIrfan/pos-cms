import { Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditItemAccountForm } from '@components/index';

const CreateItemAccount = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Typography.Title level={3} type='primary'>
            Create Item Account
          </Typography.Title>
          <CreateEditItemAccountForm />
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
            <TenderTimeline selected={2} />
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

export default CreateItemAccount;
