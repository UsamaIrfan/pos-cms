import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import {
  useRemoveSectionItemMutation,
  useSectionItemsQuery
} from '@services/sectionItems';
import { ROUTES } from '@utils/routes';
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
import { useNavigate } from 'react-router-dom';

import { CreateEditSectionItemForm } from '@components/index';

const SectionItems = () => {
  const navigate = useNavigate();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const { data, isLoading: loading } = useSectionItemsQuery();
  const [removeSectionItem, { isLoading: removing }] =
    useRemoveSectionItemMutation();
  const items = data?.data ?? [];

  const onCreate = () => navigate(ROUTES.SECTION_ITEMS.CREATE);

  const onRemove = (item) => {
    removeSectionItem({ id: item?.id });
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setIsEditDrawerOpen(true);
  };

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
          <Space direction='horizontal' onClick={(e) => e.stopPropagation()}>
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
          sectionId={selectedItem?.sectionId}
        />
      </Drawer>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          BOQ Sections Management
        </Typography.Title>
        <Button type='primary' icon={<PlusCircleOutlined />} onClick={onCreate}>
          Create
        </Button>
      </Row>
      <Table
        loading={loading}
        onRow={(record) => {
          return {
            onClick: () => onEdit(record)
          };
        }}
        dataSource={items}
        columns={columns}
      />
    </>
  );
};

export default SectionItems;
