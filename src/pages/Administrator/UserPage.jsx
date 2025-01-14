import { Button, Flex, message, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import AdminService from '../../services/AdminService';
import * as XLSX from 'xlsx';
import img from '../../assets/images/avatar/d0tb7-copy.jpg'
import { DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { WrapperModal, WrapperTable, } from './User';

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


const UserPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const {deleteUser, getUser, updateUser} = AdminService()

const fetchUser = useCallback(async() => {
  try{
    const data = await getUser(searchTerm)
    setUsers(data)
  }
  catch(error){
    throw error
  }
}, [getUser, searchTerm])

useEffect(() => {
  fetchUser()
}, [fetchUser])

  const dataSource = users.map((user) => ({
    key: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    gender: user.gender,
    address: user.address !== null ? user.address : 'Chờ cập nhật',
    phone: user.phone,
    avatar: user.avatar,
    date_of_birth: user.date_of_birth
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, 'user_data.xlsx');
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const onSearch = (value) => {
  setSearchTerm(value)
}

const DeleteUser = () => {
  deleteUser(selectedRowKeys)
  .then((response) =>{
    if (response.data.message === 'success') { 
      fetchUser()
      message.success('Xóa người dùng thành công');
    } else {
      fetchUser()
        message.error('Xóa người dùng thất bại'); // Nếu có lỗi từ server
    }
  })
  .catch((error) => {
    fetchUser()
    message.error('Có lỗi xảy ra, vui lòng thử lại!')
  })
};

//////////////////////////////////////////

const handleRowClick = (record) => {
  setSelectedUser(record); // Lưu thông tin hàng đã chọn
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
  const id = selectedUser.key
  updateUser(formData,id)
  .then((response) => {
    if(response.data.message === 'success')
    {
      fetchUser()
      message.success('Thay đổi thành công')
      setIsModalOpen(false)
    }
    else{
      fetchUser()
      message.error('Thay đổi thất bại')
      setIsModalOpen(false);
    }
  })
  .catch((error) => {
    fetchUser()
    message.error('Có lỗi xảy ra, vui lòng thử lại!')
    setIsModalOpen(false);
  })
};

return (
    <>
    <h1>User Page</h1>
      <Flex gap="middle" vertical>
        <Flex align="center" gap="middle">
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}

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
      <WrapperModal title="Thông tin người dùng" maskClosable={isModalOpen} closable={false} onCancel={isClose} open={isModalOpen}  footer={[
        <Button key="update" type="primary" onClick={handleUpdate}>
        Cập nhật
      </Button>,
      <Button key="cancel" onClick={handleCancel}>
        Hủy
      </Button>
        
      ]} >
        {selectedUser ? (
          <>
            <div className='user'>
                {
                  selectedUser.avatar !== null ?(
                    <img src={selectedUser.avatar} alt={selectedUser.name} />
                  ) : (
                    <img src={img} alt="null" />
                  )
                }
               <div className='infor'>
                <div>
                  <label>Email: </label>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <label>Nickname: </label>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <label>Số điện thoại: </label>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <label>Địa chỉ: </label>
                  {
                    selectedUser.address !== null && selectedUser.address !== 'Chờ cập nhật' ? (
                      <p>{selectedUser.address}</p>
                    ) : (
                      <span>Chờ cập nhật</span>
                    )
                  }
                </div>
                <div>
                  <label>Ngày sinh: </label>
                  {
                    selectedUser.date_of_birth !== null ? (
                      <p>{new Date(selectedUser.date_of_birth).toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
                    ) : (
                      <span>Chờ cập nhật</span>
                    )
                  }
                </div>
                <div>
                  <label>Giới tính:</label>
                  <p>{selectedUser.gender}</p>
                </div>
                <div>
                <label>Chức vụ:</label>
                <Select
                    defaultValue={selectedUser.role}
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

export default UserPage