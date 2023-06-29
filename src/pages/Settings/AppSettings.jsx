import SettingsLayout from '@layouts/settings/SettingsLayout';
import { setTheme } from '@slices/app';
import { THEME_OPTIONS } from '@utils/enums';
import { Col, Form, Row, Switch, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

export default function AppSettings() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.app.theme);
  const [form] = Form.useForm();

  const toggleTheme = (val) => {
    const theme = val ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT;
    dispatch(setTheme(theme));
  };

  return (
    <main>
      <Typography.Title level={2}>App Settings</Typography.Title>
      <Form
        form={form}
        name='Settings Update'
        className='ant-advanced-search-form'
        layout='vertical'
        initialValues={{
          theme
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label='Color Theme' name='theme'>
              <Switch
                checked={theme === THEME_OPTIONS.DARK}
                checkedChildren='DARK'
                unCheckedChildren='LIGHT'
                onChange={toggleTheme}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </main>
  );
}

AppSettings.Layout = SettingsLayout;
