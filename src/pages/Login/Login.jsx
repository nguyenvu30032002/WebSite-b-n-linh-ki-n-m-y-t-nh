import React from 'react';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Wrapper, WrapperForm } from './style';
import AuthUser from '../../services/AuthUser';
import { Bounce, toast, ToastContainer } from 'react-toastify';



const Login = () => {
    const  {http, setToken, setExpires_in, setUser} = AuthUser();
    const [form] = Form.useForm();
    const onFinish = (values) => {
      // api call
      http.post('/login', {email:values.email, password:values.password})
      .then((res)=>{
        const accessToken = res.data.access_token;
        const expires_in = res.data.expires_in
        setToken(accessToken)
        setExpires_in(expires_in)
        setUser(res.data.user)
      })
      .catch((err)=>{
        form.resetFields(['password']);
        toast.error(
          <div>
            Sai tài khoản hoặc mật khẩu <br />
            Vui lòng đăng nhập lại.
          </div>);
        
      })
    };
    
  return (
    <Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={1500}
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
      <h1>LOGIN</h1>
      <WrapperForm
        form={form}
        name="login"
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

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
          hasFeedback
        >
          {/* Using Input.Password for password field with show/hide functionality */}
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            iconRender={visible => (visible ?  <EyeOutlined /> : <EyeInvisibleOutlined />)} // Customize eye icon if needed
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="/forgotpassword">Forgot password</a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" style={{margin: '0 0 10px 0'}}>
            Log in
          </Button>
          or <a href="/register" >Register now!</a>
        </Form.Item>
      </WrapperForm>
    </Wrapper>
  );
};

export default Login;
