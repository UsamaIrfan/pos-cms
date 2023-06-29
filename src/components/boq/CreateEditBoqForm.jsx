import { useCreateBoqMutation } from '@services/boq';
import { useTendersQuery } from '@services/tender';
import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createBoqFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  tenderId: yup.number().required('Please select a tender')
});

const CreateEditBoqForm = ({ initialValues }) => {
  const [form] = Form.useForm();
  const [createBoq, { isLoading: loading }] = useCreateBoqMutation();
  const { user } = getAuthCredentials();
  const { data, isLoading: tendersLoading } = useTendersQuery({
    companyId: user?.user?.company?.[0]?.id
  });
  const tendersOptions = data?.data?.docs
    ? data?.data?.docs?.map((doc) => ({ label: doc?.name, value: doc?.id }))
    : [];

  const yupSync = {
    async validator({ field }, value) {
      createBoqFormSchema.validateSyncAt(field, { [field]: value });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldValue('name', initialValues?.name);
    form.setFieldValue('description', initialValues?.description);
    form.setFieldValue('tenderId', initialValues?.tenderId);
  }, [initialValues]);

  async function onSubmit({ name, description, tenderId }) {
    const { error } = await createBoq({
      name,
      description,
      tenderId,
      companyId: user?.user?.company?.[0]?.id
    });
    if (!error) {
      navigate(ROUTES.TENDER.MANAGE);
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
        disabled={tendersLoading}
      >
        <Form.Item label='BOQ Title' name='name' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item label='BOQ Description' name='description' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item label='Select Tender' name='tenderId' rules={[yupSync]}>
          <Select
            size='large'
            options={tendersOptions}
            placeholder='Select Tender'
            loading={tendersLoading}
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

export default CreateEditBoqForm;
