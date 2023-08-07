import { useItemAccountsQuery } from '@services/itemAccount';
import { useCreateInvestmentMutation } from '@services/itemTransaction';
import { useMasterAccountsQuery } from '@services/masterAccount';
import { getAuthCredentials } from '@utils/auth';
import { ACCOUNT_TYPES } from '@utils/enums';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect } from 'react';
import * as yup from 'yup';

const createInvestmentFormSchema = yup.object().shape({
  amount: yup.number().required('Amount is required'),
  description: yup.string(),
  accountId: yup.number().required('Please select a capital account'),
});

const InvestmentForm = () => {
  const [form] = Form.useForm();
  const [createInvestment, { isLoading: loading }] =
    useCreateInvestmentMutation();

  const { user } = getAuthCredentials();

  const { data: masterAccountsData, isLoading: masterAccountsLoading } =
    useMasterAccountsQuery();

  const { data, isLoading: accountsLoading } = useItemAccountsQuery(
    {
      companyId: user?.user?.company?.[0]?.id,
      accountTypeId: masterAccountsData?.data?.docs?.find(
        (doc) => doc?.type === ACCOUNT_TYPES.CAPITAL
      )?.id,
    },
    { skip: masterAccountsLoading || !masterAccountsData }
  );

  const masterAccountOptions = data?.data?.docs
    ? data?.data?.docs?.map((doc) => ({ label: doc?.title, value: doc?.id }))
    : [];

  const yupSync = {
    async validator({ field }, value) {
      createInvestmentFormSchema.validateSyncAt(field, { [field]: value });
    },
  };

  useEffect(() => {
    if (data?.data && data?.data?.docs?.length < 1) {
      message.error(
        'You have not created any capital accounts yet. PLease create atleast one account to invest into the business',
        3
      );
    }
  }, [data]);

  async function onSubmit({ amount, accountId }) {
    const { error } = await createInvestment({
      amount,
      itemId: accountId,
      companyId: user?.user?.company?.[0]?.id,
    });
    if (!error) {
      form.resetFields();
      message.success('Cash invested into the business');
    }
  }

  return (
    <>
      <Form
        form={form}
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
        layout='vertical'
        disabled={accountsLoading}
      >
        <Form.Item label='Amount' name='amount' rules={[yupSync]}>
          <Input size='large' type='number' />
        </Form.Item>

        <Form.Item label='Description' name='description' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Select Master Account'
          name='accountId'
          rules={[yupSync]}
        >
          <Select
            size='large'
            options={masterAccountOptions}
            placeholder='Select Master Account'
            loading={accountsLoading}
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            disabled={loading}
            type='primary'
            htmlType='submit'
            className='w-100 mt-3'
          >
            Add Investment
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InvestmentForm;
