import React, { useCallback, useEffect, useState } from 'react'
import AdminService from '../../services/AdminService'
import { Button, Flex, Form, Input, message } from 'antd';
import * as XLSX from 'xlsx';
import { CloseOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { WrapperModal, WrapperTable, WrapperToggle, WrapperToggleShow } from './Categories';
import AuthUser from '../../services/AuthUser';

const columns = [

    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    
    {
      title: 'Created_by_Admin',
      dataIndex: 'created_by_Admin',
    },

    {
      title: 'Created_at',
      dataIndex: 'created_at',
    },

    {
      title: 'Updated_at',
      dataIndex: 'updated_at',
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


const CategoriesPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWrapperToggle, setShowWrapperToggle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {createCategory, deleteCategories, getCategories, updateCategory} = AdminService()
  const {user} = AuthUser()

  const fetchCategories = useCallback(async() => {
    try{
        const dataCategories = await getCategories(searchTerm)
        setCategories(dataCategories)
    }
    catch(error){
        throw error
    }
}, [getCategories, searchTerm])

useEffect(() => {
  
  fetchCategories();
}, [fetchCategories])

  const dataSource = categories.map((category) => ({
    key: category.id,
    name: category.name,
    created_by_Admin: category.created_by.name, 
    created_at: new Date(category.created_at).toISOString().slice(0, 19).replace('T', ' '), // Định dạng ngày
    updated_at: new Date(category.updated_at).toISOString().slice(0, 19).replace('T', ' '), // Định dạng ngày
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, 'categories_data.xlsx');
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
const toggleWrapper = () => {
    setShowWrapperToggle(!showWrapperToggle);
};

const [form] = Form.useForm();

const onFinish = (values) => { 
  const admin_id = user.id
  createCategory(values, admin_id)
  .then((response) => {
    const data = response.data; // Lấy dữ liệu từ phản hồi
    if (data.message === 'already existed') {
        message.error('Loại sản phẩm đã tồn tại');
        form.resetFields(); 
        setShowWrapperToggle(false);
    } else if (data.message === 'success') {
        message.success('Tạo mới thành công');
        fetchCategories()
        form.resetFields(); 
        setShowWrapperToggle(false);
    } else {
        message.error('Lỗi thêm mới');
        form.resetFields(); 
        setShowWrapperToggle(false);
    }
  }).catch((error) => {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
      form.resetFields(); 
      setShowWrapperToggle(false);
  });
};

const onSearch = (value) => {
  setSearchTerm(value)
}

const DeleteCategory = () => {
  deleteCategories(selectedRowKeys)
  .then((response) =>{
    if (response.data.message === 'success') { // Giả sử server trả về một thuộc tính 'success'
      setSelectedRowKeys([]);
      message.success('Xóa loại sản phẩm thành công');
      fetchCategories();
     
    } else {
        message.error('Xóa loại sản phẩm thất bại'); // Nếu có lỗi từ server
    }
  })
  .catch((error) => {
    message.error('Có lỗi xảy ra, vui lòng thử lại!')
  })
};

//////////////////////////////////////////

const handleRowClick = (record) => {
setSelectedCategory(record); // Lưu thông tin hàng đã chọn
setIsModalOpen(true); // Mở Modal
};


const handleCancel = () => {
setIsModalOpen(false)
}

const isClose = () => {
setIsModalOpen(false);
};


const handleUpdate = () => {
  const data = selectedCategory.name
  const id = selectedCategory.key
  const admin_id = user.id
  updateCategory(data,id,admin_id)
  .then((response) => {
    if (response.data.message === 'already existed') {
      message.error('Loại sản phẩm đã tồn tại');
      setShowWrapperToggle(false);
    }
    else if(response.data.message === 'success')
    {
      message.success('Thay đổi thành công')
      fetchCategories()
      setIsModalOpen(false)
      
    }
    else{
      message.error('Thay đổi thất bại')
      setIsModalOpen(false);
    }
  })
  .catch((error) => {
    message.error('Có lỗi xảy ra, vui lòng thử lại!')
    setIsModalOpen(false);
  })
};

return (
    <>
    <h1>Categories Page</h1>
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
              <DeleteOutlined style={{cursor: 'pointer'}} onClick={DeleteCategory} />
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
                name="name"
                label="Category"
                rules={[
                  { required: true, message: 'Please input Category!', whitespace: true },
                  { max: 30, message: 'Category must be at most 30 characters.' },
                ]}
              >
                <Input/>
              </Form.Item>
            
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
      
      <WrapperModal title="Loại sản phẩm" maskClosable={isModalOpen} closable={false} onCancel={isClose} open={isModalOpen}  footer={[
        <Button key="update" type="primary" onClick={handleUpdate}>
        Cập nhật
      </Button>,
      <Button key="cancel" onClick={handleCancel}>
        Hủy
      </Button>
        
      ]} >
        {selectedCategory ? (
          <input type="text" placeholder='Loại sản phẩm' name='name' value={selectedCategory.name || ''}  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })} />
        ) : null
        }
      </WrapperModal>

    </>
)
}


export default CategoriesPage