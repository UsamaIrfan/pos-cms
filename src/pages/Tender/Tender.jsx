import { PlusCircleOutlined } from '@ant-design/icons';
import { useTendersQuery } from '@services/tender';
import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Row, Table, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    title: 'No. Of Items',
    key: 'items',
    render: (row) => row?.boqs?.length
  }
];

const Tender = () => {
  const navigate = useNavigate();
  const { user } = getAuthCredentials();
  const { data, isLoading } = useTendersQuery({
    companyId: user?.user?.company?.[0]?.id
  });
  const tenders = data?.data?.docs ?? [];

  const onCreate = () => navigate(ROUTES.TENDER.CREATE);

  return (
    <>
      <Row justify='space-between'>
        <Typography.Title level={3} type='primary'>
          Tender Management
        </Typography.Title>
        <Button type='primary' icon={<PlusCircleOutlined />} onClick={onCreate}>
          Create
        </Button>
      </Row>
      <Table loading={isLoading} dataSource={tenders} columns={columns} />
    </>
  );
};

export default Tender;
