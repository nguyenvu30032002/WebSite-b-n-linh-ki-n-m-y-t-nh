import styled from "styled-components"
import { Carousel, Modal } from 'antd';

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
`

export const WrapperCarousel = styled(Carousel)`
    margin: 30px 0 0 0;
    border-right: 1px solid #000;
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
`

export const WrapperProductName = styled.div`
    width: 100%;
    margin: 30px 0 -10px 0;
    & p{
        font-size: 30px;
        text-align: start;
        overflow-wrap: break-word;
        white-space: normal;
        text-transform: capitalize;
        font-weight: 500;
        padding-left: 15px ;
    }
`

export const WrapperVariants = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    & button{
        width: 50px;
        height: 30px;
        border-radius: 0;
        margin: 0 5px 0 15px;
        font-weight: 500;
    }
`

export const WrapperOrigin = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
    margin: 0 0 15px 0;
    & .originProduct{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0 0 0 15px;
        & p:first-child{
            margin-right: 10px;
            font-weight: 500;
        }
    }

    & .brandProduct{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0 0 0 15px;
        & p:first-child{
            margin-right: 10px;
            font-weight: 500;
        }
    }
`

export const WrapperPrice = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 0 0 30px 0;
    & .newPrice{
        width: 40%;
        height: 50px;
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 0 0 0 15px;
        font-size: 40px;
        &  p:first-child{
            color: #d70018;
            font-weight: 500;
            margin-right: 2px;
        }
        &  p:last-child{
            color: #d70018;
            font-size: 15px;
            font-weight: 500;
        }
    }

    & .arrow{
        width: 7%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        
    }
    & .oldPrice{
        width:  40%;
        height: 50px;
        display: flex;
        justify-content: start;
        align-items: center;
        border-left: 1px solid #ccc ;
        padding: 0 0 0 15px;
        font-size: 40px;
        &  p:first-child{
            color: #ccc;
            font-weight: 500;
            margin-right: 2px;
            text-decoration: line-through;
        }
        &  p:last-child{
            color: #ccc;
            font-size: 15px;
            font-weight: 500;
           
        }
    }
`

export const WrapperAmount = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    & p{
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 30px 0 15px;
        font-weight: 500;

    }

    & button{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #ccc;
    }

    & div{
        width: 70px;
        height: 30px;   
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px 0 5px;
        border: 1px solid #ccc;
    }
    & button:focus {
    border-color: #ccc; /* Thay đổi màu viền khi nhấn giữ vào button */
}
`
export const WrapperOrder = styled.div`
    width: 100%;
    height: 70px;
    /* background-color: green; */
    display: flex;
    align-items: center;
    margin: 25px 0 0 25px;
    & .OrderProduct{
        width: 150px;
        height: 50px;
        margin: 0 20px 0 0;
        
}

    & .cartProduct{

    }

    & button:focus {
        border-color: #ccc;
    }
`

export const WrapperModal = styled(Modal)`
    width: 800px !important;
    height: 500px !important;
    & .ant-modal-content{
        width: 100%;
        height: 100%;
        & .Orders {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 30px 0 30px 0;
            /* border: 1px solid #ccc; */
            & img{
            width: 50px;
            height: 50px;
            }
        }
        & .information{
            border-top: 1px solid #ccc ;
            & div{
                display: flex;
               & .address{
                margin: 0 0 0 100px;
                & p:last-child{
                    padding-left: 10px;
                }
               }
            }
        }
    }

`

export const WrapperDescription = styled.div`
    width: 100%;
    max-height: 200px;
    float: left;
    text-align: justify;
    font-size: 20px;
    padding-left: 15px;
    line-height: 1.5;
    overflow-y: auto; /* Hiển thị thanh cuộn dọc khi cần thiết */
    overflow-x: hidden;
`