import { InboxOutlined } from '@ant-design/icons';
import { useCreateTenderMutation } from '@services/tender';
import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createTenderFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required')
});

const CreateTenderForm = () => {
  const [createTender, { isLoading: loading }] = useCreateTenderMutation();
  const { user } = getAuthCredentials();

  const yupSync = {
    async validator({ field }, value) {
      createTenderFormSchema.validateSyncAt(field, { [field]: value });
    }
  };

  const navigate = useNavigate();

  async function onSubmit({ name, description }) {
    const { error } = await createTender({
      name,
      description,
      companyId: user?.user?.company?.[0]?.id
    });
    if (!error) {
      navigate(ROUTES.TENDER.MANAGE);
    }
  }

  const onDrop = (e) => {
    // eslint-disable-next-line no-console
    console.log('Dropped files', e.dataTransfer.files);
  };

  const onChange = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

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

        <Dragger
          name='file'
          accept='application/msword, application/pdf'
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          onDrop={onDrop}
          onChange={onChange}
          multiple={false}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Please upload your tender .docx file or .pdf file
          </p>
        </Dragger>

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
