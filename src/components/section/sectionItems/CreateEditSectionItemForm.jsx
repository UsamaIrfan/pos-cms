import {
  useCreateSectionItemMutation,
  useUpdateSectionItemMutation
} from '@services/sectionItems';
import { unitOptions } from '@utils/constants';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect } from 'react';

const CreateEditSectionItemForm = ({
  initialValues,
  onComplete,
  sectionId
}) => {
  const [form] = Form.useForm();
  const [createSectionItem, { isLoading: loading }] =
    useCreateSectionItemMutation();
  const [updateSectionItem, { isLoading: updating }] =
    useUpdateSectionItemMutation();

  useEffect(() => {
    form.setFieldValue('name', initialValues?.name);
    form.setFieldValue('description', initialValues?.description);
    form.setFieldValue('price', initialValues?.price);
    form.setFieldValue('quantity', initialValues?.quantity);
    form.setFieldValue('unit', initialValues?.unit);
  }, [initialValues]);

  async function onSubmit({ name, description, price, quantity, unit }) {
    if (initialValues?.id) {
      const { error } = await updateSectionItem({
        id: initialValues?.id,
        name,
        description,
        price,
        quantity,
        unit
      });
      if (!error) message.success('Section Item Updated');
    } else {
      const { error } = await createSectionItem({
        name,
        description,
        price,
        quantity,
        unit,
        sectionId
      });
      if (!error) message.success('Section Item Created');
    }
    onComplete && onComplete();
  }

  return (
    <>
      <Form
        form={form}
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
        layout='vertical'
      >
        <Form.Item label='Item Name' name='name' rules={[{ required: true }]}>
          <Input size='large' type='text' />
        </Form.Item>
        <Form.Item
          label='Item Description'
          name='description'
          rules={[{ required: true }]}
        >
          <Input size='large' type='text' />
        </Form.Item>
        <Form.Item label='Max Price' name='price' rules={[{ required: true }]}>
          <Input size='large' type='number' />
        </Form.Item>
        <Form.Item
          label='Quantity'
          name='quantity'
          rules={[{ required: true }]}
        >
          <Input size='large' type='number' />
        </Form.Item>
        <Form.Item label='Unit' name='unit' rules={[{ required: true }]}>
          <Select
            size='large'
            options={unitOptions}
            placeholder='Select Unit'
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading || updating}
            disabled={loading || updating}
            type='primary'
            htmlType='submit'
            className='w-100 mt-3'
          >
            {initialValues?.id ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateEditSectionItemForm;
