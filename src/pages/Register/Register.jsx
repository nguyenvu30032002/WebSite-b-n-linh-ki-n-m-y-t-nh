import React from 'react';
import {
  Button,
  Form,
  Input,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { Wrapper, WrapperForm } from './style';
import AuthUser from '../../services/AuthUser';
import { ToastContainer, toast, Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {http} = AuthUser();
  const onFinish = (values) => {
   
    http.post('/register',{email:values.email, password:values.password,name:values.nickname, phone:values.phone})
    .then((res)=>{
        if (res.data.success) {
          toast.success('Đăng kí thành công'); 
          setTimeout(() => {
            navigate('/login');
        }, 2000);
      } else {
          toast.error('Đăng kí không thành công'); 
      }
    })
    .catch((err) =>{
        toast.error('Đăng kí không thành công');
    })

  };

  return (
    <Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
      <h1>REGISTER</h1>
       <WrapperForm
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
        <Input autoComplete="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 5, message: 'Password must be at least 5 characters.' },
            { max: 15, message: 'Password must be at most 15 characters.' },
          ]}
          hasFeedback
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            { required: true, message: 'Please input your nickname!', whitespace: true },
            { max: 25, message: 'Nickname must be at most 25 characters.' },
          ]}
        >
          <Input autoComplete="username" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' },
            { max: 15, message: 'Phone Number must be at most 15 characters.' },
            {
              pattern: /^[0-9]*$/, // Chỉ cho phép số
              message: 'Phone Number must be numeric!', // Thông báo lỗi nếu không phải là số
            },
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
    
        <Form.Item {...tailFormItemLayout} >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <Button type="primary" onClick={() => navigate('/login')}>
            Back
          </Button>
        </Form.Item>
      </WrapperForm>
    </Wrapper>
  );
};

export default Register;
