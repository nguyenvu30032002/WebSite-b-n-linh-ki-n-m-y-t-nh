import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper, WrapperInformation, WrapperPaginate, WrapperSelect, WrapperUser } from './style';
import UserService from '../../services/UserService';
import { message, Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { setCart } from '../../store/Action';
// import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';


const OrderComponent = ({ selectedOrderStatus }) => {
  const {user, getOrder, updateCondition, userCart, getCart} = UserService();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentPageDetail, setCurrentPageDetail] = useState(1);
  const dispatch = useDispatch();
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
      const product_id = order.order_detail && order.order_detail.length > 0 
      ? order.order_detail.map(detail => detail.product_id) 
      : [];
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

const fetchCarts = useCallback(async() => {
    try {
      if (user) { 
        const dataCarts = await getCart(user.id);
        dispatch(setCart(dataCarts.length));
      }
    } catch (error) {
      throw error
    }
  }, [getCart, user, dispatch])

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  const handleAcquisition = (order) => {
    const data = order.order_detail.map((cart) => ({
      user_id: user.id,
      product_id: cart.product_id,
      amount: 1,
      variant: cart.variant
    }));
    userCart(data)
    .then((reponse) => {
     const data = reponse.data
     if(data){
      fetchCarts()
       message.success('Đã thêm vào giỏ hàng')
     }
     else{
      fetchCarts()
       message.error('Thêm vào giỏ hàng thất bại')
     }
    })
    .catch((error) => {
      fetchCarts()
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
    currentItems.map((order) => (
      <div key={order.id} className='product'>
        <WrapperInformation>
          {order.bill_of_lading_code !== null && (
            <div className='orderCode'>
              <span>Mã vận đơn: </span>
              <span>{order.bill_of_lading_code}</span>
            </div>
          )}
          <div className='informationProduct'>
           
            {order.order_detail.map((detail) => (
                <div className='orderDetail' key={detail.id}>
                  <div className='imgProduct'>
                    <img src={detail.created_by_product.image} alt="product" />
                  </div>
                  <div style={{flexDirection: 'column', margin: '0 0 0 10px'}}>
                    <div className='nameProduct'>
                      <p>{detail.created_by_product.name}</p>
                    </div>
                    <div className='amount'>
                      <span>
                        x <span style={{fontWeight: '500'}}>{detail.amount}</span> 
                        {detail.variant && <span style={{fontWeight: '400', margin: ' 0 0 0 5px'}}>({detail.variant})</span>}
                      </span>

                      {/* Kiểm tra và render giá trị cho variants */}
                      {detail.created_by_product.variants && detail.created_by_product.variants.length > 0 ? (
                        detail.created_by_product.variants.map((vsrt) => 
                          vsrt.name === detail.variant && (
                            <div className='price' key={vsrt.id}>
                              <p className='newPrice'>
                                {Number(vsrt.price - (vsrt.price * detail.created_by_product.discount) / 100).toLocaleString('vi-VN')}đ
                              </p>
                              {detail.created_by_product.discount !== 0 && (
                                <p className='oldPrice'>{Number(vsrt.price).toLocaleString('vi-VN')}đ</p>
                              )}
                            </div>
                          )
                        )
                      ) : (
                        <div className='price'>
                          <p className='newPrice'>
                            {Number(detail.created_by_product.price - (detail.created_by_product.price * detail.created_by_product.discount) / 100).toLocaleString('vi-VN')}đ
                          </p>
                          {detail.created_by_product.discount !== 0 && (
                            <p className='oldPrice'>{Number(detail.created_by_product.price).toLocaleString('vi-VN')}đ</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className='totalMoney'>
            <p>Thành tiền: 
              <span style={{color:'red', fontWeight:'500', margin:'0 0 0 5px'}}>
                {Number(order.totalMoney).toLocaleString('vi-VN')}
              </span>đ
              (<span>{order.status}</span>)
            </p>
          </div>
        </WrapperInformation>
        <WrapperUser>
          <div>
            <p className='name'>Tới:<span>{order.userName}</span></p>
            <p className='phone'>Số điện thoại:<span>{order.phone}</span></p>
          </div>
          <p className='address'>Địa chỉ: <span>{order.address}</span></p>
        </WrapperUser>

        {/* Các điều kiện xử lý trạng thái đơn hàng */}
        {order.condition === 'Chờ xác nhận' ? (
          <WrapperSelect>
            <button className='cancel' onClick={() => handleCondition("Hủy", order)}>Hủy</button>
          </WrapperSelect>
        ) : (
          <WrapperSelect>
            {order.condition === 'Đã giao' ? (
              <>
                <button className='confirm' onClick={() => handleCondition("Xác nhận", order)}>Xác nhận</button>
                <button className='cancel' onClick={() => handleCondition("Hủy", order)}>Hủy</button>
              </>
            ) : (
              <button className='acquisition' onClick={() => handleAcquisition(order)}>Mua lại</button>
            )}
          </WrapperSelect>
        )}
      </div>
    ))
  ) : (
    <p>Không có đơn hàng</p>
  )}

{filteredOrders.length > 0 && (
    <WrapperPaginate>
      <Pagination
        current={currentPage}
        total={filteredOrders.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
      />
    </WrapperPaginate>
  )}
</Wrapper>

  );
  
};


export default OrderComponent;
