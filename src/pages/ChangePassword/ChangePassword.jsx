import React from 'react'
import { Wrapper, WrapperBody, WrapperHeader } from './style'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { WrapperForm } from '../Register/style'
import AuthUser from '../../services/AuthUser'
import UserService from '../../services/UserService'

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

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {user, changePassword} = UserService();

  const onFinish = async(values) => {
    const id = user.id
    const data = {
      old_password : values.old_password,
      password: values.password
    }
    changePassword(id, data)
    .then((response) => {
      const data = response.data
      if(data.message === 'success'){
        form.resetFields();
        message.success('Đổi mật khẩu thành công')
        setTimeout(() => {
          navigate('/')
        }, 3000); 
      }
      else if(data.message === 'wrong password'){
        form.resetFields();
        message.error('Mật khẩu cũ không đúng')
      }
      else{
        form.resetFields();
        message.error('Đổi mật khẩu thất bại')
      }
    })
    .catch((error) => {
      form.resetFields();
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    })
  };

  return (
    <Wrapper>
        <WrapperHeader>
            <Header/>
        </WrapperHeader>
        <WrapperBody>
                  <WrapperForm
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    scrollToFirstError
                  >
                    <Form.Item
                      name="old_password"
                      label="Old Password"
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
                
                    <Form.Item {...tailFormItemLayout} >
                      <Button type="primary" htmlType="submit">
                        Change Password
                      </Button>
                      <Button type="primary" onClick={() => navigate('/')}>
                        Back
                      </Button>
                    </Form.Item>
                  </WrapperForm>
        </WrapperBody>
        <Footer/>
    </Wrapper>
  )
}

export default ChangePassword