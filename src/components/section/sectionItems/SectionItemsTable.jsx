import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useRemoveSectionItemMutation,
  useSectionItemsQuery
} from '@services/sectionItems';
import {
  Button,
  Drawer,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography
} from 'antd';
import React, { useMemo, useState } from 'react';

import CreateEditSectionItemForm from './CreateEditSectionItemForm';

const SectionItemsTable = ({ sectionId }) => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const { data, isLoading: loading } = useSectionItemsQuery({ sectionId });
  const [removeSectionItem, { isLoading: removing }] =
    useRemoveSectionItemMutation();
  const items = data?.data ?? [];

  const onRemove = (item) => {
    removeSectionItem({ id: item?.id });
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setIsEditDrawerOpen(true);
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
        key: 'id'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'BOQ Section ID',
        key: 'sectionId',
        dataIndex: 'sectionId'
      },
      {
        title: 'BOQ Section',
        key: 'section',
        render: (row) => row?.section?.name
      },
      {
        title: 'Price',
        key: 'price',
        dataIndex: 'price'
      },
      {
        title: 'Quantity',
        key: 'quantity',
        dataIndex: 'quantity'
      },
      {
        title: 'Unit',
        key: 'unit',
        dataIndex: 'unit'
      },
      {
        title: 'Actions',
        key: 'unit',
        render: (row) => (
          <Space direction='horizontal'>
            <Button
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => onEdit(row)}
              type='primary'
            />
            <Popconfirm
              title='Are you sure you want to remove this section item?'
              onConfirm={() => onRemove(row)}
              placement='topLeft'
            >
              <Button
                shape='circle'
                disabled={removing}
                icon={<DeleteOutlined />}
                type='primary'
              />
            </Popconfirm>
          </Space>
        )
      }
    ],
    []
  );

  return (
    <>
      <Drawer size='large' open={isEditDrawerOpen} onClose={onEditClose}>
        <CreateEditSectionItemForm
          initialValues={selectedItem}
          onComplete={onEditClose}
          sectionId={sectionId}
        />
      </Drawer>
      <>
        <Row justify='space-between'>
          <Typography.Title level={5}>Section Items</Typography.Title>
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

export default SectionItemsTable;
