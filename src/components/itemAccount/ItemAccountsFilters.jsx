import { PlusCircleOutlined } from '@ant-design/icons';
import { useMasterAccountsQuery } from '@services/masterAccount';
import { ROUTES } from '@utils/routes';
import { Button, Form, Select, Space } from 'antd';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ItemAccountsFilters = ({ form }) => {
  const navigate = useNavigate();
  const { data, isLoading: loading } = useMasterAccountsQuery();

  const onCreate = () => navigate(ROUTES.ITEM_ACCOUNTS.CREATE);

  const masterAccountOptions = useMemo(
    () => data?.data?.docs?.map((d) => ({ label: d?.name, value: d?.id })),
    [data]
  );
  return (
    <>
      <Form form={form} layout='vertical'>
        <Space direction='horizontal'>
          <Form.Item name='accountTypeId' noStyle>
            <Select
              style={{ minWidth: '150px' }}
              placeholder='Account type'
              loading={loading}
              options={masterAccountOptions ?? []}
              allowClear
            />
          </Form.Item>

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

export default ItemAccountsFilters;
