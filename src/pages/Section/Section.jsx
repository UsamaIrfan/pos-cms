import { PlusCircleOutlined } from '@ant-design/icons';
import { useSectionsQuery } from '@services/sections';
import { ROUTES } from '@utils/routes';
import { Button, Drawer, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateEditSectionForm, SectionItemsTable } from '@components/index';

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
    title: 'BOQ ID',
    key: 'boqId',
    render: (row) => row?.boqId
  },
  {
    title: 'BOQ',
    key: 'boq',
    render: (row) => row?.boq?.name
  },
  {
    title: 'No. Of Sections Items',
    key: 'items',
    render: (row) => row?.sectionItems?.length
  }
];

const Section = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState();
  const { data, isLoading } = useSectionsQuery();
  const sections = data?.data ?? [];

  const onCreate = () => navigate(ROUTES.SECTION.CREATE);

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
        <CreateEditSectionForm
          onComplete={onDrawerClose}
          initialValues={selectedSection}
        />
        <SectionItemsTable sectionId={selectedSection?.id} />
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
        loading={isLoading}
        dataSource={sections}
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

export default Section;
