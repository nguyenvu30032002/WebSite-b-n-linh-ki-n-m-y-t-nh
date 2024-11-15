import React from 'react';
import { Wrapper, WrapperInformation, WrapperSelect, WrapperUser } from './style';
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
            
            <div className='informationProduct'>
              {/* <div className='condition'>
                <p>Trạng thái:</p>
                <p>{order.condition}</p>
              </div>  */}
              
              <div className='nameProduct'>
                <p>{order.nameProduct}</p>
              </div>
              {
                order.bill_of_lading_code !== null ? (
                  <div className='orderCode'>
                    <span>Mã vận đơn: </span>
                    <span>{order.bill_of_lading_code}</span>
                  </div>
                ) : null
              }
              <div className='amount'>
                <span>x <span style={{fontWeight: '500'}}>{order.amount}</span></span>
                <div className='price'>
                    <p className='newPrice'>1.500.000đ</p>
                    <p className='oldPrice'>1.700.000đ</p>
                </div>
              </div>
              <div className='totalMoney'>
                <p>Thành tiền: <span style={{color:'red', fontWeight:'500'}}>{Number(order.totalMoney).toLocaleString('vi-VN')}</span> VND(<span>{order.status}</span>)</p>
              </div>
            </div>
          </WrapperInformation>
          <WrapperUser>
                <div>
                  <p className='name'>Tới:<span>dsuifdsgfuafsssssssssafs</span></p>
                  <p>Số điện thoại:<span>004359334508477</span></p>
                </div>
                <p className='address'>Địa chỉ: <span> xom 3 thon lang trung xa trung an huyen vu thu tinh thai binh</span></p>
            </WrapperUser>
          {
            order.condition === 'Chờ xác nhận' ? (
                <WrapperSelect>
                  <button className='cancel' onClick={() => {
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
                    <button className='confirm' onClick={() => {
                      const condition = "Xác nhận";
                      const idOrder = order.id
                      const product_id = order.product_id
                      updateCondition(condition,idOrder,product_id)
                      }}>Xác nhận
                    </button>
                    <button className='cancel' onClick={() => {
                      const condition = "Hủy";
                      const idOrder = order.id
                      updateCondition(condition,idOrder)
                      }}>Hủy
                    </button>
                    </>
                ) : (
                  <button className=' acquisition' onClick={() => {
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
