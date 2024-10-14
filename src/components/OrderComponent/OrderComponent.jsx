import React from 'react';
import { Wrapper, WrapperInformation, WrapperSelect } from './style';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const OrderComponent = ({ selectedOrderStatus }) => {
  const navigate = useNavigate();
  const {orders, updateCondition} = UserService();
  // Lọc đơn hàng theo trạng thái đã chọn
  const filteredOrders = orders.filter(order => order.condition === selectedOrderStatus);
  
  return (
    <Wrapper>
      {filteredOrders.length > 0 ? (
    filteredOrders.map((order, index) => (
        <div key={order.id} className='product'>
          <WrapperInformation>
            <div className='imgProduct'>
              <img src={order.imgProduct} alt="product" />
            </div>
            <div className='nameProduct'>
              <p>{order.nameProduct}</p>
            </div>
            <div className='amountProduct'>
                <div className='quantityProduct'>
                    <p>Số lượng:</p>
                    <p>{order.amount}</p>
                </div>
                <div className='originProduct'>
                    <p>Xuất xứ:</p>
                    <p>{order.origin}</p>
                </div>
            </div>
            <div className='totalMoney'>
              <p>Thành giá:</p>
              <p>{Number(order.totalMoney).toLocaleString('vi-VN')}VND</p>
            
            </div>
            <div className='condition'>
              <p>Trạng thái:</p>
              <p>{order.status}</p>
            </div> 
            
          </WrapperInformation>
          {
            order.condition === 'Chờ xác nhận' ? (
                <WrapperSelect>
                  <button onClick={() => {
                      const condition = "Hủy";
                      const idOrder = order.id
                      updateCondition(condition,idOrder)
                      }}>Hủy
                  </button>
                </WrapperSelect>
            ) : (
              <WrapperSelect>
                {order.condition === 'Đã giao' ? (
                    <>
                    <button onClick={() => {
                      const condition = "Xác nhận";
                      const idOrder = order.id
                      updateCondition(condition,idOrder)
                      }}>Xác nhận
                    </button>
                    <button onClick={() => {
                      const condition = "Hủy";
                      const idOrder = order.id
                      updateCondition(condition,idOrder)
                      }}>Hủy
                    </button>
                    </>
                ) : (
                  <button onClick={() => {
                    navigate('/cart');
                }}>
                    Mua lại
                </button>
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
