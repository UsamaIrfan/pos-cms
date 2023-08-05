import { useItemAccountsQuery } from '@services/itemAccount';
import { getAuthCredentials } from '@utils/auth';
import { Drawer, Form, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';

import { CreateEditItemAccountForm } from '@components/index';
import ItemAccountsFilters from '@components/itemAccount/ItemAccountsFilters';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Account Type',
    key: 'itemType',
    dataIndex: 'itemType',
  },
  {
    title: 'Master Account',
    key: 'masterAccount',
    render: (row) => row?.accountType?.name,
  },
  {
    title: 'Price',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
];

const ItemAccounts = () => {
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBoq, setSelectedBoq] = useState();
  const { user } = getAuthCredentials();
  const accountTypeId = Form.useWatch('accountTypeId', form);
  const { data, isLoading } = useItemAccountsQuery({
    companyId: user?.user?.company?.[0]?.id,
    accountTypeId,
  });
  const itemAccounts = data?.data?.docs ?? [];

  const onRowClick = (record) => {
    setIsDrawerOpen(true);
    setSelectedBoq(record);
  };

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedBoq(null);
  };

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        onClose={onDrawerClose}
        size='large'
        title={selectedBoq?.name}
      >
        <CreateEditItemAccountForm initialValues={selectedBoq} />
      </Drawer>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Item Accounts Management
        </Typography.Title>
        <ItemAccountsFilters form={form} />
      </Row>
      <Table
        loading={isLoading}
        dataSource={itemAccounts}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record),
          };
        }}
      />
    </>
  );
};

export default ItemAccounts;
