import React, { useState } from 'react';
import { Wrapper, WrapperBody, WrapperCart, WrapperHeader, WrapperPay } from './style';
import Header from '../../parts/Header/Header';
import Footer from '../../parts/Footer/Footer';
import { Checkbox } from 'antd';
import img from '../../assets/images/avatar/logo192.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const [amount, setAmount] = useState(1);
  const [orderChecked, setOrderChecked] = useState([false, false]); // Trạng thái của 2 checkbox trong Order
  const [selectAll, setSelectAll] = useState(false); // Trạng thái của checkbox "Chọn tất cả"

  const handlePlus = () => {
    setAmount((prev) => prev + 1);
  };

  const handleMinus = () => {
    if (amount > 1) setAmount((prev) => prev - 1);
  };
////////////////////////////////////////////////////////////////////
  const handleOrderCheckboxChange = (index) => {
    const newOrderChecked = [...orderChecked];
    newOrderChecked[index] = !newOrderChecked[index]; // Đảo trạng thái checkbox tại vị trí index
    setOrderChecked(newOrderChecked);

    // Cập nhật trạng thái của checkbox "Chọn tất cả"
    if (newOrderChecked.every((checked) => checked)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setOrderChecked([checked, checked]); // Chọn hoặc bỏ chọn tất cả các checkbox trong Order
  };

  return (
    <Wrapper>
      <WrapperHeader>
        <Header />
      </WrapperHeader>
      <WrapperBody>
        <WrapperCart>
          <div className="checkbox">
            <Checkbox checked={selectAll} onChange={handleSelectAllChange}>
              Chọn tất cả
            </Checkbox>
          </div>
          <div className="cart">
            {/* Order 1 */}
            <div className="Order">
              <Checkbox checked={orderChecked[0]} onChange={() => handleOrderCheckboxChange(0)} />
              <div className="informationOrder">
                <img src={img} alt="" />
                <p>asdjidjdasd</p>
                <div className="amount">
                  <button disabled={amount <= 1} onClick={handleMinus}>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <div>{amount}</div>
                  <button disabled={amount >= 99} onClick={handlePlus}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <p className="price">{(1000000).toLocaleString('vi-VN')} VND</p>
              </div>
            </div>

            {/* Order 2 */}
            <div className="Order">
              <Checkbox checked={orderChecked[1]} onChange={() => handleOrderCheckboxChange(1)} />
              <div className="informationOrder">
                <img src={img} alt="" />
                <p>asdjidjdasd</p>
                <div className="amount">
                  <button disabled={amount <= 1} onClick={handleMinus}>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <div>{amount}</div>
                  <button disabled={amount >= 99} onClick={handlePlus}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <p className="price">{(1000000).toLocaleString('vi-VN')} VND</p>
              </div>
            </div>
          </div>
        </WrapperCart>
        <WrapperPay></WrapperPay>
      </WrapperBody>
      <Footer />
    </Wrapper>
  );
};

export default Cart;
