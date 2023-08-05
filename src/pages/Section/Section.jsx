import { PlusCircleOutlined } from '@ant-design/icons';
import { useOrdersQuery } from '@services/order';
import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Drawer, Row, Table, Typography } from 'antd';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OrderItemsTable } from '@components/index';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Subtotal',
    dataIndex: 'subtotal',
    key: 'subtotal',
  },
  {
    title: 'Order Date',
    key: 'createdAt',
    render: (row) => moment(row?.createdAt).format('ll'),
  },
  {
    title: 'No. Of Order Items',
    key: 'orderItems',
    render: (row) => row?.orderItems?.length,
  },
  {
    title: 'Sales Agent',
    render: (row) => row?.createdBy?.email,
  },
];

const Section = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState();
  const { user } = getAuthCredentials();
  const { data, isLoading } = useOrdersQuery({
    companyId: user?.user?.company?.[0]?.id,
  });
  const sections = data?.data?.docs ?? [];

  const onCreate = () => navigate(ROUTES.SALES.CREATE);

  const onRowClick = (record) => {
    setIsDrawerOpen(true);
    setSelectedSection(record);
  };

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedSection(null);
  };

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        onClose={onDrawerClose}
        size='large'
        title={selectedSection?.name}
      >
        <OrderItemsTable orderId={selectedSection?.id} />
      </Drawer>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Orders Management
        </Typography.Title>
        <Button type='primary' icon={<PlusCircleOutlined />} onClick={onCreate}>
          Create
        </Button>
      </Row>
      <Table
        loading={isLoading}
        dataSource={sections}
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

export default Section;
