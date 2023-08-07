import { useCreateItemAccountMutation } from '@services/itemAccount';
import { useMasterAccountsQuery } from '@services/masterAccount';
import { getAuthCredentials } from '@utils/auth';
import { ACCOUNT_TYPES, ITEM_TYPES } from '@utils/enums';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input } from 'antd';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createPurchaseFormSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  itemType: yup.string().required('Please select an item type'),
  quantity: yup.string(),
  price: yup.string().required('Price is required'),
  salePrice: yup.string().required('Sale Price is required'),
  accountTypeId: yup.number().required('Please select an account type'),
});

const CreateEditPurchaseForm = ({ initialValues }) => {
  const [form] = Form.useForm();

  const [createItemAccount, { isLoading: loading }] =
    useCreateItemAccountMutation();

  const { user } = getAuthCredentials();

  const location = useLocation();

  const { data: masterAccounts, isLoading: masterAccountsLoading } =
    useMasterAccountsQuery({
      companyId: user?.user?.company?.[0]?.id,
    });
  const inventoryAccountId = useMemo(() => {
    if (masterAccounts?.data?.docs) {
      return masterAccounts?.data?.docs?.find(
        (doc) => doc?.type === ACCOUNT_TYPES.INVENTORY
      )?.id;
    }
  }, [masterAccounts]);

  const yupSync = {
    async validator({ field }, value) {
      createPurchaseFormSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const navigate = useNavigate();

  //* Set initial values if any
  useEffect(() => {
    form.setFieldValue('title', initialValues?.title);
    form.setFieldValue('description', initialValues?.description);
    form.setFieldValue('price', initialValues?.price);
    form.setFieldValue('salePrice', initialValues?.salePrice);
    form.setFieldValue('quantity', initialValues?.quantity);
  }, [initialValues, location.state]);

  //* Form submission API call
  async function onSubmit({ title, description, price, salePrice, quantity }) {
    const { error } = await createItemAccount({
      title,
      description,
      itemType: ITEM_TYPES.DEBIT,
      accountTypeId: inventoryAccountId,
      price,
      salePrice,
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
        initialValues={{ isCurrent: true, assetFromCash: true }}
        disabled={masterAccountsLoading}
      >
        <Form.Item label='Product Name' name='title' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Product Description'
          name='description'
          rules={[yupSync]}
        >
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Quantity (Optional)'
          name='quantity'
          rules={[yupSync]}
        >
          <Input size='large' type='number' />
        </Form.Item>

        <Form.Item label='Buying Price' name='price' rules={[yupSync]}>
          <Input size='large' type='number' />
        </Form.Item>

        <Form.Item label='Selling Price' name='salePrice' rules={[yupSync]}>
          <Input size='large' type='number' />
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

export default CreateEditPurchaseForm;
