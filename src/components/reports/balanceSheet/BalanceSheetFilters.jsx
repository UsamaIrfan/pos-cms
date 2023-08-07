import { Form, Select, Space } from 'antd';
import moment from 'moment-timezone';
import React, { useMemo } from 'react';

const BalanceSheetFilters = ({ form }) => {
  const yearOptions = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, idx) => ({
          label: moment().subtract(idx, 'year').format('YYYY'),
          value: moment().subtract(idx, 'year').year(),
        })),
    []
  );
  return (
    <>
      <Form form={form} layout='vertical'>
        <Space direction='horizontal'>
          <Form.Item name='year' noStyle>
            <Select
              style={{ minWidth: '150px' }}
              placeholder='Select Year'
              options={yearOptions ?? []}
            />
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default BalanceSheetFilters;
