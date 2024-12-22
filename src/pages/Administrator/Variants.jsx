import React, { useCallback, useEffect, useState } from 'react'
import AdminService from '../../services/AdminService';
import AuthUser from '../../services/AuthUser';
import * as XLSX from 'xlsx';
import { Button, Flex, Form, Input, message, Select } from 'antd';
import { CloseOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { WrapperModal, WrapperTable, WrapperToggle, WrapperToggleShow } from './Variants';

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
        title: 'Created_by_Product',
        dataIndex: 'created_by_Product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
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

const Variants = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showWrapperToggle, setShowWrapperToggle] = useState(false);
    const [selectedVariants, setSelectedVariants] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [variants, setVariants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const {createVariants, getVariants, updateVariants, deleteVariants, getProduct} = AdminService()
    const {user} = AuthUser()
  
    const fetchProduct = useCallback(async() =>{
              try{
                const dataProduct = await getProduct()
                setProducts(dataProduct)
            }
            catch(error){
                throw error
            }
        },[getProduct])
    
        useEffect(() => {
          fetchProduct()
        },[fetchProduct])

  const fetchVariants = useCallback(async() => {
    try{
        const dataVariants = await getVariants(searchTerm)
        setVariants(dataVariants)
    }
    catch(error){
        throw error
    }
}, [getVariants, searchTerm])

useEffect(() => {
  
    fetchVariants();
}, [fetchVariants])
  
    const dataSource = variants.map((variant) => ({
      key: variant.id,
      name: variant.name,
      created_by_Admin: variant.created_by.name, 
      created_by_Product: variant.created_by_product.name,
      id_product: variant.created_by_product.id,
      price: `${Number(variant.price).toLocaleString('vi-VN')}đ`,
      created_at: new Date(variant.created_at).toISOString().slice(0, 19).replace('T', ' '), // Định dạng ngày
      updated_at: new Date(variant.updated_at).toISOString().slice(0, 19).replace('T', ' '), // Định dạng ngày
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
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Variants');
  
      // Export the workbook to an Excel file
      XLSX.writeFile(workbook, 'variants_data.xlsx');
    };
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  const toggleWrapper = () => {
      setShowWrapperToggle(!showWrapperToggle);
  };
  
  const [form] = Form.useForm();
  
  const onFinish = (values) => { 
    const admin_id = user.id
    createVariants(values, admin_id)
    .then((response) => {
      const data = response.data; 
      if (data.message === 'already existed') {
          fetchVariants()
          message.error('Biến thể đã tồn tại');
          form.resetFields(); 
          setShowWrapperToggle(false);
      } else if (data.message === 'success') {
          fetchVariants()
          message.success('Tạo mới thành công');
          form.resetFields(); 
          setShowWrapperToggle(false);
      } else {
          fetchVariants()
          message.error('Lỗi thêm mới');
          form.resetFields(); 
          setShowWrapperToggle(false);
      }
    }).catch((error) => {
        fetchVariants()
        message.error('Có lỗi xảy ra, vui lòng thử lại!');
        form.resetFields(); 
        setShowWrapperToggle(false);
    });
  };
  
  const onSearch = (value) => {
    setSearchTerm(value)
  }
  
  const DeleteVariants = () => {
    deleteVariants(selectedRowKeys)
    .then((response) =>{
      if (response.data.message === 'success') { 
        fetchVariants();
        setSelectedRowKeys([]);
        message.success('Xóa biến thể thành công');

      } else {
          fetchVariants();
          message.error('Xóa biến thể thất bại'); // Nếu có lỗi từ server
      }
    })
    .catch((error) => {
      fetchVariants();
      message.error('Có lỗi xảy ra, vui lòng thử lại!')
    })
  };
  
  //////////////////////////////////////////
  
  const handleRowClick = (record) => {
  setSelectedVariants(record); // Lưu thông tin hàng đã chọn
  setIsModalOpen(true); // Mở Modal
  };
  
  
  const handleCancel = () => {
  setIsModalOpen(false)
  }
  
  const isClose = () => {
  setIsModalOpen(false);
  };

  const updateData = (e) => {
    const { name, value } = e.target;
    setSelectedVariants((prevState) => ({
        ...prevState,
        [name]: value, // Cập nhật thuộc tính dựa trên tên
    }));
  }
  
  
  const handleUpdate = () => {
    // const data = { ...selectedVariants };

    // // Nếu giá trị mới trùng với giá trị cũ, sử dụng id_category
    // if (data.created_by_Category === data.created_by_category) {
    //     data.created_by_Category = data.id_category; // Thay đổi giá trị mới thành id_category
    // }

    // const admin_id = user.id;
    // updateVariants(data, admin_id)
    //     .then((response) => {
    //         if (response.data.message === 'already existed') {
    //             fetchVariants();
    //             message.error('Biến thể đã tồn tại');
    //             setShowWrapperToggle(false);
    //         } else if (response.data.message === 'success') {
    //             fetchCategories();
    //             message.success('Thay đổi thành công');
    //             setIsModalOpen(false);
    //         } else {
    //             fetchCategories();
    //             message.error('Thay đổi thất bại');
    //             setIsModalOpen(false);
    //         }
    //     })
    //     .catch((error) => {
    //         fetchCategories();
    //         message.error('Có lỗi xảy ra, vui lòng thử lại!');
    //         setIsModalOpen(false);
    //     });
  };
  
///////////////////////////////////////////////////////////////////

const optionsType = products.map((product) => ({
    key: product.id,
    label: product.name,
    value: product.id,
  }));

  return (
      <>
      <h1>Variants Page</h1>
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
                <DeleteOutlined style={{cursor: 'pointer'}} onClick={DeleteVariants} />
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
                  rules={[
                    { required: true, message: 'Please input Variants!', whitespace: true },
                    { max: 30, message: 'Variants must be at most 30 characters.' },
                  ]}
                >
                  <Input placeholder='Tên biến thể' style={{width:'250px'}}/>
                </Form.Item>
              
                <Form.Item
                    name='product_id'
                    rules={[{ required: true, message: 'Please select a product!' }]}
                >
                    <Select
                        placeholder="Sản phẩm"
                        options={optionsType}
                        style={{width:'250px'}}
                        showSearch
                        filterOption={(input, option) =>
                          option?.label.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>
                <Form.Item
                        name="price"
                        rules={[{ required: true, message: 'Input Price!' },
                          { max: 15, message: 'Price must be at most 15 characters.' },
                          {
                            pattern: /^[0-9]*$/, // Chỉ cho phép số
                            message: 'Price must be numeric!', // Thông báo lỗi nếu không phải là số
                          },
                        ]}
                      >
                      <Input style={{width: '250px'}} placeholder='Giá sản phẩm' />
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
        
        <WrapperModal title="Biến thể" maskClosable={isModalOpen} closable={false} onCancel={isClose} open={isModalOpen}  footer={[
          <Button key="update" type="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>
          
        ]} >
          {
          selectedVariants ? (
            <>
              <Input type="text" name='name' value={selectedVariants.name || ''}  onChange={updateData} />
            <Select
                options={optionsType}
                style={{width:'350px'}}
                value={selectedVariants.created_by_Product}
                onChange={(value) => {
                    setSelectedVariants((prevState) => ({
                        ...prevState,
                        created_by_Product: value, // Cập nhật giá trị loại sản phẩm
                    }));
                }}
                showSearch
                  filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                  }
            />
            <Input style={{width: '350px'}} value={selectedVariants.price} onChange={updateData} placeholder='Giá sản phẩm' />
            
            </>
          ) : null
          }
            
        </WrapperModal>
  
      </>
  )
  }

export default Variants