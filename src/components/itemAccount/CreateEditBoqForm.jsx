import { useCreateItemAccountMutation } from '@services/itemAccount';
import { useMasterAccountsQuery } from '@services/masterAccount';
import { getAuthCredentials } from '@utils/auth';
import { itemTypeOptions } from '@utils/constants';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createItemAccountFormSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  itemType: yup.string().required('Please select an item type'),
  quantity: yup.string().required('Quantity is required'),
  price: yup.string().required('Price is required'),
  accountTypeId: yup.number().required('Please select an account type'),
});

const CreateEditItemAccountForm = ({ initialValues }) => {
  const [form] = Form.useForm();
  const [createItemAccount, { isLoading: loading }] =
    useCreateItemAccountMutation();
  const { user } = getAuthCredentials();
  const location = useLocation();
  const { data, isLoading: masterAccountsLoading } = useMasterAccountsQuery({
    companyId: user?.user?.company?.[0]?.id,
  });
  const masterAccountOptions = data?.data?.docs
    ? data?.data?.docs?.map((doc) => ({ label: doc?.name, value: doc?.id }))
    : [];

  const yupSync = {
    async validator({ field }, value) {
      createItemAccountFormSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldValue('title', initialValues?.title);
    form.setFieldValue('description', initialValues?.description);
    form.setFieldValue('price', initialValues?.price);
    form.setFieldValue('quantity', initialValues?.quantity);
    form.setFieldValue('itemType', initialValues?.itemType);
    form.setFieldValue(
      'accountTypeId',
      initialValues?.accountTypeId || location.state?.accountTypeId
    );
  }, [initialValues, location.state]);

  async function onSubmit({
    title,
    description,
    itemType,
    accountTypeId,
    price,
    quantity,
  }) {
    const { error } = await createItemAccount({
      title,
      description,
      itemType,
      accountTypeId,
      price,
      quantity,
      companyId: user?.user?.company?.[0]?.id,
    });
    if (!error) {
      navigate(ROUTES.ITEM_ACCOUNTS.MANAGE);
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
        disabled={masterAccountsLoading}
      >
        <Form.Item label='Item Name' name='title' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Item Description'
          name='description'
          rules={[yupSync]}
        >
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item label='Quantity' name='quantity' rules={[yupSync]}>
          <Input size='large' type='number' />
        </Form.Item>

        <Form.Item label='Price' name='price' rules={[yupSync]}>
          <Input size='large' type='number' />
        </Form.Item>

        <Form.Item label='Item Type' name='itemType' rules={[yupSync]}>
          <Select
            size='large'
            options={itemTypeOptions}
            placeholder='Select Item Type'
          />
        </Form.Item>

        <Form.Item
          label='Select Master Account'
          name='accountTypeId'
          rules={[yupSync]}
        >
          <Select
            size='large'
            options={masterAccountOptions}
            placeholder='Select Master Account'
            loading={masterAccountsLoading}
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateEditItemAccountForm;
