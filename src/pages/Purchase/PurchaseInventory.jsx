import { useItemAccountsQuery } from '@services/itemAccount';
import { useMasterAccountsQuery } from '@services/masterAccount';
import { getAuthCredentials } from '@utils/auth';
import { ACCOUNT_TYPES } from '@utils/enums';
import { Drawer, Form, Row, Table, Typography } from 'antd';
import React, { useMemo, useState } from 'react';

import {
  CreateEditPurchaseForm,
  PurchaseInventoryFilters,
} from '@components/index';

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

const PurchaseInventory = () => {
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBoq, setSelectedBoq] = useState();
  const { user } = getAuthCredentials();
  const { data: masterAccounts, isLoading: loading } = useMasterAccountsQuery();
  const inventoryAccountId = useMemo(() => {
    if (masterAccounts?.data?.docs) {
      return masterAccounts?.data?.docs?.find(
        (doc) => doc?.type === ACCOUNT_TYPES.INVENTORY
      )?.id;
    }
  }, [masterAccounts]);
  const { data, isLoading } = useItemAccountsQuery(
    {
      companyId: user?.user?.company?.[0]?.id,
      accountTypeId: inventoryAccountId,
    },
    {
      skip: !inventoryAccountId,
    }
  );
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
        <CreateEditPurchaseForm initialValues={selectedBoq} />
      </Drawer>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Inventory Purchase Management
        </Typography.Title>
        <PurchaseInventoryFilters form={form} />
      </Row>
      <Table
        loading={isLoading || loading}
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

export default PurchaseInventory;
