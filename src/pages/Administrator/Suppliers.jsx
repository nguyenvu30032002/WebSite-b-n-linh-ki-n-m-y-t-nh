import React, { useCallback, useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import AdminService from '../../services/AdminService';
import AuthUser from '../../services/AuthUser';
import { Button, Flex, Form, Input, message } from 'antd';
import { CloseOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { WrapperModal, WrapperTable, WrapperToggle, WrapperToggleShow } from './Suppliers';

const columns = [

    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },

    {
        title: 'Address',
        dataIndex: 'address',
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


const Suppliers = () => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWrapperToggle, setShowWrapperToggle] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {createSuppliers, deleteSuppliers, getSuppliers, updateSuppliers} = AdminService()
  const {user} = AuthUser()

  const fetchSuppliers = useCallback(async() => {
    try{
        const dataSuppliers = await getSuppliers(searchTerm)
        setSuppliers(dataSuppliers)
    }
    catch(error){
        throw error
    }
}, [getSuppliers, searchTerm])

    useEffect(() => {
    
    fetchSuppliers();
    }, [fetchSuppliers])
    
  const dataSource = suppliers.map((supplier) => ({
    key: supplier.id,
    name: supplier.name,
    address: supplier.address,
    created_by_Admin: supplier.created_by.name, 
    created_at: new Date(supplier.created_at).toISOString().slice(0, 19).replace('T', ' '), // Định dạng ngày
    updated_at: new Date(supplier.updated_at).toISOString().slice(0, 19).replace('T', ' '), // Định dạng ngày
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Suppliers');

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, 'suppliers_data.xlsx');
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
const toggleWrapper = () => {
    setShowWrapperToggle(!showWrapperToggle);
};

const [form] = Form.useForm();

const onFinish = (values) => {
  
  const admin_id = user.id
  createSuppliers(values, admin_id)
  .then((response) => {
    const data = response.data; // Lấy dữ liệu từ phản hồi
    if (data.message === 'already existed') {
        fetchSuppliers()
        message.error('Nhà cung cấp đã tồn tại');
        form.resetFields(); 
        setShowWrapperToggle(false);
    } else if (data.message === 'success') {
        fetchSuppliers()
        message.success('Tạo mới thành công');
        form.resetFields(); 
        setShowWrapperToggle(false);
    } else {
        fetchSuppliers()
        message.error('Lỗi thêm mới');
        form.resetFields(); 
        setShowWrapperToggle(false);
    }
  }).catch((error) => {
      fetchSuppliers()
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
      form.resetFields(); 
      setShowWrapperToggle(false);
  });
};

const onSearch = (value) => {
  setSearchTerm(value)
}

const DeleteSuppliers = () => {
    deleteSuppliers(selectedRowKeys)
  .then((response) =>{
    if (response.data.message === 'success') { 
      fetchSuppliers();
      setSelectedRowKeys([]);
      message.success('Xóa nhà cung cấp thành công');
     
    } else {
      fetchSuppliers();
      message.error('Xóa nhà cung cấp thất bại'); // Nếu có lỗi từ server
    }
  })
  .catch((error) => {
    fetchSuppliers();
    message.error('Có lỗi xảy ra, vui lòng thử lại!')
  })
};

//////////////////////////////////////////

const handleRowClick = (record) => {
    setSelectedSuppliers(record); // Lưu thông tin hàng đã chọn
    setIsModalOpen(true); // Mở Modal
};


const handleCancel = () => {
    setIsModalOpen(false)
}

const isClose = () => {
    setIsModalOpen(false);
};


const handleUpdate = () => {
  const data = {
    name : selectedSuppliers.name,
    address: selectedSuppliers.address,
  }
  const id = selectedSuppliers.key
  const admin_id = user.id
  updateSuppliers(data,id,admin_id)
  .then((response) => {
    if (response.data.message === 'already existed') {
      fetchSuppliers();
      message.error('Nhà cung cấp đã tồn tại');
      setShowWrapperToggle(false);
    }
    else if(response.data.message === 'success')
    {
      fetchSuppliers()
      message.success('Thay đổi thành công')
      setIsModalOpen(false)
      
    }
    else{
      fetchSuppliers()
      message.error('Thay đổi thất bại')
      setIsModalOpen(false);
    }
  })
  .catch((error) => {
    fetchSuppliers()
    message.error('Có lỗi xảy ra, vui lòng thử lại!')
    setIsModalOpen(false);
  })
};

  return (
    <>
    <h1>Suppliers Page</h1>
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
              <DeleteOutlined style={{cursor: 'pointer'}} onClick={DeleteSuppliers} />
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
                label="Suppliers"
                rules={[
                  { required: true, message: 'Please input Category!', whitespace: true },
                  { max: 30, message: 'Category must be at most 30 characters.' },
                ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: 'Please input address!', whitespace: true },
                  { max: 30, message: 'Addresss must be at most 30 characters.' },
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
    
      <WrapperModal title="Nhà cung cấp" maskClosable={isModalOpen} closable={false} onCancel={isClose} open={isModalOpen}  footer={[
        <Button key="update" type="primary" onClick={handleUpdate}>
        Cập nhật
      </Button>,
      <Button key="cancel" onClick={handleCancel}>
        Hủy
      </Button>
        
      ]} >
        {selectedSuppliers ? (
         <>   
             <input type="text" placeholder='Nhà cung cấp' name='name' value={selectedSuppliers.name || ''}  onChange={(e) => setSelectedSuppliers({ ...selectedSuppliers, name: e.target.value })} />
             <input type="text" placeholder='Địa chỉ' name='address' value={selectedSuppliers.address || ''}  onChange={(e) => setSelectedSuppliers({ ...selectedSuppliers, address: e.target.value })} />
         </>
        ) : null
        }
      </WrapperModal>

    </>
)
}

export default Suppliers