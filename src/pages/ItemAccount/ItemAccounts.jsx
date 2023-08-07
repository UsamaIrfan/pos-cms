import { DeleteOutlined } from '@ant-design/icons';
import {
  useItemAccountsQuery,
  useRemoveItemAccountMutation,
} from '@services/itemAccount';
import { getAuthCredentials } from '@utils/auth';
import { ACCOUNT_TYPES } from '@utils/enums';
import { Button, Drawer, Form, Row, Space, Table, Typography } from 'antd';
import React, { useMemo, useState } from 'react';

import { CreateEditItemAccountForm } from '@components/index';
import ItemAccountsFilters from '@components/itemAccount/ItemAccountsFilters';

const ItemAccounts = () => {
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBoq, setSelectedBoq] = useState();
  const { user } = getAuthCredentials();
  const accountTypeId = Form.useWatch('accountTypeId', form);
  const [removeAccount, { isLoading: removing }] =
    useRemoveItemAccountMutation();
  const { data, isLoading } = useItemAccountsQuery({
    companyId: user?.user?.company?.[0]?.id,
    accountTypeId,
  });
  const itemAccounts = data?.data?.docs ?? [];

  const onRemove = (item) => {
    removeAccount({ id: item?.id, companyId: user?.user?.company?.[0]?.id });
  };

  const onRowClick = (record) => {
    setIsDrawerOpen(true);
    setSelectedBoq(record);
  };

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedBoq(null);
  };

  const columns = useMemo(
    () => [
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
      {
        title: 'Actions',
        key: 'unit',
        render: (row) => (
          <>
            {![ACCOUNT_TYPES.CAPITAL]?.includes(row?.accountType?.type) &&
            !row?.cashAccount ? (
              <Space
                direction='horizontal'
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  shape='circle'
                  disabled={removing}
                  onClick={() => onRemove(row)}
                  icon={<DeleteOutlined />}
                  type='primary'
                />
              </Space>
            ) : null}
          </>
        ),
      },
    ],
    []
  );

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
