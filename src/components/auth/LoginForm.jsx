import { useLoginUserMutation } from '@services/user';
import { allowedRoles, hasAccess, setAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is not properly formatted')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const [login, { isLoading: loading }] = useLoginUserMutation();
  // const [errorMsg, setErrorMsg] = useState('');

  const yupSync = {
    async validator({ field }, value) {
      loginFormSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const navigate = useNavigate();

  async function onSubmit({ email, password }) {
    const { data, error } = await login({
      email,
      password,
    });
    if (data?.accessToken) {
      if (hasAccess(allowedRoles, data?.roles)) {
        setAuthCredentials(data?.accessToken, data?.roles, data);
        navigate(ROUTES.LEAD_MANAGER);
        return;
      }
    }
    if (error) {
      message.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : 'Unable to Login'
      );
    }
  }
  return (
    <>
      <Form
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
      >
        <Form.Item label='Email' name='email' rules={[yupSync]}>
          <Input size='large' type='email' />
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

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 4, span: 24 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 24 }}>
          <Button
            loading={loading}
            disabled={loading}
            type='primary'
            htmlType='submit'
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
