import React from 'react';
import { Wrapper, WrapperInformation, WrapperSelect } from './style';
import logo from "../../assets/images/avatar/logo192.png";

const OrderComponent = ({ selectedOrderStatus }) => {
  const orders = [
    { id: 1, name: 'Sản phẩm 1', quantity: 10, total: 1000000, status: 'Chờ xác nhận' },
    { id: 2, name: 'Sản phẩm 2adiofsifsofijsdofjisdjfjsfijsidfjisjjopjfsfsdf', quantity: 5000000, total: 5000003453543455435353, status: 'Đã giao' },
    { id: 3, name: 'Sản phẩm 3', quantity: 2, total: 200000, status: 'Đã nhận' },
    { id: 4, name: 'Sản phẩm 4', quantity: 8, total: 800000, status: 'Đã hủy' },
    { id: 5, name: 'Sản phẩm 5', quantity: 3, total: 300000, status: 'Chờ xác nhận' },
    { id: 6, name: 'Sản phẩm 6', quantity: 1, total: 100000, status: 'Đã nhận' },
    { id: 7, name: 'Sản phẩm 7', quantity: 6, total: 600000, status: 'Đã hủy' },
    { id: 8, name: 'Sản phẩm 8', quantity: 6, total: 600000, status: 'Đã hủy' },
    { id: 9, name: 'Sản phẩm 9', quantity: 6, total: 600000, status: 'Đã hủy' },
    { id: 10    , name: 'Sản phẩm 10', quantity: 6, total: 600000, status: 'Đã hủy' },
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
              <p>{order.total}</p>
              <p>VND</p>
            </div>
            <div className='condition'>
              <p>Trạng thái:</p>
              <p>{order.status}</p>
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
