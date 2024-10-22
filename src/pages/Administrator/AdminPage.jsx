import React, { useState } from 'react'
import { Button, Flex, Form, Input, message, Select } from 'antd';
import AdminService from '../../services/AdminService'
import { WrapperTable, WrapperToggle, WrapperToggleShow } from './Admin';
import Search from 'antd/es/input/Search';
import { DeleteOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
      },
  ];

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
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

const AdminPage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showWrapperToggle, setShowWrapperToggle] = useState(false);
    const {admins, createAdmin, deleteAdmin} = AdminService()
    const dataSource = admins.map((admin) => ({
      key: admin.id,
      name: admin.name,
      email: admin.email,
      address: admin.address,
      phone: admin.phone
    }));

    const onSearch = (value) => {
      console.log(value)
    }

    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
      console.log('newSelectedRowKeys', newSelectedRowKeys)
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    
    const exportToExcel = () => {
      // Create a new array of data excluding the checkbox
      const dataToExport = dataSource.map(({ key, ...rest }) => rest); // Exclude the 'key' property if not needed

      // Create a worksheet from the data
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Admins');

      // Export the workbook to an Excel file
      XLSX.writeFile(workbook, 'admin_data.xlsx');
    };

    const toggleWrapper = () => {
      setShowWrapperToggle(!showWrapperToggle);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    createAdmin(values)
    .then((response) => {
      const data = response.data; // Lấy dữ liệu từ phản hồi
      if (data.message === 'already existed') {
          message.error('Tài khoản đã tồn tại');
      } else if (data.message === 'success') {
          message.success('Tạo tài khoản thành công');
          form.resetFields(); 
          setShowWrapperToggle(false);
      } else {
          message.error('Lỗi tạo tài khoản');
      }
    }).catch((error) => {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
      console.error(error); // In ra lỗi để dễ dàng debug
    });
  };


  const DeleteUser = () => {
    deleteAdmin(selectedRowKeys)
  };

  return (
      <>
      <h1>Admin</h1>
        <Flex gap="middle" vertical>
          <Flex align="center" gap="middle">
            <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              Reload
            </Button>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
            
            
            {
              selectedRowKeys.length === 0 && (
                <PlusOutlined  onClick={toggleWrapper}  style={{cursor:'pointer'}} />
              )
            }
            {
              selectedRowKeys.length > 0 && (
                <DeleteOutlined style={{cursor: 'pointer'}} onClick={DeleteUser} />
              )
            }
            <Search  placeholder="input search text" onSearch={onSearch} style={{ width: 300, marginLeft:'700px', marginRight:'40px', position: 'absolute' }} />
            <PrinterOutlined  onClick={exportToExcel} style={{cursor:'pointer', marginLeft:'1070px', marginRight:'40px', position: 'absolute'}} />
          </Flex>
          
          <WrapperTable rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
        </Flex>
        {showWrapperToggle ? (
            <WrapperToggle>
                <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                style={{ maxWidth: 600 }}
                scrollToFirstError
              >
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
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
                  <Input.Password autoComplete="new-password"/>
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
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
                  name="name"
                  label="Nickname"
                  tooltip="What do you want others to call you?"
                  rules={[
                    { required: true, message: 'Please input your nickname!', whitespace: true },
                    { max: 25, message: 'Nickname must be at most 25 characters.' },
                  ]}
                >
                  <Input autoComplete="username"/>
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
                
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Please select gender!' }]}
                >
                  <Select style={{width:'60%'}} placeholder="select your gender">
                    <Select.Option value="Nam">Nam</Select.Option>
                    <Select.Option value="Nữ">Nữ</Select.Option>
                    <Select.Option value="Khác">Khác</Select.Option>
                  </Select>
                </Form.Item >
              
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </WrapperToggle>
        ) : (
            <WrapperToggleShow>
               
            </WrapperToggleShow>
        )}
        
      </>
  )
}

export default AdminPage