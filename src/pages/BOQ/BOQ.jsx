import { PlusCircleOutlined } from '@ant-design/icons';
import { useBoqsQuery } from '@services/boq';
import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Drawer, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateEditBoqForm } from '@components/index';

const columns = [
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
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Tender ID',
    key: 'tenderId',
    render: (row) => row?.tender?.id
  },
  {
    title: 'Tender',
    key: 'tender',
    render: (row) => row?.tender?.name
  },
  {
    title: 'No. Of Sections',
    key: 'items',
    render: (row) => row?.sections?.length
  }
];

const BOQ = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBoq, setSelectedBoq] = useState();
  const { user } = getAuthCredentials();
  const { data, isLoading } = useBoqsQuery({
    companyId: user?.user?.company?.[0]?.id
  });
  const boqs = data?.data ?? [];

  const onCreate = () => navigate(ROUTES.BOQ.CREATE);

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
        <CreateEditBoqForm initialValues={selectedBoq} />
      </Drawer>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          BOQ Management
        </Typography.Title>
        <Button type='primary' icon={<PlusCircleOutlined />} onClick={onCreate}>
          Create
        </Button>
      </Row>
      <Table
        loading={isLoading}
        dataSource={boqs}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => onRowClick(record)
          };
        }}
      />
    </>
  );
};

export default BOQ;
