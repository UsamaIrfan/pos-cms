import { useCreateItemAccountMutation } from '@services/itemAccount';
import { useMasterAccountsQuery } from '@services/masterAccount';
import { getAuthCredentials } from '@utils/auth';
import { itemTypeOptions } from '@utils/constants';
import { ACCOUNT_TYPES } from '@utils/enums';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, Select, Switch } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createItemAccountFormSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  itemType: yup.string().required('Please select an item type'),
  quantity: yup.string(),
  price: yup.string().required('Price is required'),
  accountTypeId: yup.number().required('Please select an account type'),
  isCurrent: yup.bool(),
  assetFromCash: yup.bool().required('Please select yes or no'),
  balancingAccountId: yup
    .number()
    .when('assetFromCash', {
      is: false,
      then: yup.number().required(),
      otherwise: yup.number(),
    })
    .required('Please select an account type'),
});

const CreateEditItemAccountForm = ({ initialValues }) => {
  const [form] = Form.useForm();

  const [createItemAccount, { isLoading: loading }] =
    useCreateItemAccountMutation();

  const { user } = getAuthCredentials();

  const location = useLocation();

  const selectedAccountTypeId = Form.useWatch('accountTypeId', form);

  const { data, isLoading: masterAccountsLoading } = useMasterAccountsQuery({
    companyId: user?.user?.company?.[0]?.id,
  });

  //* Mapping master accounts data to select compatible format
  const masterAccountOptions = data?.data?.docs
    ? data?.data?.docs?.map((doc) => ({ label: doc?.name, value: doc?.id }))
    : [];

  const hasLongTermSelection = [
    ACCOUNT_TYPES.ASSET,
    ACCOUNT_TYPES.LIABILITY,
  ].includes(
    data?.data?.docs?.find((doc) => doc?.id === selectedAccountTypeId)?.type
  );

  //* Account type selection disabled depending on selected master account
  const isAccountTypeDisabled = ![
    ACCOUNT_TYPES.ASSET,
    ACCOUNT_TYPES.LIABILITY,
  ].includes(
    data?.data?.docs?.find((doc) => doc?.id === selectedAccountTypeId)?.type
  );

  //* Updating Item type based on the selected master account
  useEffect(() => {
    const selectedAccountType = data?.data?.docs?.find(
      (doc) => doc?.id === selectedAccountTypeId
    )?.type;

    if (
      [
        ACCOUNT_TYPES.LIABILITY,
        ACCOUNT_TYPES.CAPITAL,
        ACCOUNT_TYPES.REVENUE,
      ].includes(selectedAccountType)
    ) {
      form.setFieldValue('itemType', itemTypeOptions[1]?.value);
    }

    if (
      [
        ACCOUNT_TYPES.ASSET,
        ACCOUNT_TYPES.INVENTORY,
        ACCOUNT_TYPES.LOSS,
        ACCOUNT_TYPES.EXPENSE,
        ACCOUNT_TYPES.DEPRECIATION,
      ].includes(selectedAccountType)
    ) {
      form.setFieldValue('itemType', itemTypeOptions[0]?.value);
    }
  }, [selectedAccountTypeId]);

  const yupSync = {
    async validator({ field }, value) {
      createItemAccountFormSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const navigate = useNavigate();

  //* Set initial values if any
  useEffect(() => {
    form.setFieldValue('title', initialValues?.title);
    form.setFieldValue('description', initialValues?.description);
    form.setFieldValue('price', initialValues?.price);
    form.setFieldValue('quantity', initialValues?.quantity);
    form.setFieldValue('itemType', initialValues?.itemType);
    form.setFieldValue('isCurrent', initialValues?.isCurrent);
    form.setFieldValue(
      'accountTypeId',
      initialValues?.accountTypeId || location.state?.accountTypeId
    );
  }, [initialValues, location.state]);

  //* Form submission API call
  async function onSubmit({
    title,
    description,
    itemType,
    accountTypeId,
    price,
    quantity,
    isCurrent,
    assetFromCash,
  }) {
    const { error } = await createItemAccount({
      title,
      description,
      itemType,
      accountTypeId,
      price,
      quantity,
      companyId: user?.user?.company?.[0]?.id,
      ...(!isAccountTypeDisabled ? { isCurrent } : {}),
      ...(!isAccountTypeDisabled ? { assetFromCash } : {}),
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

        <Form.Item
          label='Quantity (Optional)'
          name='quantity'
          rules={[yupSync]}
        >
          <Input size='large' type='number' />
        </Form.Item>

        <Form.Item label='Price' name='price' rules={[yupSync]}>
          <Input size='large' type='number' />
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

        <Form.Item label='Item Type' name='itemType' rules={[yupSync]}>
          <Select
            size='large'
            disabled={true}
            options={itemTypeOptions}
            placeholder='Select Item Type'
          />
        </Form.Item>

        {hasLongTermSelection ? (
          <Form.Item
            label='Is Current Account?'
            name='isCurrent'
            rules={[yupSync]}
          >
            <Switch
              defaultChecked
              checkedChildren={'Yes'}
              unCheckedChildren={'No'}
            />
          </Form.Item>
        ) : null}

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
