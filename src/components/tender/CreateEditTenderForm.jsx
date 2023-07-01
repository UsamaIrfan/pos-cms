import { InboxOutlined } from '@ant-design/icons';
import {
  useCreateTenderMutation,
  useUpdateTenderMutation
} from '@services/tender';
import { getAuthCredentials } from '@utils/auth';
import { ROUTES } from '@utils/routes';
import { Button, Form, Input, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createTenderFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required')
});

const CreateEditTenderForm = ({ initialValues, onComplete }) => {
  const [form] = Form.useForm();
  const [createTender, { isLoading: loading }] = useCreateTenderMutation();
  const [updateTender, { isLoading: updating }] = useUpdateTenderMutation();
  const { user } = getAuthCredentials();
  const location = useLocation();

  const yupSync = {
    async validator({ field }, value) {
      createTenderFormSchema.validateSyncAt(field, { [field]: value });
    }
  };

  const navigate = useNavigate();

  async function onSubmit({ name, description }) {
    let tenderError;
    let tenderData;
    if (initialValues?.id) {
      const { error, data } = await updateTender({
        id: initialValues?.id,
        name,
        description,
        companyId: user?.user?.company?.[0]?.id
      });
      tenderError = error;
      tenderData = data;
    } else {
      const { error, data } = await createTender({
        name,
        description,
        companyId: user?.user?.company?.[0]?.id
      });
      tenderError = error;
      tenderData = data;
    }
    if (!tenderError) {
      navigate(
        location.pathname?.includes(ROUTES.TOUR.TENDER) && tenderData?.data?.id
          ? ROUTES.TOUR.BOQ
          : ROUTES.TENDER.MANAGE,
        { state: { tenderId: tenderData?.data?.id } }
      );
    }
    onComplete && onComplete();
  }

  useEffect(() => {
    if (initialValues?.name) form.setFieldValue('name', initialValues?.name);
    if (initialValues?.description)
      form.setFieldValue('description', initialValues?.description);
  }, [initialValues]);

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
        form={form}
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
            {initialValues?.id ? 'Update' : 'Continue'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateEditTenderForm;
