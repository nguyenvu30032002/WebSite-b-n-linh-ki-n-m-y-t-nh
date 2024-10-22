import React, { useState } from 'react'
import Header from "../../parts/Header/Header";
import { Wrapper, WrapperAmount, WrapperBody, WrapperCarousel, WrapperDescription, WrapperHeader, WrapperImg, WrapperModal, WrapperOrder, WrapperOrigin, WrapperPrice, WrapperProduct, WrapperProductInformation, WrapperProductName, WrapperVariants } from "./style";
import Footer from "../../parts/Footer/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, message, Radio} from 'antd';
import AuthUser from '../../services/AuthUser';
import UserService from '../../services/UserService';


const Product = () => {
    const location = useLocation();
    const product = location.state?.product;
    const {getUser} = AuthUser();
    const [amount, setAmount] = useState(1)
    const navigate = useNavigate(); 
    const { userOrder, userCart} = UserService();


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

    const [valueRadio, setValueRadio] = useState("");
    const handleRadioChange = (e) => {
      setValueRadio(e.target.value); // Cập nhật giá trị khi chọn radio
    };
    const handleOk = (e) => {
      const data =
       {
        user_id: getUser().id,
        userName: getUser().name,
        address: getUser().address,
        phone: getUser().phone,
        status: valueRadio,
        product_id: product.id,
        imgProduct: product.image,
        nameProduct: product.name,
        amount: amount,
        totalMoney: ((product.price) - (product.price * (product.discount / 100)))*amount,
        origin: product.origin,
       };

      if(getUser().address === null){
        message.error('Vui lòng điền địa chỉ nhận hàng')
        setIsModalOpen(true);
      }
      else if(!valueRadio){
        message.error('Vui lòng chọn phương thức thanh toán');
        setIsModalOpen(true);
      }
      else if(getUser().phone === null){
        message.error('Vui lòng thêm số điện thoại');
        setIsModalOpen(true);
      }
      else{
        userOrder(data);
        setIsModalOpen(false);
      }
    };

    const handleCart = () => {
      const data =
       {
        user_id: getUser().id,
        userName: getUser().name,
        address: getUser().address,
        phone: getUser().phone,
        product_id: product.id,
        imgProduct: product.image,
        nameProduct: product.name,
        amount: amount,
        price: ((product.price) - (product.price * (product.discount / 100))),
        origin: product.origin,
       };
       
       userCart(data)

    }

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
                      <img src={`http://localhost:3000/${product.image}`} alt={product.name} />
                      {/* <img src={product.image} alt={product.name} onError={() => console.error('Error loading image')} /> */}
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
                      {
                        product.description !== null ? (
                          <WrapperDescription>
                            {product.description}
                          </WrapperDescription>
                        ) : (
                          null
                        )
                      }
                      <WrapperOrigin>
                        <div className='originProduct'>
                          <p>Nguồn gốc:</p>
                          <p>{product.origin}</p>
                        </div>
                        <div className='brandProduct'>
                          <p>Thương hiệu:</p>
                          <p>{product.brand}</p>
                        </div>
                      </WrapperOrigin>
                      <WrapperPrice>
                      
                      {
                        product.discount ===0 ? (
                          <div className='newPrice'>
                            <p>{Number((product.price) - (product.price * (product.discount / 100))).toLocaleString('vi-VN')}</p>
                            <p>đ</p>
                          </div>
                        ) : (
                        <>
                        <div className='oldPrice'>
                          <p>{Number(product.price).toLocaleString('vi-VN')}</p>
                          <p>đ</p>
                        </div>
                        <div className='arrow'>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                        <div className='newPrice'>
                          <p>{Number((product.price) - (product.price * (product.discount / 100))).toLocaleString('vi-VN')}</p>
                          <p>đ</p>
                        </div>
                        </>
                        )
                      }
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
                          <Button className='cartProduct' type="primary" danger><FontAwesomeIcon icon={faCartShopping} onClick={handleCart}/></Button>
                        </WrapperOrder>
                  </WrapperProduct>
              </WrapperProductInformation>
            </WrapperBody>
            <Footer/>
            <WrapperModal title="Thông tin đơn hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Mua"  
            footer={[
                valueRadio === "Chưa thanh toán" && (
                  <Button key="ok" type="primary" onClick={handleOk}>
                    Mua
                  </Button>
                ),
              <Button key="cancel" onClick={handleCancel}>
                Hủy
              </Button>,
            ]}>
              
              <div className='Orders' key={product.id}>
              <img src={`http://localhost:3000/${product.image}`} alt={product.name} />
                <p className='name'>{product.name}</p>
                <p>x {amount}</p>
                {
                  product.id && product.variants === true ? (
                    <p>{product.variants}</p>
                  ) : null
                }
                <p>{(Number((product.price) - (product.price * (product.discount / 100)))*amount).toLocaleString('vi-VN')} đ</p>
              </div>
              <div className='information'>
                <div>
                  <p>Tới: {getUser().name}</p>
                  <div className='address'>
                    <p>Địa chỉ:</p>
                    {
                      getUser().address !== null ? (
                        <p>{getUser().address}</p>
                      ) : (
                        <p style={{color: '#1677ff', cursor: 'pointer'}} onClick={() => navigate('/information')}>Thay dổi</p>
                      )
                    }
                  </div>
                </div>
                <div className='phone'>
                <p>Số điện thoại: </p>
                <div>
                  {
                      getUser().phone !== null ? (
                        <p>{getUser().phone}</p>
                      ) : (
                        <p style={{color: '#1677ff', cursor: 'pointer'}} onClick={() => navigate('/information')}>Thay dổi</p>
                      )
                    }</div>
                </div>
              </div>
              <Radio.Group onChange={handleRadioChange} value={valueRadio}>
                <Radio value="Chưa thanh toán">Thanh toán bằng tiền mặt</Radio>
                <Radio value="Đã thanh toán">Thanh toán bằng tài khoản ngân hàng</Radio>
              </Radio.Group>
              <div className='paypal'>
              
              </div>
            </WrapperModal>
        </Wrapper>
        
  )
}

export default Product