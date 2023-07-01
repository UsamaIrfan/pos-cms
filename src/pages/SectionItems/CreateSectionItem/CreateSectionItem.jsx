import { ROUTES } from '@utils/routes';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateEditSectionItemForm, TenderTimeline } from '@components/index';

const CreateSectionItem = () => {
  const navigate = useNavigate();

  const onComplete = () => navigate(ROUTES.SECTION_ITEMS.MANAGE);

  return (
    <>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Create Section Item
        </Typography.Title>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <CreateEditSectionItemForm onComplete={onComplete} />
        </Col>

        <Col xs={24} lg={6}>
          <Card>
            <TenderTimeline selected={4} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateSectionItem;
