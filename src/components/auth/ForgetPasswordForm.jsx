import { useForgotPasswordMutation } from '@services/user';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required('Email is required')
});

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading: loading }] = useForgotPasswordMutation();

  const yupSync = {
    async validator({ field }, value) {
      loginFormSchema.validateSyncAt(field, { [field]: value });
    }
  };
  async function onSubmit({ email }) {
    const { data } = await forgotPassword({
      email
    });
    if (data) {
      message.success(data?.message);
      navigate(
        `${ROUTES.VERIFY_FORGOT_TOKEN}?token=${data?.data?.token}&email=${data?.data?.email}`
      );
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
        <Form.Item label='Email' name='email' rules={[yupSync]}>
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

export default ForgotPasswordForm;
