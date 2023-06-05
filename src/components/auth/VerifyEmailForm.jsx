import {
  useResendVerifyEmailMutation,
  useVerifyEmailMutation
} from '@services/user';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, message, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const VerifyEmailForm = () => {
  const { state } = useLocation();
  const query = useQuery();
  const [form] = Form.useForm();
  const [verifyEmail, { isLoading: loading }] = useVerifyEmailMutation();
  const [resendEmail, { isLoading: resending }] =
    useResendVerifyEmailMutation();

  const navigate = useNavigate();

  async function onSubmit({ email, otp }) {
    const { data } = await verifyEmail({
      email,
      otp
    });
    if (data) {
      navigate(ROUTES.LOGIN);
    }
  }

  async function onResend() {
    const { data } = await resendEmail({ email: state?.email });
    if (data) {
      message.success(data?.message);
    }
  }

  useEffect(() => {
    if (query.get('otp') && query.get('email')) {
      form.submit();
    }
  }, []);

  return (
    <>
      <Form
        form={form}
        initialValues={{
          email: state?.email ?? query.get('email'),
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

        <div className='d-flex align-items-center justify-content-between'>
          <Typography.Text>Didn&apos;t recieve any email?</Typography.Text>
          <Button
            loading={resending}
            disabled={resending}
            onClick={onResend}
            type='primary'
            htmlType='button'
            className='pl-3'
          >
            Resend Verification Email
          </Button>
        </div>
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

export default VerifyEmailForm;
