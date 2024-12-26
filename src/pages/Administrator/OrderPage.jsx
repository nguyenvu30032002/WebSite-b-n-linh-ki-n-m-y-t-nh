import React, { useCallback, useEffect, useState } from 'react'
import { Button, Flex, message } from 'antd';
import AdminService from '../../services/AdminService';
import { WrapperModal, WrapperTable } from './Order';
import { CopyOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import * as XLSX from 'xlsx';

const columns = [
  {
    title: 'Name',
    dataIndex: 'userName',
    sorter: (a, b) => a.userName.length - b.userName.length,
        sortDirections: ['descend'],
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },


  {
    title: 'Pending Payment',
    dataIndex: 'pending_payment'
  },

  {
    title: 'Order Status',
    dataIndex: 'order_status'
  },
  {
    title: 'Created_at',
    dataIndex: 'created_at',
    sorter: (a, b) => a.created_at.length - b.created_at.length,
        sortDirections: ['descend'],
  },
  {
    title: 'Options',
    dataIndex: 'options',
    className: 'options-column',
  },
  
];


const OrderPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const {updateOrder, getAllOrder} = AdminService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);


  const fetchAllOrder = useCallback(async() => {
    try{
        const dataOrder= await getAllOrder()
        setOrders(dataOrder);
    }
    catch(error){
        throw error
    }
},[getAllOrder])
fetchAllOrder();

useEffect(() => {
  fetchAllOrder()
}, [fetchAllOrder])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Định dạng dd/mm/yyyy
};
  const dataSource = orders.map((order, index) => ({
    
    key: order.id,
    user_id: order.user_id,
    userName: order.userName,
    address: order.address,
    phone: order.phone,
    pending_payment: order.status,
    order_status: order.condition,
    bill_of_lading_code: order.bill_of_lading_code,
    order_detail: order.order_detail,
    created_at: formatDate(order.created_at),
    options: (
      <>
        {
  (order.condition !== 'Đã nhận' && order.condition !== 'Đã hủy' && order.condition !== 'Đã giao') && (
    <>
      <Button onClick={() => {
        const condition = "Đã giao";
        const id = order.id;
        updateOrder(condition, id)
        .then((response) => {
          const data = response.data
          if(data.message === 'Đã giao'){
            fetchAllOrder()
            message.success('Xác nhận đơn hàng thành công')
          }else if(data.message === 'Đã hủy'){
            fetchAllOrder()
            message.success('Hủy đơn hàng thành công')
          }else{
            fetchAllOrder()
            message.error('Lỗi xác nhận đơn hàng')
          }
        })
        .catch((error) => {
          throw error
        })
      }} type="primary">Xác nhận</Button>
      <Button onClick={() => {
        const condition = "Đã hủy";
        const id = order.id;
        updateOrder(condition, id)
        .then((response) => {
          const data = response.data
          if(data.message === 'Đã giao'){
            fetchAllOrder()
            message.success('Xác nhận đơn hàng thành công')
          }else if(data.message === 'Đã hủy'){
            fetchAllOrder()
            message.success('Hủy đơn hàng thành công')
          }else{
            fetchAllOrder()
            message.error('Lỗi xác nhận đơn hàng')
          }
        })
        .catch((error) => {
          throw error
        })
      }} type="primary" danger style={{ marginLeft: '10px' }}>Hủy</Button>
    </>
  )
}
       
      </>
    ),
  }));

  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

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

//////////////////////////////////////////////////////////////

const exportToExcel = () => {
  // Create a new array of data excluding the checkbox
  const dataToExport = dataSource.map(({ key,imgProduct, ...rest }) => rest); // Exclude the 'key' property if not needed

  // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, 'orders_data.xlsx');
};

////////////////////////////////////////////////////////////////////////

const onSearch = (value) => {
  // setSearchTerm(value)
}

const DeleteUser = () => {
  // deleteAdmin(selectedRowKeys)
  // .then((response) =>{
  //   if (response.data.message === 'success') { // Giả sử server trả về một thuộc tính 'success'
  //     message.success('Xóa người dùng thành công');
  //   } else {
  //       message.error('Xóa người dùng thất bại'); // Nếu có lỗi từ server
  //   }
  // })
  // .catch((error) => {
  //   message.error('Có lỗi xảy ra, vui lòng thử lại!')
  // })
};

////////////////////////////////////////////////////
  const handleRowClick = (record,event) => {
    if (event.target.closest('.options-column')) {
      return; // Không làm gì cả nếu nhấn vào cột Options
    }
    setSelectedOrder(record); // Lưu thông tin hàng đã chọn
    setIsModalOpen(true); // Mở Modal
  };

  const isClose = () => {
    setIsModalOpen(false);
  };

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
      .then(() => {
          message.success('Đã sao chép mã vận đơn vào clipboard!');
      })
      .catch(() => {
          message.error('Không thể sao chép mã vận đơn.');
      });
}
console.log('selectedOrder', selectedOrder)
  return (
    <>
    <h1>Order</h1>
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
          <WrapperTable rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ pageSize: 6 }}  onRow={(record) => ({
          onClick: (event) => handleRowClick(record, event),
          style: { cursor: 'pointer' }, // Gọi hàm khi click vào hàng
        })} />;
        </Flex>
    
    <WrapperModal title="Chi tiết đơn hàng" open={isModalOpen} onCancel={isClose} footer={[]} >
    {selectedOrder ? ( // Kiểm tra xem selectedOrder không phải là null
       <>
       {
        selectedOrder.bill_of_lading_code  ?(
          <p className='bill_of_lading_code'>Mã vận đơn: <span style={{margin: '0 0 0 10px', fontWeight: '600', color: '#ee4d2d'}}>{selectedOrder.bill_of_lading_code}</span><CopyOutlined onClick={() => copyToClipboard(selectedOrder.bill_of_lading_code)} style={{margin: '0 0 0 20px', cursor:'pointer'}}/></p>
          ) : null
        }
        <div className='product'>
          {
            selectedOrder.order_detail && selectedOrder.order_detail.length > 0 && (
            selectedOrder.order_detail.map((detail) => (
            <div key={detail.id} 
              style={{ 
                borderBottom: 
                  selectedOrder.order_detail.length > 1 && 
                  detail.id !== selectedOrder.order_detail[selectedOrder.order_detail.length - 1].id 
                    ? '1px dotted rgba(0, 0, 0, .09)' 
                    : 'none'
            }}>
      
                      <img src={detail.created_by_product.image} alt={detail.created_by_product.name} />
                      <p className='nameProduct'>{detail.created_by_product.name}</p>
                      <p className='amount'>Số lượng: <span style={{color:'#d70018'}}>x{detail.amount} {detail.variant ?  <span style={{color: '#000'}}>({detail.variant})</span> : null}</span></p>

            </div>
              ))
                  
            ) 
          }
        </div>
        <div className='user'>
              <div>
                <p style={{
                  minWidth: '400px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}>
                  Người mua: 
                  <span style={{color: '#4096ff'}}> {selectedOrder.userName}</span></p>
                <p style={{
                  minWidth: '400px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}>Địa chỉ: 
                <span style={{color: '#4096ff'}}> {selectedOrder.address}</span></p>
              </div>
              <p>Số điện thoại: <span style={{color: '#4096ff'}}> {selectedOrder.phone}</span></p>

        </div>
       </>
        
    ) : (
        <p>Vui lòng chọn một đơn hàng để xem chi tiết.</p> // Tin nhắn dự phòng
    )}
    </WrapperModal>
    </>
  )
}

export default OrderPage