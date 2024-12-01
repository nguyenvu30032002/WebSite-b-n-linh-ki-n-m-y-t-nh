import React, { useCallback, useEffect, useState } from 'react'
import { Button, Flex, Form, Input, message, Select } from 'antd';
import AdminService from '../../services/AdminService'
import { WrapperTable, WrapperToggle, WrapperToggleShow } from './Admin';
import Search from 'antd/es/input/Search';
import { CloseOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { WrapperModal } from './Admin';
import img from '../../assets/images/avatar/d0tb7-copy.jpg'


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
      sorter: (a, b) => a.email.length - b.email.length,
        sortDirections: ['descend'],
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
    const [selectedAdmin, setSelectedAdmin] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [formData, setFormData] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const {createAdmin, deleteAdmin, getAdmin, updateAdmin} = AdminService()

    const fetchAdmin = useCallback(async() => {
      try{
        const data = await getAdmin(searchTerm)
        setAdmins(data)
      }
      catch(error){
        throw error
      }
    }, [getAdmin, searchTerm])

    useEffect(() => {
      fetchAdmin()
  }, [fetchAdmin])


    const dataSource = admins.map((admin) => ({
      key: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      gender: admin.gender,
      address: admin.address !== null ? admin.address : 'Chờ cập nhật',
      phone: admin.phone,
      avatar: admin.avatar,
      date_of_birth: admin.date_of_birth
    }));

/////////////////////////////////////////////////////////////////////////////////////////

    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

/////////////////////////////////////////////////////////////////////////////////////////////////////    
    
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  const toggleWrapper = () => {
      setShowWrapperToggle(!showWrapperToggle);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    createAdmin(values)
    .then((response) => {
      const data = response.data; // Lấy dữ liệu từ phản hồi
      if (data.message === 'already existed') {
          fetchAdmin()
          message.error('Tài khoản đã tồn tại');
          form.resetFields(); 
          setShowWrapperToggle(false);
      } else if (data.message === 'success') {
          fetchAdmin()
          message.success('Tạo tài khoản thành công');
          form.resetFields(); 
          setShowWrapperToggle(false);
      } else {
          fetchAdmin()
          message.error('Lỗi tạo tài khoản');
          form.resetFields(); 
          setShowWrapperToggle(false);
      }
    }).catch((error) => {
      fetchAdmin()
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
      form.resetFields(); 
      setShowWrapperToggle(false);
    });
  };

  const onSearch = (value) => {
    setSearchTerm(value)
  }

  const DeleteUser = () => {
    deleteAdmin(selectedRowKeys)
    .then((response) =>{
      if (response.data.message === 'success') {
        fetchAdmin()
        message.success('Xóa người dùng thành công');
      } else {
        fetchAdmin()
        message.error('Xóa người dùng thất bại'); // Nếu có lỗi từ server
      }
    })
    .catch((error) => {
      fetchAdmin()
      message.error('Có lỗi xảy ra, vui lòng thử lại!')
    })
  };

//////////////////////////////////////////

const handleRowClick = (record) => {
  setSelectedAdmin(record); // Lưu thông tin hàng đã chọn
  setIsModalOpen(true); // Mở Modal
};


const handleCancel = () => {
  setIsModalOpen(false)
}

const isClose = () => {
  setIsModalOpen(false);
};

const handleChange = (value) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    role: value, 
}));
};

const handleUpdate = () => {
    const id = selectedAdmin.key
    updateAdmin(formData,id)
    .then((response) => {
      if(response.data.message === 'success')
      {
        fetchAdmin()
        message.success('Thay đổi thành công')
        setIsModalOpen(false)
      }
      else{
        fetchAdmin()
        message.error('Thay đổi thất bại')
        setIsModalOpen(false);
      }
    })
    .catch((error) => {
      fetchAdmin()
      message.error('Có lỗi xảy ra, vui lòng thử lại!')
      setIsModalOpen(false);
    })
};

  return (
      <>
      <h1>Admin Page</h1>
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
          
          <WrapperTable rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ pageSize: 7 }} onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' },
        })}/>
        </Flex>
        {showWrapperToggle ? (
            <WrapperToggle>
                <div className='cancel'>
                <CloseOutlined onClick={() => setShowWrapperToggle(false)}/>
                </div>
                <Form
                {...formItemLayout}
                form={form}
                name="Add new"
                onFinish={onFinish}
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
                      message: 'Phone Number must be numeric!',
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
                    Add new
                  </Button>
                </Form.Item>
              </Form>
            </WrapperToggle>
        ) : (
            <WrapperToggleShow>
               
            </WrapperToggleShow>
        )}
        
        <WrapperModal title="Thông tin quản trị viên" maskClosable={isModalOpen} closable={false} onCancel={isClose} open={isModalOpen}  footer={[
          <Button key="update" type="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>
          
        ]} >
          {selectedAdmin ? (
            <>
              <div className='user'>
                  {
                    selectedAdmin.avatar !== null ?(
                      <img src={selectedAdmin.imgProduct} alt={selectedAdmin.nameProduct} />
                    ) : (
                      <img src={img} alt="null" />
                    )
                  }
                 <div className='infor'>
                  <div>
                    <label>Email: </label>
                    <p>{selectedAdmin.email}</p>
                  </div>
                  <div>
                    <label>Nickname: </label>
                    <p>{selectedAdmin.name}</p>
                  </div>
                  <div>
                    <label>Số điện thoại: </label>
                    <p>{selectedAdmin.phone}</p>
                  </div>
                  <div>
                    <label>Địa chỉ: </label>
                    {
                      selectedAdmin.address !== null && selectedAdmin.address !== 'Chờ cập nhật' ? (
                        <p>{selectedAdmin.address}</p>
                      ) : (
                        <span>Chờ cập nhật</span>
                      )
                    }
                  </div>
                  <div>
                    <label>Ngày sinh: </label>
                    {
                      selectedAdmin.date_of_birth !== null ? (
                        <p>{new Date(selectedAdmin.date_of_birth).toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
                      ) : (
                        <span>Chờ cập nhật</span>
                      )
                    }
                  </div>
                  <div>
                    <label>Giới tính:</label>
                    <p>{selectedAdmin.gender}</p>
                  </div>
                  <div>
                  <label>Chức vụ:</label>
                  <Select
                      defaultValue={selectedAdmin.role}
                      onChange={handleChange}
                      name= 'role'
                      options={[
                        { value: 'Admin', label: 'Admin' },
                        { value: 'User', label: 'User' },
                        
                      ]}
                  />
                  </div>
                 </div>
              </div>
            </>
              
          ) : null
          }
        </WrapperModal>

      </>
  )
}

export default AdminPage