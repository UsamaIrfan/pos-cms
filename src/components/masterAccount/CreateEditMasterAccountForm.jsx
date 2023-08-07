import {
  useCreateMasterAccountMutation,
  useMasterAccountsQuery,
  useUpdateMasterAccountMutation,
} from '@services/masterAccount';
import { getAuthCredentials } from '@utils/auth';
import { accountTypeOptions } from '@utils/constants';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, Select } from 'antd';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createTenderFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type is required'),
});

const CreateEditMasterAccountForm = ({ initialValues, onComplete }) => {
  const [form] = Form.useForm();
  const [createAccount, { isLoading: loading }] =
    useCreateMasterAccountMutation();
  const [updateAccount, { isLoading: updating }] =
    useUpdateMasterAccountMutation();
  const { user } = getAuthCredentials();
  const location = useLocation();

  const { data } = useMasterAccountsQuery();

  const yupSync = {
    async validator({ field }, value) {
      createTenderFormSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const navigate = useNavigate();

  async function onSubmit({ name, type }) {
    let accountError;
    let accountData;
    if (initialValues?.id) {
      const { error, data } = await updateAccount({
        id: initialValues?.id,
        name,
        type,
        companyId: user?.user?.company?.[0]?.id,
      });
      accountError = error;
      accountData = data;
    } else {
      const { error, data } = await createAccount({
        name,
        type,
        companyId: user?.user?.company?.[0]?.id,
      });
      accountError = error;
      accountData = data;
    }
    if (!accountError) {
      navigate(
        location.pathname?.includes(ROUTES.TOUR.MASTER_ACCOUNTS) &&
          accountData?.data?.id
          ? ROUTES.TOUR.ITEM_ACCOUNTS
          : ROUTES.MASTER_ACCOUNTS.MANAGE,
        { state: { tenderId: accountData?.data?.id } }
      );
    }
    onComplete && onComplete();
  }

  useEffect(() => {
    if (initialValues?.name) form.setFieldValue('name', initialValues?.name);
    if (initialValues?.description)
      form.setFieldValue('description', initialValues?.description);
    if (initialValues?.type) form.setFieldValue('type', initialValues?.type);
  }, [initialValues]);

  const filteredAccountTypes = useMemo(() =>
    accountTypeOptions?.filter((type) =>
      data?.data?.docs?.every((doc) => doc?.type !== type?.value)
    )
  );

  return (
    <>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
        layout='vertical'
      >
        <Form.Item label='Master Account Name' name='name' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item label='Master Account Type' name='type' rules={[yupSync]}>
          <Select
            size='large'
            options={filteredAccountTypes}
            placeholder='Select Account Type'
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading || updating}
            disabled={loading || updating}
            type='primary'
            htmlType='submit'
            className='w-100 mt-3'
          >
            {initialValues?.id ? 'Update' : 'Continue'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateEditMasterAccountForm;
