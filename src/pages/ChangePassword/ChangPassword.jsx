import React from 'react'
import { Wrapper, WrapperBody, WrapperHeader } from './style'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { WrapperForm } from '../Register/style'
import AuthUser from '../../services/AuthUser'

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

const ChangPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {getUser, token, http} = AuthUser();
  const id =  getUser().id;

  const onFinish = async(values) => {
    try{
      await http.post(`/change-password/${id}`, {password: values.password}, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      message.success('Đổi mật khẩu thành công');
      form.resetFields();
      navigate('/'); 
    }
    catch(err){
      message.error('Lỗi đổi mật khẩu');
      throw err
    }
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

export default ChangPassword