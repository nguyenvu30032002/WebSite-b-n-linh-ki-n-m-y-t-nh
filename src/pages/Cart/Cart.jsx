import React, { useState, useEffect, useCallback } from 'react';
import { Wrapper, WrapperBody, WrapperCart, WrapperCheckAll, WrapperCheckBox, WrapperDeleteAll, WrapperHeader, WrapperPay } from './style';
import Header from '../../parts/Header/Header';
import Footer from '../../parts/Footer/Footer';
import { Button, Checkbox, InputNumber, message, Radio } from 'antd';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../services/UserService';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { setCart } from '../../store/Action';
import { useDispatch } from 'react-redux';



const Cart = () => {
  const {user, getCart, updateCart, orderCart, deleteCart} = UserService();
  const [checkedList, setCheckedList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCarts, setSelectedCarts] = useState([]);
  const [value, setValue] = useState(null);
  const [carts,  setCarts] = useState([]);
  const dispatch = useDispatch();

  const fetchCart = useCallback(async () => {
    if (user && user.id) {
      const data = await getCart(user.id);
      setCarts(data);
      dispatch(setCart(data.length));
    }
  }, [user, getCart,dispatch]); 
  
  useEffect(() => {
    if (user && user.id) { 
      fetchCart(); 
    }
  }, [fetchCart, user]);
   // Lưu trạng thái các sản phẩm đã chọn
  const cartOptions = carts.map((cart) => cart.id);
  const checkAll = carts.length > 0 && checkedList.length === cartOptions.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < cartOptions.length;

  // Tính tổng giá trị dựa trên sản phẩm được chọn và số lượng
  useEffect(() => {
    const total = carts
        .filter((cart) => checkedList.includes(cart.id))
        .reduce((sum, cart) => {
            let price = 0;

            // Nếu sản phẩm có variants
            if (cart.product.variants && cart.product.variants.length > 0) {
                const variant = cart.product.variants.find(
                    (v) => cart.product_id === v.product_id && cart.variant === v.name
                );
                if (variant) {
                    price = variant.price - (variant.price * cart.product.discount) / 100;
                }
            } else {
                // Nếu sản phẩm không có variants
                price = cart.product.price - (cart.product.price * cart.product.discount) / 100;
            }

            // Tổng cộng
            return sum + price * cart.amount;
        }, 0);

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
    .then((response) => {
      const data = response.data
      if(data.message === 'success' ){
        fetchCart()
        message.success("Cập nhật đơn hàng thành công")
      }
      else{
        fetchCart()
        message.error("Cập nhật đơn hàng thất bại")
      }
    })
    .catch((error) => {
      fetchCart()
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    })
  };

   // State lưu thông tin các sản phẩm đã chọn sau khi nhấn "Đặt hàng"
   useEffect(() => {
    const selected = carts
      .filter((cart) => checkedList.includes(cart.id)) // Lọc sản phẩm có trong checkedList
      .reduce(
        (acc, cart) => {
          acc.id_products.push(cart.product_id); // Gộp id_product
          acc.amounts.push(cart.amount); // Gộp số lượng
          acc.variants.push(cart.variant); // Gộp variant
          acc.id_carts.push(cart.id);
          return acc;
        },
        { id_products: [], amounts: [], variants: [] , id_carts: []} // Khởi tạo đối tượng với các mảng rỗng
      );
  
    setSelectedCarts(selected); // Lưu thông tin sản phẩm đã chọn
  }, [carts, checkedList]); // Chỉ chạy khi carts hoặc checkedList thay đổi
  // // Hàm xử lý khi nhấn nút "Đặt hàng"
  const handleOrder = () => {
    
    if(!(user.phone)) {
      message.error('Vui lòng thêm số điện thoại')
    }
    else if(!(user.address)){
      message.error('Vui lòng điền thêm địa chỉ nhận hàng')
    }
    else{
      const orders = {
        user_id: user.id,
        userName: user.name,
        address: user.address,
        phone: user.phone,
        status: value,
        product_id: selectedCarts.id_products,
        amount: selectedCarts.amounts,
        totalMoney: totalPrice,
        variant: selectedCarts.variants,
        id_cart: selectedCarts.id_carts,
         
      };
      orderCart(orders)
      .then((response) => {
        const data = response.data
        if(data.message === 'success'){
          setCheckedList([]);
          fetchCart()
          message.success('Đặt hàng thành công')
        }
        else{
          fetchCart()
          message.error('Đặt hàng thất bại')
        }
      })
      .catch((error) => {
        fetchCart()
        message.error('Có lỗi xảy ra, vui lòng thử lại!');
      })
    }
  };
  

  /////////////////////
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
      deleteCart(checkedList)
      .then((response) => {
        const data = response.data
        if(data.message === 'success'){
          setCheckedList([]);
          fetchCart()
          message.success('Xóa sản phẩm khỏi giỏ hàng thành công')
        }
        else{
          fetchCart()
          message.error('Xóa sản phẩm khỏi giỏ hàng thất bại')
        }
      })
      .catch((error) => {
        fetchCart()
        message.error('Có lỗi xảy ra, vui lòng thử lại!');

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
                  <img src={cart.product.image} alt={cart.product.name} />
                  <div className='nameP' style={{justifyContent: cart.product.variants && cart.product.variants.length > 0 ? 'space-around' : 'start' }}>
                    <p className="nameProduct" 
                    style={{
                      maxWidth: cart.product.variants && cart.product.variants.length > 0 ? '150px' : '210px',
                      margin: cart.product.variants && cart.product.variants.length > 0 ? '0' : ' 0 0 0 10px'
                      }}>
                      {cart.product.name}</p>
                    {
                      cart.product.variants && cart.product.variants.length > 0 && (
                        <span className='variantProduct'>{cart.variant}</span>
                      )
                    }
                  </div>
                  
                  <div>
                    <InputNumber
                      min={1}
                      max={99}
                      defaultValue={cart.amount}
                      onChange={(value) => handleAmountChange(cart.id, value)}
                    />
                  </div>
                  {
                    cart.product.variants && cart.product.variants.length > 0 ? (
                      (() => {
                        const variant = cart.product.variants.find(
                          (v) => cart.product_id === v.product_id && cart.variant === v.name
                        );
                        if (variant) {
                          return (
                            <p className="price">
                              {Number(((variant.price - (variant.price * cart.product.discount) / 100) * cart.amount)).toLocaleString('vi-VN')} đ
                            </p>
                          );
                        }
                      })()
                    ) : (
                      <p className="price">
                        {Number(((cart.product.price - (cart.product.price * cart.product.discount) / 100) * cart.amount)).toLocaleString('vi-VN')} đ
                      </p>
                    )
                  }
                  
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
            {checkedList.length > 0 && value === "Đã thanh toán" && (
              <div className='submitData'>
                <PayPalScriptProvider options={{ "client-id": "AfB9WXP0WczD-_mnfInE8yKoZf2Qy_BqrsB83l4O1AeW2iauLKLXNV29i0cNbTpZg_bQsd0V_sySxFnI" }}>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: { value:((totalPrice) / 23000).toFixed(2) }
                        }]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      try{
                        // const details = await actions.order.capture();
                        if(!(user.phone)) {
                          message.error('Vui lòng thêm số điện thoại')
                        }
                        else if(!(user.address)){
                          message.error('Vui lòng điền thêm địa chỉ nhận hàng')
                        }
                        else{
                          // const selectedCarts = carts.filter(cart => checkedList.includes(cart.id));
                          const orders = {
                            user_id: user.id,
                            userName: user.name,
                            address: user.address,
                            phone: user.phone,
                            status: value,
                            product_id: selectedCarts.id_products,
                            amount: selectedCarts.amounts,
                            totalMoney: totalPrice,
                            variant: selectedCarts.variants,
                            id_cart: selectedCarts.id_carts,
                          };
                          orderCart(orders)
                          .then((response) => {
                            const data = response.data
                            if(data.message === 'success'){
                              setCheckedList([]);
                              fetchCart()
                              message.success('Đặt hàng thành công')
                            }
                            else{
                              fetchCart()
                              message.error('Đặt hàng thất bại')
                            }
                          })
                          .catch((error) => {
                            fetchCart()
                            message.error('Có lỗi xảy ra, vui lòng thử lại!');
                          })
                          
                        }
                      }
                      catch(error){
                        message.error("Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.");
                      }
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </div>
        </WrapperPay>
      </WrapperBody>
      <Footer />
    </Wrapper>
  );
};

export default Cart;
