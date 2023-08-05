import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useOrderItemsQuery,
  useRemoveOrderItemMutation,
} from '@services/orderItems';
import { Button, Drawer, Row, Space, Table, Typography } from 'antd';
import React, { useMemo, useState } from 'react';

import CreateEditOrderForm from '../CreateOrderForm';

const OrderItemsTable = ({ orderId }) => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const { data, isLoading: loading } = useOrderItemsQuery({ orderId });
  const [removeSectionItem, { isLoading: removing }] =
    useRemoveOrderItemMutation();
  const items = data?.data?.docs ?? [];

  const onRemove = (item) => {
    removeSectionItem({ id: item?.id });
  };

  const onAdd = () => setIsEditDrawerOpen(true);

  const onEditClose = () => {
    setSelectedItem(null);
    setIsEditDrawerOpen(false);
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
        title: 'Price',
        key: 'salePrice',
        dataIndex: 'salePrice',
      },
      {
        title: 'Quantity',
        key: 'saleQuantity',
        dataIndex: 'saleQuantity',
      },
      {
        title: 'Actions',
        key: 'unit',
        render: (row) => (
          <Space direction='horizontal'>
            <Button
              shape='circle'
              disabled={removing}
              onClick={() => onRemove(row)}
              icon={<DeleteOutlined />}
              type='primary'
            />
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Drawer size='large' open={isEditDrawerOpen} onClose={onEditClose}>
        <CreateEditOrderForm
          initialValues={selectedItem}
          onComplete={onEditClose}
          sectionId={orderId}
        />
      </Drawer>
      <>
        <Row justify='space-between'>
          <Typography.Title level={5}>Order Items</Typography.Title>
          <Button icon={<PlusOutlined />} onClick={onAdd}>
            Add Item
          </Button>
        </Row>
        <Table
          loading={loading}
          dataSource={items}
          columns={columns}
          caption='Products listed in this BOQ'
        />
      </>
    </>
  );
};

export default OrderItemsTable;
