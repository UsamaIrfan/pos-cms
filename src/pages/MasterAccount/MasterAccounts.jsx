import { PlusCircleOutlined } from '@ant-design/icons';
import { useMasterAccountsQuery } from '@services/masterAccount';
import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Drawer, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateEditMasterAccountForm } from '@components/index';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
];

const Tender = () => {
  const navigate = useNavigate();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const { user } = getAuthCredentials();
  const { data, isLoading } = useMasterAccountsQuery({
    companyId: user?.user?.company?.[0]?.id,
  });
  const masterAccounts = data?.data?.docs ?? [];

  const onCreate = () => navigate(ROUTES.MASTER_ACCOUNTS.CREATE);

  const onEdit = (item) => {
    setSelectedItem(item);
    setIsEditDrawerOpen(true);
  };

  const onEditClose = () => {
    setSelectedItem(null);
    setIsEditDrawerOpen(false);
  };

  return (
    <>
      <Drawer size='large' open={isEditDrawerOpen} onClose={onEditClose}>
        <CreateEditMasterAccountForm
          initialValues={selectedItem}
          onComplete={onEditClose}
        />
      </Drawer>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Master Accounts Management
        </Typography.Title>
        <Button type='primary' icon={<PlusCircleOutlined />} onClick={onCreate}>
          Create
        </Button>
      </Row>
      <Table
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: () => onEdit(record),
          };
        }}
        dataSource={masterAccounts}
        columns={columns}
      />
    </>
  );
};

export default Tender;
