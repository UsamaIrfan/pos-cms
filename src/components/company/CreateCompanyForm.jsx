import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useCreateCompanyMutation } from '@services/company';
import { getAuthCredentials, setAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCompanyForm = ({ initialValues }) => {
  const [form] = Form.useForm();
  const [createCompany, { isLoading: loading }] = useCreateCompanyMutation();
  const { token, permissions } = getAuthCredentials();

  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      form.setFieldValue('name', initialValues?.name);
      form.setFieldValue('description', initialValues?.description);
      form.setFieldValue('address', initialValues?.address);
      form.setFieldValue('phoneNumber', initialValues?.phoneNumber);
      form.setFieldValue('otherDetails', initialValues?.otherDetails);
    }
  }, [initialValues]);

  async function onSubmit({
    name,
    description,
    address,
    otherDetails,
    phoneNumber
  }) {
    const { data, error } = await createCompany({
      name,
      description,
      address,
      otherDetails: JSON.stringify(otherDetails),
      phoneNumber
    });
    if (!error) {
      setAuthCredentials(token, permissions, {
        token,
        user: data?.data,
        roles: permissions
      });
      navigate(ROUTES.TENDER.MANAGE);
    }
  }
  return (
    <>
      <Form
        form={form}
        initialValues={
          initialValues ?? { otherDetails: [{ name: '', value: '' }] }
        }
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
        layout='vertical'
      >
        <Form.Item
          label='Company Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please enter your company name'
            }
          ]}
        >
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Company Description'
          name='description'
          rules={[
            {
              required: true,
              message: 'Please tell us about your company'
            }
          ]}
        >
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Company Address'
          name='address'
          rules={[
            {
              required: true,
              message: 'Please enter your company address'
            }
          ]}
        >
          <Input size='large' type='text' />
        </Form.Item>

        <Form.Item
          label='Company Phone Number'
          name='phoneNumber'
          rules={[
            {
              required: true,
              message: 'Please enter your company contact'
            }
          ]}
        >
          <Input size='large' type='text' />
        </Form.Item>

        <Form.List name='otherDetails'>
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'Other Details' : ''}
                  required={false}
                  key={field.key}
                >
                  <Row gutter={16}>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            message: 'Detail type is required'
                          }
                        ]}
                        name={[field.name, 'name']}
                      >
                        <Input placeholder='Detail type' />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Row justify='space-between' align='top'>
                        <Col span={20}>
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                message: 'Detail description is required'
                              }
                            ]}
                            name={[field.name, 'value']}
                          >
                            <Input placeholder='Detail description' />
                          </Form.Item>
                        </Col>
                        <Col span={4} className='d-flex justify-content-center'>
                          {fields.length > 0 ? (
                            <Button
                              shape='circle'
                              type='link'
                              onClick={() => remove(index)}
                              icon={<MinusCircleOutlined />}
                            />
                          ) : null}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add({ name: '', value: '' })}
                  style={{
                    width: '100%'
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Detail
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

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

export default CreateCompanyForm;
