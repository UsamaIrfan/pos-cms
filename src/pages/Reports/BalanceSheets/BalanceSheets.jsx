import { useItemAccountsQuery } from '@services/itemAccount';
import { getAuthCredentials } from '@utils/auth';
import { ACCOUNT_TYPES } from '@utils/enums';
import { Col, Divider, Drawer, Form, Row, Spin, Table, Typography } from 'antd';
import React, { useMemo, useState } from 'react';

import { LedgerTable } from '@components/index';
import BalanceSheetFilters from '@components/reports/balanceSheet/BalanceSheetFilters';

const { Summary } = Table;

const columns = [
  {
    title: 'Account name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Value',
    render: (row) => (+row?.value)?.toLocaleString(),
    key: 'name',
  },
];

const calcPrice = (account) =>
  account?.price && +account?.quantity
    ? +account?.price * +account?.quantity
    : account?.price;

const Footer = ({ data }) => (
  <Summary.Row>
    <Summary.Cell className='bg-yellow' index={0}>
      TOTAL
    </Summary.Cell>
    <Summary.Cell className='bg-yellow' index={1}>
      {data?.reduce((acc, curr) => acc + curr?.value, 0)?.toLocaleString()}
    </Summary.Cell>
  </Summary.Row>
);

const BalanceSheets = () => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [form] = Form.useForm();
  const { user } = getAuthCredentials();
  const selectedYear = Form.useWatch('year', form);
  const { data, isLoading } = useItemAccountsQuery({
    companyId: user?.user?.company?.[0]?.id,
    year: selectedYear,
  });

  const [assets, liabilities] = useMemo(() => {
    const alc = [
      [ACCOUNT_TYPES.ASSET],
      [ACCOUNT_TYPES.LIABILITY, ACCOUNT_TYPES.CAPITAL],
    ]?.map((type) =>
      data?.data?.docs
        ? data?.data?.docs
            ?.filter((doc) => type?.includes(doc?.accountType?.type))
            ?.map((doc) => ({
              id: doc?.id,
              title: doc?.title,
              value: calcPrice(doc),
            }))
        : []
    );

    if (data?.data?.docs) {
      alc[0]?.push({
        title: 'Inventory',
        value: data?.data?.docs
          ?.filter((doc) => doc?.accountType?.type === ACCOUNT_TYPES.INVENTORY)
          ?.reduce((acc, curr) => calcPrice(curr) + acc, 0),
      });

      alc[0].reduce((acc, curr) => curr?.value + acc, 0);
      alc[1].reduce((acc, curr) => curr?.value + acc, 0);
    }

    return alc;
  }, [data]);

  const onEdit = (item) => {
    if (item.id) {
      setSelectedItem(item);
      setIsEditDrawerOpen(true);
    }
  };

  const onEditClose = () => {
    setSelectedItem(null);
    setIsEditDrawerOpen(false);
  };

  return (
    <>
      <Drawer
        size='large'
        title='Ledger'
        open={isEditDrawerOpen}
        onClose={onEditClose}
      >
        <LedgerTable selectedItem={selectedItem} />
      </Drawer>
      <Row justify='space-between' className='mb-3'>
        <Typography.Title level={3} type='primary'>
          Balance Sheet Reports
        </Typography.Title>
        <BalanceSheetFilters form={form} />
      </Row>
      <Spin spinning={isLoading}>
        <Row gutter={16}>
          <Col lg={12} className='mb-5'>
            <Typography.Title level={4}>Assets</Typography.Title>
            <Divider />
            <Table
              pagination={false}
              rowClassName={(row) =>
                row?.id === selectedItem?.id && selectedItem?.id
                  ? 'bg-light-blue'
                  : ''
              }
              dataSource={assets}
              columns={columns}
              summary={() => <Footer data={assets} />}
              onRow={(record) => {
                return {
                  onClick: () => onEdit(record),
                };
              }}
            />
          </Col>
          <Col lg={12} className='mb-5'>
            <Typography.Title level={4}>Liabilities & Capital</Typography.Title>
            <Divider />
            <Table
              pagination={false}
              rowClassName={(row) =>
                row?.id === selectedItem?.id && selectedItem?.id
                  ? 'bg-light-blue'
                  : ''
              }
              dataSource={liabilities}
              columns={columns}
              summary={() => <Footer data={liabilities} />}
              onRow={(record) => {
                return {
                  onClick: () => onEdit(record),
                };
              }}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default BalanceSheets;
