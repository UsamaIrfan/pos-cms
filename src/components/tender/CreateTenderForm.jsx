import { useCreateTenderMutation } from '@services/tender';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createTenderFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required')
});

const CreateTenderForm = () => {
  const [createTender, { isLoading: loading }] = useCreateTenderMutation();

  const yupSync = {
    async validator({ field }, value) {
      createTenderFormSchema.validateSyncAt(field, { [field]: value });
    }
  };

  const navigate = useNavigate();

  async function onSubmit({ name, description }) {
    const { error } = await createTender({
      name,
      description
    });
    if (!error) {
      navigate(ROUTES.TENDER.MANAGE);
    }
  }
  return (
    <>
      <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
        layout='vertical'
      >
        <Form.Item label='Tender Name' name='name' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Tender Description'
          name='description'
          rules={[yupSync]}
        >
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            disabled={loading}
            type='primary'
            htmlType='submit'
            className='w-100 mt-3'
          >
            Continue
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateTenderForm;
