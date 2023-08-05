import { Col, Row, Typography } from 'antd';
import React from 'react';

import { CreateEditMasterAccountForm } from '@components/index';

const CreateMasterAccount = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Typography.Title level={3} type='primary'>
            Create Master Account
          </Typography.Title>
          <CreateEditMasterAccountForm />
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
            <TenderTimeline selected={1} />
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

export default CreateMasterAccount;
