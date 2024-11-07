import React, { useState } from 'react'
import { Button, Flex, message, Table } from 'antd';
import AdminService from '../../services/AdminService';
import { WrapperModal, WrapperTable } from './Order';
import { CopyOutlined, DeleteOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import * as XLSX from 'xlsx';

const columns = [
  {
    title: 'Name',
    dataIndex: 'userName',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Product',
    dataIndex: 'nameProduct',
  },


  {
    title: 'Condition',
    dataIndex: 'condition'
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
  const {updateOrder, orders} = AdminService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const dataSource = orders.map((order, index) => ({
    key: order.id,
    user_id: order.user_id,
    userName: order.userName,
    address: order.address,
    phone: order.phone,
    status: order.status,
    product_id: order.product_id,
    imgProduct: order.imgProduct,
    nameProduct: order.nameProduct,
    amount: order.amount,
    totalMoney: order.totalMoney,
    condition: order.condition,
    origin: order.origin,
    bill_of_lading_code: order.bill_of_lading_code,
    options: (
      <>
        {
  (order.condition !== 'Đã nhận' && order.condition !== 'Đã hủy' && order.condition !== 'Đã giao') && (
    <>
      <Button onClick={() => {
        const condition = "Đã giao";
        const id = order.id;
        updateOrder(condition, id);
      }} type="primary">Xác nhận</Button>
      <Button onClick={() => {
        const condition = "Đã hủy";
        const id = order.id;
        updateOrder(condition, id);
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
          <WrapperTable rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ pageSize: 7 }}  onRow={(record) => ({
          onClick: (event) => handleRowClick(record, event),
          style: { cursor: 'pointer' }, // Gọi hàm khi click vào hàng
        })} />;
        </Flex>
    
    <WrapperModal title="Basic Modal" open={isModalOpen} onCancel={isClose} footer={[]} >
    {selectedOrder ? ( // Kiểm tra xem selectedOrder không phải là null
       <>
        <div className='product'>
            <img src={selectedOrder.imgProduct} alt={selectedOrder.nameProduct} />
            <div>
                <p>{selectedOrder.nameProduct} </p>
                {
                  selectedOrder.condition === 'Đã giao' ?(
                <p>Mã vận đơn: {selectedOrder.bill_of_lading_code}<CopyOutlined onClick={() => copyToClipboard(selectedOrder.bill_of_lading_code)} style={{margin: '0 0 0 20px', cursor:'pointer'}}/></p>
                  ) : null
                }
                <p>Tổng tiền: <span style={{color:'#d70018'}}>{Number(selectedOrder.totalMoney).toLocaleString('vi-VN')} đ</span></p>
                <p>Số lượng: <span style={{color:'#d70018'}}>x{selectedOrder.amount}</span></p>
                <p>Tình trạng: <span style={{color:'#d70018'}}>{selectedOrder.status}</span></p>
            </div>
        </div>
        <div className='user'>
              <p>Người mua: <span style={{color: '#4096ff'}}>{selectedOrder.userName}</span></p>
              <p>Địa chỉ: <span style={{color: '#4096ff'}}>{selectedOrder.address}</span></p>
              <p>Số điện thoại: <span style={{color: '#4096ff'}}>{selectedOrder.phone}</span></p>

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