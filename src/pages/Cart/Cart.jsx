import React, { useState, useEffect } from 'react';
import { Wrapper, WrapperBody, WrapperCart, WrapperCheckAll, WrapperCheckBox, WrapperDeleteAll, WrapperHeader, WrapperPay } from './style';
import Header from '../../parts/Header/Header';
import Footer from '../../parts/Footer/Footer';
import { Button, Checkbox, InputNumber, message, Radio } from 'antd';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../services/UserService';
import AuthUser from '../../services/AuthUser';

const Cart = () => {
  const {carts, updateCart, orderCart, deleteCart} = UserService();
 
  const {user} = AuthUser()
  // Lưu trạng thái các sản phẩm đã chọn
  const [checkedList, setCheckedList] = useState([]);
  const cartOptions = carts.map((cart) => cart.id);
  const checkAll = carts.length > 0 && checkedList.length === cartOptions.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < cartOptions.length;

  const [totalPrice, setTotalPrice] = useState(0);


  // Tính tổng giá trị dựa trên sản phẩm được chọn và số lượng
  useEffect(() => {
    const total = carts
      .filter((cart) => checkedList.includes(cart.id))
      .reduce((sum, cart) => sum + cart.price * cart.amount, 0);

    setTotalPrice(total);
  }, [checkedList, carts]);

  // Xử lý khi thay đổi trạng thái checkbox từng sản phẩm
  const handleProductChange = (list) => {
    setCheckedList(list);
  };

  // Xử lý khi nhấn checkbox "Check all"
  const handleCheckAllChange = (e) => {
    // setCheckedList(e.target.checked ? cartOptions : []);
    const newCheckedList = e.target.checked ? cartOptions : [];
    setCheckedList(newCheckedList);
  };

  // // Xử lý khi số lượng thay đổi
  const handleAmountChange = (id, value) => {
    updateCart(id, Number(value))
  };

   // State lưu thông tin các sản phẩm đã chọn sau khi nhấn "Đặt hàng"
  const [selectedCarts, setSelectedCarts] = useState([]);
  useEffect(() => {
    const selected = carts
      .filter((cart) => checkedList.includes(cart.id)) // Lọc sản phẩm có trong checkedList
      .map((cart) => ({
        ...cart,
        quantity: cart.amount, // Thêm số lượng vào sản phẩm
        totalPrice: cart.price * cart.amount, // Tính tổng giá sản phẩm
      }));
    setSelectedCarts(selected); // Lưu thông tin sản phẩm đã chọn
  }, [carts, checkedList]); // Chỉ chạy khi carts hoặc checkedList thay đổi
  
  // // Hàm xử lý khi nhấn nút "Đặt hàng"
  const handleOrder = () => {
    
   
    if(user.phone === null) {
      message.error('Vui lòng thêm số điện thoại')
    }
    else if(value === null){
      message.error('Vui lòng chọn phương thức thanh toán')
    }
    else if(user.address === null){
      message.error('Vui lòng điền thêm địa chỉ nhận hàng')
    }
    else{
      // const selectedCarts = carts.filter(cart => checkedList.includes(cart.id));
      const orders = selectedCarts.map((cart) => ({
        user_id: user.id,
        userName: user.name,
        address: user.address,
        phone: user.phone,
        status: value,
        product_id: cart.product_id,
        imgProduct: cart.imgProduct,
        nameProduct: cart.nameProduct,
        amount: cart.amount,
        totalMoney: cart.totalPrice,
        origin: cart.origin,
        id_cart: cart.id
      }));
      orderCart(orders).then(() => {
        // Reset checkedList và thông báo thành công
        setCheckedList([]);
      })
    }
  };
  

  /////////////////////
  const [value, setValue] = useState(null);
    const handleRadioChange = (e) => {
      setValue(e.target.value); // Cập nhật giá trị khi chọn radio
    };

    const handleCheckbox = (e) => {
      const checkedId = Number(e.target.value); // Chuyển đổi ID thành số
      const newCheckedList = e.target.checked 
        ? [...checkedList, checkedId] // Thêm ID vào danh sách nếu checkbox được chọn
        : checkedList.filter(id => id !== checkedId); // Xóa ID khỏi danh sách nếu checkbox không còn được chọn

      setCheckedList(newCheckedList); // Cập nhật trạng thái checkedLis
    };

    const handleDelete = () => {
      deleteCart(checkedList).then(() => {
        // Reset checkedList và thông báo thành công
        setCheckedList([]);
      })
    }

  return (
    <Wrapper>
      <WrapperHeader>
        <Header />
      </WrapperHeader>
      <WrapperBody>
        <WrapperCart>
         
          <WrapperCheckAll
            indeterminate={indeterminate}
            onChange={handleCheckAllChange}
            checked={checkAll}
          >
            Chọn tất cả ({checkedList.length} sản phẩm)
          </WrapperCheckAll>
          {checkedList.length > 0 && (
            <WrapperDeleteAll onClick={handleDelete} icon={faTrash} />
          )}
          <WrapperCheckBox value={checkedList} onChange={handleProductChange}>
            {carts.map((cart) => (
              <div className="Order" key={cart.id}>
                <Checkbox onClick={handleCheckbox} value={cart.id} />
                <div className="informationOrder">
                  <img src={cart.imgProduct} alt={cart.nameProduct} />
                  <p className="nameProduct">{cart.nameProduct}</p>
                  <div>
                    <InputNumber
                      min={1}
                      max={99}
                      defaultValue={cart.amount}
                      onChange={(value) => handleAmountChange(cart.id, value)}
                    />
                  </div>
                  <p className="price">
                    {Number(cart.price * cart.amount).toLocaleString('vi-VN')} đ
                  </p>
                </div>
              </div>
            ))}
          </WrapperCheckBox>
        </WrapperCart>
        <WrapperPay>
          <div className="address">
            <p>Giao tới:</p>
            {user.address !== null ? (
              <p>{user.address}</p>
            ) : (
              <a href="/information">Thay đổi</a>
            )}
          </div>
          <div className="phone">
            <p>Số điện thoại:</p>
            {user.phone !== null ? (
              <p>{user.phone}</p>
            ) : (
              <a href="/information">Thay đổi</a>
            )}
          </div>
          <div className='nameUser'>
            <p>{user.name}</p>
          </div>
          <div className='totalAmount'>
            <p>Thành tiền:</p>
            <p> {totalPrice.toLocaleString('vi-VN')} đ</p>
          </div>
          <div className='VAT'>
            <p>(Đã bao gồm VAT nếu có)</p>
          </div>
          <div className='select'>
          {checkedList.length > 0 && (
             <Radio.Group onChange={handleRadioChange} value={value}>
              <Radio value="Chưa thanh toán">Thanh toán bằng tiền mặt</Radio>
              <Radio value="Đã thanh toán">Thanh toán bằng tài khoản ngân hàng</Radio>
             </Radio.Group>
            )}
          </div>
          <div className='submitData'>
            {checkedList.length > 0 && value === "Chưa thanh toán" && (
              <Button type="primary" onClick={handleOrder}>Đặt hàng</Button>
            )}
           
          </div>
        </WrapperPay>
      </WrapperBody>
      <Footer />
    </Wrapper>
  );
};

export default Cart;
