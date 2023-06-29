import { useRegisterUserMutation } from '@services/user';
import { ROLES } from '@utils/constants';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const registerFormSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup
    .string()
    .email('Email is not properly formatted')
    .required('Email is required'),
  password: yup.string().required('Password is required')
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [register, { isLoading: loading }] = useRegisterUserMutation();
  // const [errorMsg, setErrorMsg] = useState('');

  const yupSync = {
    async validator({ field }, value) {
      registerFormSchema.validateSyncAt(field, { [field]: value });
    }
  };

  async function onSubmit({ username, phoneNumber, email, password }) {
    const { data } = await register({
      username,
      phoneNumber,
      email,
      password,
      roles: [ROLES.COMPANY_OWNER]
    });
    if (data) {
      message.success(data?.message);
      navigate(ROUTES.VERIFY_EMAIL, { state: { email } });
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
        <Form.Item label='Username' name='username' rules={[yupSync]}>
          <Input size='large' />
        </Form.Item>
        <Form.Item label='Email' name='email' rules={[yupSync]}>
          <Input size='large' type='email' />
        </Form.Item>
        <Form.Item label='Phone number' name='phoneNumber' rules={[yupSync]}>
          <Input size='large' />
        </Form.Item>

        <Form.Item label='Password' name='password' rules={[yupSync]}>
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
            Continue with email
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
