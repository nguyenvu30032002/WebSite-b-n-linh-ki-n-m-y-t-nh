import React from 'react'
import { Wrapper, WrapperForm } from './style'
import { Button, Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const tailFormItemLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 8 },
      sm: { span: 16, offset: 8 },
    },
  };



const ForgotPassword = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
  return (
    <Wrapper>
      <h1>FORGOT PASSWORD</h1>
      <WrapperForm
        name="forgotpassword"
        initialValues={{
          remember: false,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            autoComplete="Email" // Added autocomplete attribute
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout} >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" onClick={() => navigate('/login')}>
            Back
          </Button>
        </Form.Item>
      </WrapperForm>
    </Wrapper>
  )
}

export default ForgotPassword