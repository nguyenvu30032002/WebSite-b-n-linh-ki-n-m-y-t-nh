import styled from "styled-components"
import { Carousel } from 'antd';

export const Wrapper = styled.div`
   width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
    margin: 0 auto; // Căn giữa theo chiều ngang
`


export const WrapperHeader = styled.div`
  width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
  margin: 0 auto; // Căn giữa theo chiều ngang
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
`

export const WrapperBody = styled.div`
    width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
    margin: 0 auto; // Căn giữa theo chiều ngang
    display: flex;
    height: 600px;
    justify-content: center;
`

export const WrapperProductInformation = styled.div`
    width: 1230px;
    height: 100%;
    display: flex;
    justify-content: center;
`

export const WrapperImg = styled.div`
    width: 450px;
    height: 100%;
`

export const WrapperCarousel = styled(Carousel)`
    margin: 30px 0 0 0;
    & img{
        margin: 20px 25px 20px 35px;
        height: 250px;
        width: 380px;
        line-height: 160px;
        text-align: center;
    }

    & .slick-arrow {
        color: #000;
    }
`


export const WrapperProduct = styled.div`
    width: 600px;
    height: 100%;
    background-color: blue;
`