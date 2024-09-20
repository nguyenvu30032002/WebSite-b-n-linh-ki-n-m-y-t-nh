import React from 'react';
import { Wrapper, WrapperInformation, WrapperSelect } from './style';
import logo from "../../assets/images/avatar/logo192.png";

const OrderComponent = ({ selectedOrderStatus }) => {
  const orders = [
    { id: 1, name: 'Sản phẩm 1', quantity: 10, total: 1000000, status: 'Chờ xác nhận', notes: 'Đã thanh toán' },
    { id: 2, name: 'Sản phẩm 2adiofsifsofijsdofjisdjfjsfijsidfjisjjopjfsfsdf', quantity: 100, total: 5000003453543455435353, status: 'Đã giao', notes: 'Chưa thanh toán' },
    { id: 3, name: 'Sản phẩm 3', quantity: 2, total: 200000, status: 'Đã nhận', notes: 'Đã thanh toán' },
    { id: 4, name: 'Sản phẩm 4', quantity: 8, total: 800000, status: 'Đã hủy', notes: 'Chưa thanh toán' },
    { id: 5, name: 'Sản phẩm 5', quantity: 3, total: 300000, status: 'Chờ xác nhận', notes: 'Đã thanh toán' },
    { id: 6, name: 'Sản phẩm 6', quantity: 99, total: 100000, status: 'Đã nhận', notes: 'Đã thanh toán' },
    { id: 7, name: 'Sản phẩm 7', quantity: 6, total: 600000, status: 'Đã hủy', notes: 'Chưa thanh toán' },
    { id: 8, name: 'Sản phẩm 8', quantity: 6, total: 600000, status: 'Đã hủy', notes: 'Chưa thanh toán' },
    { id: 9, name: 'Sản phẩm 9', quantity: 6, total: 600000, status: 'Đã hủy', notes: 'Đã thanh toán' },
    { id: 10, name: 'Sản phẩm 10', quantity: 60, total: 600000, status: 'Đã hủy', notes: 'Đã thanh toán' },
  ];

  // Lọc đơn hàng theo trạng thái đã chọn
  const filteredOrders = orders.filter(order => order.status === selectedOrderStatus);

  return (
    <Wrapper>
      {filteredOrders.length > 0 ? (
    filteredOrders.map((order, index) => (
        <div key={order.id} className='product'>
          <WrapperInformation>
            <div className='imgProduct'>
              <img src={logo} alt="product" />
            </div>
            <div className='nameProduct'>
              <p>{order.name}</p>
            </div>
            <div className='amountProduct'>
                <div className='quantityProduct'>
                    <p>Số lượng:</p>
                    <p>{order.quantity}</p>
                </div>
                <div className='originProduct'>
                    <p>Xuất xứ:</p>
                    <p>USA</p>
                </div>
            </div>
            <div className='totalMoney'>
              <p>Thành giá:</p>
              <p>{(order.total).toLocaleString('vi-VN')} VND</p>
            
            </div>
            <div className='condition'>
              <p>Trạng thái:</p>
              <p>{order.notes}</p>
            </div> 
            
          </WrapperInformation>
          {
            order.status !== 'Chờ xác nhận' && (
                <WrapperSelect>
                {order.status === 'Đã giao' ? (
                    <>
                    <button>Xác nhận</button>
                    <button>Hủy</button>
                    </>
                ) : (
                    <button>Mua lại</button>
                )}
                </WrapperSelect>
            )
          }   
        </div>
        
    ))
  ) : (
    <p>Không có đơn hàng</p>
  )}
    </Wrapper>
  );
};

export default OrderComponent;
