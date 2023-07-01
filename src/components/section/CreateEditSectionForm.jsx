import { useBoqsQuery } from '@services/boq';
import {
  useCreateSectionMutation,
  useUpdateSectionMutation
} from '@services/sections';
import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createBoqFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  boqId: yup.number().required('Please select a tender')
});

const CreateEditSectionForm = ({ initialValues, onComplete }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [createSection, { isLoading: loading }] = useCreateSectionMutation();
  const [updateSection, { isLoading: updating }] = useUpdateSectionMutation();
  const { user } = getAuthCredentials();
  const { data, isLoading: boqsLoading } = useBoqsQuery({
    companyId: user?.user?.company?.[0]?.id
  });
  const boqsOptions = data?.data
    ? data?.data?.map((doc) => ({ label: doc?.name, value: doc?.id }))
    : [];

  const yupSync = {
    async validator({ field }, value) {
      createBoqFormSchema.validateSyncAt(field, { [field]: value });
    }
  };

  useEffect(() => {
    form.setFieldValue('name', initialValues?.name);
    form.setFieldValue('description', initialValues?.description);
    form.setFieldValue('boqId', initialValues?.boqId || location.state?.boqId);
  }, [initialValues]);

  async function onSubmit({ name, description, boqId }) {
    if (initialValues?.id) {
      const { error } = await updateSection({
        id: initialValues?.id,
        name,
        boqId
      });
      if (!error) {
        navigate(ROUTES.SECTION.MANAGE);
      }
    } else {
      const { error, data } = await createSection({
        name,
        description,
        boqId
      });
      if (!error) {
        navigate(
          location.pathname?.includes(ROUTES.TOUR.SECTION)
            ? ROUTES.TOUR.SECTION_ITEM
            : ROUTES.SECTION.MANAGE,
          { state: { sectionId: data?.data?.id } }
        );
      }
    }
    onComplete && onComplete();
  }
  return (
    <>
      <Form
        form={form}
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
        layout='vertical'
        disabled={boqsLoading}
      >
        <Form.Item label='Section Title' name='name' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Section Description'
          name='description'
          rules={[yupSync]}
        >
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Select Bill of Quantity'
          name='boqId'
          rules={[yupSync]}
        >
          <Select
            size='large'
            options={boqsOptions}
            placeholder='Select BOQ'
            loading={boqsLoading}
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
            {initialValues?.id ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateEditSectionForm;
