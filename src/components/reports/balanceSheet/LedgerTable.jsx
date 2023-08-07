import { useItemAccountQuery } from '@services/itemAccount';
import { useItemTransactionsQuery } from '@services/itemTransaction';
import { Divider, Table, Typography } from 'antd';
import moment from 'moment-timezone';
import React from 'react';

const { Summary } = Table;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Date',
    render: (row) => moment(row?.createdAt).format('ll'),
    key: 'createdAt',
  },
  {
    title: 'Amount',
    render: (row) => (+row?.amount)?.toLocaleString(),
    key: 'amount',
  },
];

const Footer = ({ data }) => (
  <Summary.Row>
    <Summary.Cell className='bg-yellow' index={0}>
      BALANCE
    </Summary.Cell>
    {Array(columns?.length - 2)
      .fill(0)
      ?.map((_, idx) => (
        <Summary.Cell key={idx} className='bg-yellow' index={1}></Summary.Cell>
      ))}
    <Summary.Cell className='bg-yellow' index={2}>
      {(+data?.price)?.toLocaleString()}
    </Summary.Cell>
  </Summary.Row>
);

const LedgerTable = ({ selectedItem }) => {
  const { data: accountData } = useItemAccountQuery(
    {
      id: selectedItem?.id,
    },
    {
      skip: !selectedItem?.id,
    }
  );

  const { data, isLoading } = useItemTransactionsQuery(
    {
      itemId: selectedItem?.id,
    },
    { skip: !selectedItem?.id }
  );
  return (
    <div>
      <Typography.Title level={3}>
        {selectedItem?.title} Ledger
      </Typography.Title>
      <Divider />
      <Table
        loading={isLoading}
        dataSource={data?.data?.docs ?? []}
        rowClassName={(row) =>
          row?.positive ? 'bg-light-green' : 'bg-light-red'
        }
        columns={columns}
        summary={() => <Footer data={accountData?.data} />}
      />
    </div>
  );
};

export default LedgerTable;
