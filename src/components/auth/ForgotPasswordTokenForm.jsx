import { useVerifyForgotPasswordTokenMutation } from '@services/user';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input } from 'antd';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ForgotPasswordTokenForm = () => {
  const [form] = Form.useForm();
  const query = useQuery();
  const [verifyEmail, { isLoading: loading }] =
    useVerifyForgotPasswordTokenMutation();

  const navigate = useNavigate();

  async function onSubmit({ email, otp }) {
    const { data } = await verifyEmail({
      email,
      otp,
      forgetPassToken: query.get('token')
    });
    if (data) {
      navigate(
        `${ROUTES.RESET_PASSWORD}?token=${data?.data?.token}&email=${data?.data?.email}`
      );
    }
  }

  useEffect(() => {
    if (query.get('token') && query.get('otp')) {
      form.submit();
    }
  }, []);

  return (
    <>
      <Form
        form={form}
        initialValues={{
          email: query?.get('email'),
          otp: query.get('otp')
        }}
        onFinish={onSubmit}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input size='large' type='email' disabled />
        </Form.Item>

        <Form.Item
          label='Verification code'
          name='otp'
          rules={[{ required: true, message: 'Verification code is required' }]}
        >
          <Input size='large' type='number' autoFocus />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            disabled={loading}
            type='primary'
            htmlType='submit'
            className='w-100 mt-3'
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordTokenForm;
