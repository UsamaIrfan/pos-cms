import { DeleteOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { useLazyAllItemAccountsQuery } from '@services/itemAccount';
import { useCreateOrderMutation } from '@services/order';
import { getAuthCredentials } from '@utils/auth';
import {
  Button,
  Form,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Table,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';

const CreateEditSectionItemForm = ({ initialValues }) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const { user } = getAuthCredentials();
  const [currentItem, setCurrentItem] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchAccounts, { data: searchedProducts }] =
    useLazyAllItemAccountsQuery();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const createOrderItemSchema = useMemo(
    () =>
      yup.object().shape({
        search: yup.string(),
        saleQuantity: yup
          .number()
          .max(
            currentItem?.quantity ?? 0,
            `Quantity not in stock. Available '${currentItem?.quantity ?? 0}'`
          )
          .required('Sale quantity is required'),
        salePrice: yup.number().required('Sale price is required'),
      }),
    [currentItem]
  );

  const yupSync = {
    async validator({ field }, value) {
      createOrderItemSchema.validateSyncAt(field, { [field]: value });
    },
  };

  useEffect(() => {
    form.setFieldValue('name', initialValues?.name);
    form.setFieldValue('description', initialValues?.description);
    form.setFieldValue('price', initialValues?.price);
    form.setFieldValue('quantity', initialValues?.quantity);
    form.setFieldValue('unit', initialValues?.unit);
    form.setFieldValue('sectionId', location.state?.sectionId);
  }, [initialValues, location.state]);

  async function onSubmit({ saleQuantity, salePrice }) {
    setSelectedItems((prev) => [
      ...prev,
      { ...currentItem, saleQuantity, salePrice },
    ]);
    setCurrentItem(null);
    form.resetFields();
  }

  const onSearch = (val) => {
    searchAccounts({ title: val });
  };

  const onChange = (val) => {
    const item = searchedProducts.data.find((item) => val === item?.id);

    setCurrentItem(item);
  };

  useEffect(() => {
    if (currentItem) {
      form.setFieldValue('saleQuantity', 1);
      form.setFieldValue('salePrice', currentItem?.price);
    }
  }, [currentItem]);

  const onRemove = (item) => {
    setSelectedItems((prev) => prev.filter((pItem) => pItem?.id !== item?.id));
  };

  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Price',
        key: 'salePrice',
        dataIndex: 'salePrice',
      },
      {
        title: 'Quantity',
        key: 'saleQuantity',
        dataIndex: 'saleQuantity',
      },
      {
        title: 'Actions',
        key: 'unit',
        render: (row) => (
          <Space direction='horizontal'>
            <Button
              shape='circle'
              onClick={() => onRemove(row)}
              icon={<DeleteOutlined />}
              type='primary'
            />
          </Space>
        ),
      },
    ],
    []
  );

  const onCreateOrder = () => {
    createOrder({
      orderItems: selectedItems?.map((item) => ({
        salePrice: item?.salePrice,
        saleQuantity: item?.saleQuantity,
        itemId: item?.id,
      })),
      companyId: user?.user?.company?.[0]?.id,
    });
    setSelectedItems([]);
    setCurrentItem(null);
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onSubmit}
        autoComplete='off'
        noValidate
        layout='vertical'
      >
        <Form.Item label='Search products ...' name='search' rules={[yupSync]}>
          <Select
            showSearch
            placeholder={'Search ...'}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={onSearch}
            notFoundContent={null}
            onChange={onChange}
            options={(searchedProducts?.data || [])
              .filter((d) => !selectedItems?.some((item) => item?.id === d?.id))
              .map((d) => ({
                value: d.id,
                label: d.title,
              }))}
          />
        </Form.Item>

        {currentItem ? (
          <>
            <Form.Item
              label='Sale Quantity'
              name='saleQuantity'
              rules={[yupSync]}
            >
              <Input max={currentItem?.quantity} size='large' type='number' />
            </Form.Item>

            <Form.Item label='Sale Price' name='salePrice' rules={[yupSync]}>
              <Input size='large' type='number' disabled />
            </Form.Item>
          </>
        ) : null}
        <Form.Item>
          <Button type='primary' htmlType='submit' className='w-100 mt-3'>
            Add
          </Button>
        </Form.Item>

        <Table
          dataSource={selectedItems}
          columns={columns}
          pagination={false}
          caption='Sale Items'
        />

        <Row justify='space-between' align='middle'>
          <Statistic
            title='Total'
            value={selectedItems?.reduce(
              (acc, curr) => acc + curr?.salePrice,
              0
            )}
            prefix={<DollarCircleOutlined />}
          />
          <Button
            onClick={onCreateOrder}
            loading={isLoading}
            htmlType='button'
            type='primary'
          >
            Add Order
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default CreateEditSectionItemForm;
