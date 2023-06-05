import { useResetPasswordMutation } from '@services/user';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, message } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Password is required')
});

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPasswordForm = () => {
  const query = useQuery();
  const [resetPassword, { isLoading: loading }] = useResetPasswordMutation();

  const yupSync = {
    async validator({ field }, value) {
      loginFormSchema.validateSyncAt(field, { [field]: value });
    }
  };

  const navigate = useNavigate();

  async function onSubmit({ password }) {
    const { data } = await resetPassword({
      password,
      email: query.get('email'),
      resetPassToken: query.get('token')
    });
    if (data) {
      message.success(data?.message);
      navigate(ROUTES.LOGIN);
    }
  }

  return (
    <>
      <Form
        name='basic'
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
        layout='vertical'
      >
        <Form.Item label='Password' name='password' rules={[yupSync]}>
          <Input.Password
            required
            size='large'
            name='password'
            type='password'
          />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          rules={[yupSync]}
        >
          <Input.Password
            required
            size='large'
            name='password'
            type='password'
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
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
