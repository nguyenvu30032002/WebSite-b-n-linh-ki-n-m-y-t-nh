import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper, WrapperInformation, WrapperPaginate, WrapperSelect, WrapperUser } from './style';
import UserService from '../../services/UserService';
import { message, Pagination } from 'antd';

const OrderComponent = ({ selectedOrderStatus }) => {
  const {user, getOrder, updateCondition, userCart} = UserService();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = useCallback(async() => {
    try{
      const data = await getOrder(user.id)
      setOrders(data)
    }catch(error){
      throw error
    }
  }, [getOrder, user.id])

  useEffect(() => {
    if(user){
      fetchOrders()
    }
  }, [fetchOrders, user])

  ///////////////////////////////////////////////////////////

  const handleCondition = (condition, order) => {
    if(condition === 'Xác nhận'){
      console.log(condition)
      const idOrder = order.id
      const product_id = order.product_id
      updateCondition(condition,idOrder,product_id)
      .then((response) => {
        const data = response.data;
        if(data.message === 'success'){
          fetchOrders()
          message.success("Xác nhận thành công")
        }
        else{
          fetchOrders()
          message.error("Lỗi xác nhận")
        }
      })
      .catch((error) => {
        message.error('Có lỗi xảy ra, vui lòng thử lại!');
      })
    }
    else{
      const idOrder = order.id
      updateCondition(condition,idOrder)
      .then((response) => {
        const data = response.data;
        if(data.message === 'success'){
          fetchOrders()
          message.success("Hủy thành công")
        }
        else{
          fetchOrders()
          message.error("Lỗi xác nhận")
        }
      })
      .catch((error) => {
        message.error('Có lỗi xảy ra, vui lòng thử lại!');
      })
    }
  }

  ////////////////////////////////////////////////////////

  const handleAcquisition = (order) => {
    const data =
    {
     user_id: user.id,
     userName: user.name,
     address: user.address,
     phone: user.phone,
     product_id: order.product_id,
     imgProduct: order.imgProduct,
     nameProduct: order.nameProduct,
     amount: 1,
     newPrice: ((order.price) - (order.price * (order.discount / 100))),
     oldPrice: order.price,
     discount: order.discount
    };
    userCart(data)
    .then((reponse) => {
     const data = reponse.data
     if(data){
       message.success('Đã thêm vào giỏ hàng')
     }
     else{
       message.error('Thêm vào giỏ hàng thất bại')
     }
    })
    .catch((error) => {
     message.error('Có lỗi xảy ra, vui lòng thử lại!');
   })

  }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

  // Lọc đơn hàng theo trạng thái đã chọn
  const filteredOrders = orders.filter(order => order.condition === selectedOrderStatus);

  ///////////////////////////////////////////////////////////////////////////////

  // Trạng thái trang hiện tại và số sản phẩm hiển thị trên mỗi trang
    const itemsPerPage = 2;
    // Tính toán các sản phẩm hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    // Hàm xử lý sự kiện thay đổi trang
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    useEffect(() => {
      setCurrentPage(1);
    }, [selectedOrderStatus]);

  return (
    <Wrapper>
      {currentItems.length > 0 ? (
    currentItems.map((order, index) => (
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
                    <p className='newPrice'>{Number(order.totalMoney).toLocaleString('vi-VN')}đ</p>
                    {
                      order.discount !== 0 && (
                        <p className='oldPrice'>{(Number(order.price)*(order.amount)).toLocaleString('vi-VN')}đ</p>
                      )
                    }
                </div>
              </div>
              <div className='totalMoney'>
                <p>Thành tiền: <span style={{color:'red', fontWeight:'500'}}>{Number(order.totalMoney).toLocaleString('vi-VN')}</span>đ(<span>{order.status}</span>)</p>
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
                  <button className='cancel'onClick={() => handleCondition("Hủy", order)}>Hủy</button>
                </WrapperSelect>
            ) : (
              <WrapperSelect>
                {order.condition === 'Đã giao' ? (
                    <>
                    <button className='confirm' onClick={() => handleCondition("Xác nhận", order)}>Xác nhận</button>
                    <button className='cancel' onClick={() => handleCondition("Hủy", order)}>Hủy</button>
                    </>
                ) : (
                  <button className=' acquisition' onClick={() => handleAcquisition(order)}>
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
  {
    filteredOrders.length > 0 ? (
        <WrapperPaginate>
          <Pagination
            current={currentPage}
            total={filteredOrders.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </WrapperPaginate>
    ) : null
  }
        
    </Wrapper>
  );
};


export default OrderComponent;
