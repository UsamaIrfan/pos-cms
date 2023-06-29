import { useLoginUserMutation } from '@services/user';
import { allowedRoles, hasAccess, setAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginForm = () => {
  const [login, { isLoading: loading }] = useLoginUserMutation();
  // const [errorMsg, setErrorMsg] = useState('');

  const yupSync = {
    async validator({ field }, value) {
      loginFormSchema.validateSyncAt(field, { [field]: value });
    }
  };

  const navigate = useNavigate();

  async function onSubmit({ usernameOrEmail, password }) {
    const { data } = await login({
      usernameOrEmail,
      password
    });
    if (data?.token) {
      if (hasAccess(allowedRoles, data?.roles)) {
        setAuthCredentials(data?.token, data?.roles, data);
        navigate(ROUTES.DASHBOARD, { replace: true });
        return;
      }
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
        <Form.Item label='Email' name='usernameOrEmail' rules={[yupSync]}>
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
