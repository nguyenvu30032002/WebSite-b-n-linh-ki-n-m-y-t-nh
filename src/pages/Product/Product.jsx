import React, { useState } from 'react'
import Header from "../../parts/Header/Header";
import { Wrapper, WrapperAmount, WrapperBody, WrapperCarousel, WrapperHeader, WrapperImg, WrapperModal, WrapperOrder, WrapperOrigin, WrapperPrice, WrapperProduct, WrapperProductInformation, WrapperProductName, WrapperVariants } from "./style";
import Footer from "../../parts/Footer/Footer";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Radio} from 'antd';


const Product = () => {
    const  location = useLocation();
    const product = location.state?.product;
    // console.log("dsfsd: " ,product)
    
    const [amount, setAmount] = useState(1)
    const handlePlus = () =>{
        setAmount(() => amount + 1)
    }
    const handleMinus = () =>{
      setAmount(() => amount - 1)
    }
/////////////////////////////////////////////////////////////////////////////
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };

  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
////////////////////////////////////////////////////////////////////////////////

    const [value, setValue] = useState("");
    const handleRadioChange = (e) => {
      setValue(e.target.value); // Cập nhật giá trị khi chọn radio
    };
    const handleOk = (e) => {
      console.log('radio checked', value);
      setIsModalOpen(false);
    };
  return (
    <Wrapper>
            <WrapperHeader>
                <Header/>
            </WrapperHeader>
            <WrapperBody>
              <WrapperProductInformation key={product.id}>
                  <WrapperImg>
                    <WrapperCarousel arrows infinite={false}>
                      <div>
                        <img src={product.img} alt="imgProduct" />
                      </div>
                      <div>
                      <img src={product.img} alt="imgProduct" />
                      </div>
                    </WrapperCarousel>
                    </WrapperImg>
                    <WrapperProduct>
                      <WrapperProductName>
                         <p>
                            {product.name}
                         </p>
                      </WrapperProductName>
                      
                      {
                        product.id && product.variants === true ? (
                          <WrapperVariants>
                          <Button>8gb</Button>
                          <Button>16gb</Button>
                          <Button>32gb</Button>
                        </WrapperVariants>
                        ) : null
                      }
                      <WrapperOrigin>
                        <div className='originProduct'>
                          <p>Nguồn gốc:</p>
                          <p>USA</p>
                        </div>
                        <div className='brandProduct'>
                          <p>Thương hiệu:</p>
                          <p>Asus</p>
                        </div>
                      </WrapperOrigin>
                      <WrapperPrice>
                      <div className='oldPrice'>
                        <p>{product.oldPrice.toLocaleString('vi-VN')}</p>
                        <p>đ</p>
                      </div>
                      <div className='arrow'>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
                      <div className='newPrice'>
                        <p>{product.newPrice.toLocaleString('vi-VN')}</p>
                        <p>đ</p>
                      </div>
                      </WrapperPrice>

                        <WrapperAmount>
                          <p>Số lượng:</p>
                          {
                            amount > 1 ? (
                              <button onClick={handleMinus}><FontAwesomeIcon icon={faMinus} /></button>
                            ) : (
                              <button disabled onClick={handleMinus}><FontAwesomeIcon icon={faMinus} /></button>
                            )
                          }
                          <div>{amount}</div>
                          {
                            amount < 99 ? (
                              <button onClick={handlePlus}><FontAwesomeIcon icon={faPlus} /></button>
                            ) : (
                              <button disabled onClick={handlePlus}><FontAwesomeIcon icon={faPlus} /></button>
                            )
                          }
                        </WrapperAmount>
                        <WrapperOrder>
                          <Button className='OrderProduct' type="primary" onClick={showModal} >Đặt hàng</Button>
                          <Button className='cartProduct' type="primary" danger><FontAwesomeIcon icon={faCartShopping} /></Button>
                        </WrapperOrder>
                  </WrapperProduct>
              </WrapperProductInformation>
            </WrapperBody>
            <Footer/>
            <WrapperModal title="Thông tin đơn hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Mua"  
            footer={[
              <Button key="ok" type="primary" onClick={handleOk}>
                Mua
              </Button>,
              <Button key="cancel" onClick={handleCancel}>
                Hủy
              </Button>,
            ]}>
              <div className='Orders' key={product.id}>
                <img src={product.img} alt="" />
                <p>{product.name}</p>
                <p>x {amount}</p>
                {
                  product.id && product.variants === true ? (
                    <p>{product.variants}</p>
                  ) : null
                }
                <p>{(product.newPrice * amount).toLocaleString('vi-VN')} đ</p>
              </div>
              <div className='information'>
                <div>
                  <p>Tới: NGUYEN ANH VU</p>
                  <div className='address'>
                    <p>Địa chỉ:</p>
                    <p>Ha Noi</p>
                  </div>
                </div>
                <p>Số điện thoại: 00124931493</p>
              </div>
              <Radio.Group onChange={handleRadioChange} value={value}>
                <Radio value="Chưa thanh toán">Thanh toán bằng tiền mặt</Radio>
                <Radio value="Đã thanh toán">Thanh toán bằng tài khoản ngân hàng</Radio>
              </Radio.Group>
            </WrapperModal>
        </Wrapper>
        
  )
}

export default Product