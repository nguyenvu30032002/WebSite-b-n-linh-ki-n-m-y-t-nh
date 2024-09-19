import React, { useState } from 'react'
import Header from "../../parts/Header/Header";
import { Wrapper, WrapperAmount, WrapperBody, WrapperCarousel, WrapperHeader, WrapperImg, WrapperOrder, WrapperOrigin, WrapperPrice, WrapperProduct, WrapperProductInformation, WrapperProductName, WrapperVariants } from "./style";
import Footer from "../../parts/Footer/Footer";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';


const Product = () => {
    const  location = useLocation();
    const product = location.state?.product;
    console.log("dsfsd: " ,product)
    
    const [amount, setAmount] = useState(1)
    const handlePlus = () =>{
        setAmount(() => amount + 1)
    }
    const handleMius = () =>{
      setAmount(() => amount - 1)
    }
  return (
    <Wrapper>
            <WrapperHeader>
                <Header/>
            </WrapperHeader>
            <WrapperBody>
              <WrapperProductInformation>
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
                        product.variants = true ? (
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
                        <p>{product.oldPrice}</p>
                        <p>đ</p>
                      </div>
                      <div className='arrow'>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
                      <div className='newPrice'>
                        <p>{product.newPrice}</p>
                        <p>đ</p>
                      </div>
                      </WrapperPrice>

                        <WrapperAmount>
                          <p>Số lượng:</p>
                          {
                            amount > 1 ? (
                              <button onClick={handleMius}><FontAwesomeIcon icon={faMinus} /></button>
                            ) : (
                              <button disabled onClick={handleMius}><FontAwesomeIcon icon={faMinus} /></button>
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
                          <Button className='OrderProduct' type="primary" >Đặt hàng</Button>
                          <Button className='cartProduct' type="primary" danger><FontAwesomeIcon icon={faCartShopping} /></Button>
                        </WrapperOrder>
                  </WrapperProduct>
              </WrapperProductInformation>
            </WrapperBody>
            <Footer/>
        </Wrapper>
  )
}

export default Product