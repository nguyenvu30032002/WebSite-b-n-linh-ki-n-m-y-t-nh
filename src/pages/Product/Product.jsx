import React from 'react'
import Header from "../../parts/Header/Header";
import { Wrapper, WrapperBody, WrapperCarousel, WrapperHeader, WrapperImg, WrapperProduct, WrapperProductInformation } from "./style";
import Footer from "../../parts/Footer/Footer";
import { useLocation } from 'react-router-dom';


const Product = () => {
    const  location = useLocation();
    const product = location.state?.product;
    console.log("dsfsd: " ,product)

    if (!product) {
        return <p>Không có sản phẩm nào được chọn.</p>;
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

                  </WrapperProduct>
              </WrapperProductInformation>
            </WrapperBody>
            <Footer/>
        </Wrapper>
  )
}

export default Product