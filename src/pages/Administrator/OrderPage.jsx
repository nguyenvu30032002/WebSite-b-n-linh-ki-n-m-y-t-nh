import React, { useState } from 'react'
import { Button, message, Table } from 'antd';
import AdminService from '../../services/AdminService';
import { WrapperModal } from './Order';
import { CopyOutlined } from '@ant-design/icons';

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
    title: 'Address',
    dataIndex: 'address',
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
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
    <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={{ pageSize: 7 }}  onRow={(record) => ({
          onClick: (event) => handleRowClick(record, event),
          style: { cursor: 'pointer' }, // Gọi hàm khi click vào hàng
        })} />;
    <WrapperModal title="Basic Modal" open={isModalOpen} onCancel={isClose} footer={[]} >
    {selectedOrder ? ( // Kiểm tra xem selectedOrder không phải là null
       <>
        <div className='product'>
            <img src={selectedOrder.imgProduct} alt={selectedOrder.nameProduct} />
            <div>
                <p>{selectedOrder.nameProduct} </p>
                <p>Mã vận đơn: {selectedOrder.bill_of_lading_code}<CopyOutlined onClick={() => copyToClipboard(selectedOrder.bill_of_lading_code)} style={{margin: '0 0 0 20px', cursor:'pointer'}}/></p>
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