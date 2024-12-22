import { Button, Flex, Form, Image, Input, message, Select, Upload } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import AdminService from '../../services/AdminService'
import { WrapperModal, WrapperTable, WrapperToggle, WrapperToggleShow } from './Product';
import * as XLSX from 'xlsx';
import { CloseOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Type',
      dataIndex: 'productType',
    },
    {
      title: 'Inventory',
      dataIndex: 'inventory',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
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

  // const getBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

    const { TextArea } = Input;

const ProductPage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showWrapperToggle, setShowWrapperToggle] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [updateImage, setUpdateImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('')
    const {createProduct, getProduct, updateProduct, deleteProduct, getCategories, getSuppliers} = AdminService()

    const fetchProduct = useCallback(async() =>{
          try{
            const dataProduct = await getProduct(searchTerm)
            setProducts(dataProduct)
        }
        catch(error){
            throw error
        }
    },[getProduct,searchTerm])

    useEffect(() => {
      fetchProduct()
    },[fetchProduct])

    const fetchCategories = useCallback(async() => {
      try{
          const dataCategories = await getCategories()
          setCategories(dataCategories)
      }
      catch(error){
          throw error
      }
    }, [getCategories])
  
    useEffect(() => {
      
      fetchCategories();
    }, [fetchCategories])

    const fetchSuppliers = useCallback(async() => {
      try{
          const dataSuppliers = await getSuppliers()
          setSuppliers(dataSuppliers)
      }
      catch(error){
          throw error
      }
    }, [getSuppliers,])
  
      useEffect(() => {
      
      fetchSuppliers();
      }, [fetchSuppliers])

    const dataSource = products.map((product) => ({
      key: product.id,
      name: product.name,
      productType: product.productType,
      description: product.description,
      price: `${Number(product.price).toLocaleString('vi-VN')}đ`,
      inventory: product.inventory,
      origin: product.origin,
      brand: product.brand,
      image: product.image,
      sold: product.sold,
      discount: product.discount,
      variant: product.variant,
    }));

    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
      // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


///////////////////////////////////////////////////////////////////////

const exportToExcel = () => {
  // Create a new array of data excluding the checkbox
  const dataToExport = dataSource.map(({ key, ...rest }) => rest); // Exclude the 'key' property if not needed

  // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, 'products_data.xlsx');
};

/////////////////////////////////////////////////////////////////////

const [fileList, setFileList] = useState([]);

// const handlePreview = async (file) => {
//   if (!file.url && !file.preview) {
//     file.preview = await getBase64(file.originFileObj);
//   }
//   setPreviewImage(file.url || file.preview);
//   setPreviewOpen(true);
// };
const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
const uploadButton = (
  <button
    style={{
      border: 0,
      background: 'none',                                                         
    }}
    type="button"
  >
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);

const handleUpload = (file) => {
  // Ngăn không cho tự động tải file lên
  setFileList([...fileList, file]); // Thêm file vào danh sách file
  return false; // Trả về false để ngăn tải lên tự động
};

const toggleWrapper = () => {
  setShowWrapperToggle(!showWrapperToggle);
  form.resetFields();
  setFileList([]);
};

const [form] = Form.useForm();

const onSearch = (value) => {
  setSearchTerm(value)
}

const onFinish = (values) => { 
  const formData = {
    ...values,
    img:  fileList.map(file => file.name).join(', '),
  };
  createProduct(formData)
  .then((response) => {
    const data = response.data; // Lấy dữ liệu từ phản hồi
    if (data.message === 'success') {
        fetchProduct()
        message.success('Tạo mới thành công');
        form.resetFields(); 
        setShowWrapperToggle(false);
        
    } else {
        fetchProduct()
        message.error('Lỗi thêm mới');
        form.resetFields(); 
        setShowWrapperToggle(false);
        
    }
  }).catch((error) => {
      fetchProduct()
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
      form.resetFields(); 
      setShowWrapperToggle(false);
  });
};

const DeleteProduct = () => {
  deleteProduct(selectedRowKeys)
  .then((response) =>{
    if (response.data.message === 'success') { 
      fetchProduct();
      setSelectedRowKeys([]);
      message.success('Xóa sản phẩm thành công');
    } else {
      fetchProduct(); 
      message.error('Xóa sản phẩm thất bại'); // Nếu có lỗi từ server
    }
  })
  .catch((error) => {
    fetchProduct();
    message.error('Có lỗi xảy ra, vui lòng thử lại!')
  })
};


///////////////////////////////////////////////////////////////

const handleRowClick = (record) => {
  setSelectedProduct(record); // Lưu thông tin hàng đã chọn
  setIsModalOpen(true); // Mở Modal
};

//////////////////////////////////////////////////////////////////////////

const optionsType = categories.map((category) => ({
  key: category.id,
  label: category.name,
  value: category.name,
}));

const optionsBrand = suppliers.map((supplier) => ({
  key: supplier.id,
  label: supplier.name,
  value: supplier.name
}));


///////////////////////////////////////////////////////////////////////////////////////

const handleCancel = () => {
  setIsModalOpen(false)
  setUpdateImage([null])
}

const isClose = () => {
  setIsModalOpen(false);
  setUpdateImage([null])
};


const onUpdate = (e) => {
  const { name, type } = e.target; // Lấy tên và loại của input
  if (type === 'file') {
    const file = e.target.files[0];
    const value = e.target.value; 
    setUpdateImage(file) 
    if (file) {
  
      setSelectedProduct((prevState) => ({
          ...prevState,
          [name]: value,
          image: file.name // Cập nhật tên file
      }));
    }
  } else {
    const value = e.target.value; 
    setSelectedProduct((prevState) => ({
        ...prevState,
        [name]: value, 
    }));
  }
} 

const onUpdateSelect = (fieldName, value) => {
  setSelectedProduct((prevState) => ({
    ...prevState,
    [fieldName]: value, // Cập nhật trường được chỉ định với giá trị chọn
  }));
};
const updateProducts = () => {
  updateProduct(selectedProduct)
  .then((response) => {
    if(response.data.message === 'success')
    {
      fetchProduct()
      message.success('Thay đổi thành công')
      setIsModalOpen(false)
      
    }
    else{
      fetchProduct()
      message.error('Thay đổi thất bại')
      setIsModalOpen(false);
    }
  })
  .catch((error) => {
    fetchProduct()
    message.error('Có lỗi xảy ra, vui lòng thử lại!')
    setIsModalOpen(false);
  })
}

  return (
    <>
    <h1>Products Page</h1>
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
              <DeleteOutlined style={{cursor: 'pointer'}} onClick={DeleteProduct} />
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
              <CloseOutlined onClick={() => {
                setShowWrapperToggle(false);
                form.resetFields();
                setFileList([]);
                }}/>
              </div>
              <Form
              {...formItemLayout}
              form={form}
              name="Add new"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              scrollToFirstError
            >

              <div className='product'>

                  <Upload
                    listType="picture-card"
                    fileList={fileList} // Danh sách ảnh đã chọn
                    onChange={handleChange} // Xử lý thay đổi danh sách file
                    beforeUpload={handleUpload} // Xử lý sự kiện trước khi tải lên
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: 'none',
                        
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
                
                  <div className='informationProduct'>
                    <Form.Item
                      name="nameProduct"
                      rules={[
                        { required: true, message: 'Please input Name Product!', whitespace: true },
                        { max: 50, message: 'Category must be at most 50 characters.' },
                      ]}
                    >
                      <Input placeholder="Tên sản phẩm" style={{width: '350px'}}/>
                    </Form.Item>  
                    
                    <div className='select'>
                      <Form.Item
                        name='productType'
                        rules={[{ required: true, message: 'Please select a product type!' }]}
                      >
                        <Select
                          placeholder="Loại sản phẩm"
                          options={optionsType}
                          style={{width:'150px'}}
                        />
                      </Form.Item>

                      <Form.Item
                        name='brand'
                        rules={[{ required: true, message: 'Please select a brand!' }]}
                      >
                        <Select
                          placeholder="Nhà cung cấp"
                          options={optionsBrand}
                          style={{width:'150px'}}
                        />
                      </Form.Item>
                    </div>

                    <div className='payment'>
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
                        <Input style={{width: '150px'}} placeholder='Giá sản phẩm' />
                      </Form.Item>

                      <Form.Item
                          name="inventory"
                          rules={[{ required: true, message: 'Input Inventory!' },
                            { max: 5, message: 'Inventory must be at most 5 characters.' },
                            {
                              pattern: /^[0-9]*$/, // Chỉ cho phép số
                              message: 'Inventory must be numeric!', // Thông báo lỗi nếu không phải là số
                            },
                          ]}
                        >
                          <Input style={{width: '150px'}} placeholder='Nhập kho' />
                        </Form.Item>

                    </div>

                    <div className='inventory'>
                    
                      <Form.Item
                          name="discount"
                          rules={[{ required: true, message: 'Input Discount!' },
                            { max: 3, message: 'Discount must be at most 3 characters.' },
                            {
                              pattern: /^[0-9]*$/, // Chỉ cho phép số
                              message: 'Discount must be numeric!', // Thông báo lỗi nếu không phải là số
                            },
                          ]}
                        >
                          <Input style={{width: '150px'}} placeholder='Giảm giá' />
                        </Form.Item>

                        <Form.Item
                          name="origin"
                          rules={[
                            { required: true, message: 'Input Origin!', whitespace: true },
                            { max: 20, message: 'Origin must be at most 20 characters.' },
                          ]}
                        >
                          <Input placeholder="Xuất xứ" style={{width: '150px'}}/>
                        </Form.Item>
                    </div>
                    
                    <Form.Item
                      name='description'
                      rules={[{ required: true, message: 'Please input a description!' }]}
                    >
                      <TextArea placeholder="Mô tả sản phẩm" rows={4} style={{ width: '350px', height: '70px' }} />
                    </Form.Item>
                  </div>
                </div>
               

              <div className='add'>
                <Form.Item {...tailFormItemLayout}>
                  <Button style={{margin: '5px 0 0 0'}} type="primary" htmlType="submit">
                    Add new
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </WrapperToggle>
      ) : (
          <WrapperToggleShow>
             
          </WrapperToggleShow>
      )}

