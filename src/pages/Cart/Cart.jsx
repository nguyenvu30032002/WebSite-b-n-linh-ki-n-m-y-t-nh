import React, { useState, useEffect } from 'react';
import { Wrapper, WrapperBody, WrapperCart, WrapperCheckAll, WrapperCheckBox, WrapperDelete, WrapperDeleteAll, WrapperHeader, WrapperPay } from './style';
import Header from '../../parts/Header/Header';
import Footer from '../../parts/Footer/Footer';
import { Button, Checkbox, InputNumber, Radio } from 'antd';
import img from '../../assets/images/avatar/logo192.png';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const products = [
    { id: 1, name: 'Apple', price: 99000000, img: img },
    { id: 2, name: 'Pear', price: 2000000, img: img },
    { id: 3, name: 'Orange', price: 1500000, img: img },
    { id: 4, name: 'Orange', price: 1500000, img: img },
    { id: 5, name: 'Orange', price: 1500000, img: img },
    { id: 6, name: 'Orange', price: 1500000, img: img },
    { id: 7, name: 'Orange', price: 1500000, img: img },
    { id: 8, name: 'Orange', price: 1500000, img: img },
  ];

  // Lưu trạng thái các sản phẩm đã chọn
  const [checkedList, setCheckedList] = useState([]);
  const productOptions = products.map((product) => product.id.toString());
  const checkAll = checkedList.length === productOptions.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < productOptions.length;

  // Lưu trữ số lượng sản phẩm
  const [amounts, setAmounts] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; // Mặc định số lượng mỗi sản phẩm là 1
      return acc;
    }, {})
  );

  // State for total price
  const [totalPrice, setTotalPrice] = useState(0);

  // Tính tổng giá trị dựa trên sản phẩm được chọn và số lượng
  useEffect(() => {
    const total = products
      .filter((product) => checkedList.includes(product.id.toString()))
      .reduce((sum, product) => sum + product.price * amounts[product.id], 0);

    setTotalPrice(total);
  }, [checkedList, amounts]);

  // Xử lý khi thay đổi trạng thái checkbox từng sản phẩm
  const handleProductChange = (list) => {
    setCheckedList(list);
  };

  // Xử lý khi nhấn checkbox "Check all"
  const handleCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? productOptions : []);
  };

  // Xử lý khi số lượng thay đổi
  const handleAmountChange = (id, value) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: value, // Cập nhật số lượng cho sản phẩm tương ứng
    }));
  };

   // State lưu thông tin các sản phẩm đã chọn sau khi nhấn "Đặt hàng"
   const [selectedProducts, setSelectedProducts] = useState([]);
  // Hàm xử lý khi nhấn nút "Đặt hàng"
  const handleOrder = () => {
    const selected = products.filter((product) =>
      checkedList.includes(product.id.toString()) // Lọc sản phẩm có trong checkedList
    ).map((product) => ({
      ...product,
      quantity: amounts[product.id], // Thêm số lượng vào sản phẩm
      totalPrice: product.price * amounts[product.id], // Tính tổng giá sản phẩm
    }));

    setSelectedProducts(selected); // Lưu thông tin sản phẩm đã chọn
    console.log('radio checked', value);
    console.log(selected); // Hiển thị sản phẩm đã chọn lên console
  };

  /////////////////////
  const [value, setValue] = useState("");
    const handleRadioChange = (e) => {
      setValue(e.target.value); // Cập nhật giá trị khi chọn radio
    };

  const address = "Thai Binh";

  return (
    <Wrapper>
      <WrapperHeader>
        <Header />
      </WrapperHeader>
      <WrapperBody>
        <WrapperCart>
          {/* Checkbox "Check all" */}
          <WrapperCheckAll
            indeterminate={indeterminate}
            onChange={handleCheckAllChange}
            checked={checkAll}
          >
            Chọn tất cả ({checkedList.length} sản phẩm)
          </WrapperCheckAll>
          <WrapperDeleteAll icon={faTrash} />
          {/* Checkbox Group cho danh sách sản phẩm */}
          <WrapperCheckBox value={checkedList} onChange={handleProductChange}>
            {products.map((product) => (
              <div className="Order" key={product.id}>
                <Checkbox value={product.id.toString()} />
                <div className="informationOrder">
                  <img src={product.img} alt={product.name} />
                  <p className="nameProduct">{product.name}</p>
                  <div>
                    {/* Truyền hàm handleAmountChange vào InputNumber */}
                    <InputNumber
                      min={1}
                      max={99}
                      defaultValue={amounts[product.id]}
                      onChange={(value) => handleAmountChange(product.id, value)}
                    />
                  </div>
                  {/* Tính tổng giá trị (giá x số lượng) */}
                  <p className="price">
                    {(product.price * amounts[product.id]).toLocaleString('vi-VN')} đ
                  </p>
                </div>
                <WrapperDelete icon={faTrash} value={product.id.toString()} />
              </div>
            ))}
          </WrapperCheckBox>
        </WrapperCart>
        <WrapperPay>
          <div className="address">
            <p>Giao tới:</p>
            {address !== null ? (
              <p>{address}</p>
            ) : (
              <a href="/information">Thay đổi</a>
            )}
          </div>
          <div className='nameUser'>
            <p>Nguyen ANh Vu</p>
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
            {checkedList.length > 0 && (
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
