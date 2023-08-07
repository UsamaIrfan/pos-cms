import { PlusCircleOutlined } from '@ant-design/icons';
import { ROUTES } from '@utils/routes';
import { Button, Form, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PurchaseInventoryFilters = ({ form }) => {
  const navigate = useNavigate();

  const onCreate = () => navigate(ROUTES.PURCHASE.CREATE);

  return (
    <>
      <Form form={form} layout='vertical'>
        <Space direction='horizontal'>
          <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            onClick={onCreate}
          >
            Create
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default PurchaseInventoryFilters;