<WrapperModal title="Thông tin sản phẩm" maskClosable={isModalOpen} closable={false} onCancel={isClose} open={isModalOpen}  footer={[
          <Button key="update" type="primary" onClick={updateProducts}>
          Cập nhật
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>
        ]} >
              <div className='product'>
                  <div className='image'>
                    <img src={ updateImage && updateImage.name ? updateImage.name : `http://localhost:3000/${selectedProduct.image}`} alt={selectedProduct.name} />
                    <Input type="file" accept="image/*" onChange={onUpdate}/>
                  </div>
                   
                
                  <div className='informationProduct'>
                     <Input name="nameProduct" onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}  value={selectedProduct.name} style={{width: '350px'}} placeholder='Tên sản phẩm' />
                    <div className='select'>
                        <Select
                          placeholder="Loại sản phẩm"
                          options={optionsType}
                          style={{width:'150px'}}
                          name='productType'
                          value={selectedProduct.productType}
                          onChange={(value) => onUpdateSelect('productType', value)}
                        />
                        <Select
                          placeholder="Nhà cung cấp"
                          options={optionsBrand}
                          style={{width:'150px'}}
                          name='brand'
                          value={selectedProduct.brand}
                          onChange={(value) => onUpdateSelect('brand', value)}
                        />
                    </div>

                    <div className='payment'>
                      <Input name="price" onChange={onUpdate}  value={selectedProduct.price} style={{width: '150px'}} placeholder='Giá sản phẩm' />
                      <Input name="inventory" onChange={onUpdate}  value={selectedProduct.inventory} style={{width: '150px'}} placeholder='Nhập kho' />

                    </div>

                    <div className='inventory'>
                      <Input name="discount" onChange={onUpdate}  value={selectedProduct.discount} style={{width: '150px'}} placeholder='Giảm giá' />

                      <Input name="origin" onChange={onUpdate}  value={selectedProduct.origin} placeholder="Xuất xứ" style={{width: '150px'}}/>
                    </div>
                      <TextArea name='description' onChange={onUpdate}  value={selectedProduct.description} placeholder="Mô tả sản phẩm" rows={5} style={{ width: '350px', height: '100px',margin: '0 0 20px 0' }} />
                  </div>
                </div>
        </WrapperModal>
    </>
  )
}


export default ProductPage