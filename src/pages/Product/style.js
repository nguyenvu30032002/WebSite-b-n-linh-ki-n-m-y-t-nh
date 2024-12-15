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
    flex-direction: column;
    max-height: 3500px;
    align-items: center;
`

export const WrapperProductInformation = styled.div`
    width: 1500px;
    max-height: 800px;
    display: flex;
    justify-content: center;   
    border-bottom : 1px dotted rgba(0, 0, 0, .09);
`

export const WrapperImg = styled.div`
    width: 600px;
    height: 460px;
    margin: 10px 30px 0 0 ;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

export const WrapperCarousel = styled(Carousel)`
    /* margin: 30px 0 0 0; */
    border-right: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 460px;
    width: 600px;
    & .img{
        height: 460px;
        width: 600px;
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
    margin: 30px 0 -15px 0;
    & p{
        font-size: 25px;
        text-align: start;
        overflow-wrap: break-word;
        white-space: normal;
        text-transform: capitalize;
        font-weight: 500;
        padding-left: 15px ;
    }
`

export const WrapperRate = styled.div`
    /* background-color: red; */
    height: 50px;
    margin: 0 0 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    & .rate{
        margin: 0 0 0 15px;
        font-size: 40px;
        
    } 
   
`

export const WrapperVariants = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    margin: 0 0 20px 0;
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
        & p:last-child{
            margin-left: 10px;
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
        & p:last-child{
            margin-left: 10px;
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
        max-width: 40%;
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
        max-width:  40%;
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
    display: flex;
    align-items: center;
    margin: 25px 0 25px 25px;
    & .OrderProduct{
        width: 150px;
        height: 50px;
        margin: 0 20px 0 0;    
    }


    & button:focus {
        border-color: #ccc;
    }
`

export const WrapperModal = styled(Modal)`
    width: 800px !important;
    max-height: 500px !important;
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
        & .name{
            width: 350px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        & .information{
            border-top: 1px solid #ccc ;
            & div{
                display: flex;
               & .phone{
                margin: 0 0 0 100px;
                & p:last-child{
                    padding-left: 10px;
                }
               }
            }
            & .address{
                display: flex;
                justify-content: start;
                align-items: center;
                & p:first-child{
                    width: 100px;
                }
            }
        }
    }

    & .paypal{
        width: 300px;
        height: 100px;
        display: flex;
        margin: 20px 0 0 200px;
        /* background-color: red; */
        display: flex;
        justify-content: center;
    }

`

export const WrapperDescription = styled.div`
    width: 100%;
    max-height: 350px;
    float: left;
    text-align: justify;
    font-size: 17px;
    padding-left: 15px;
    line-height: 1.5;
    overflow-y: auto; /* Hiển thị thanh cuộn dọc khi cần thiết */
    overflow-x: hidden;
`

export const WrapperSimilar = styled.div`
    width: 1200px;
    max-height: 650px;
    margin: 20px 0 ;
    & .similar{
        display: flex;
        font-size: 18px;
        font-weight: 700;
        margin: 10px;
        color: #4a4a4a;
    }
    & div{
        display: flex;
    }
`

export const ProductSimilar = styled.div`
    width: 230px;
    height: 350px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 40px;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 15px 10px 15px 10px;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15);
    cursor: pointer;
    & .discountProduct{
        position: absolute;
        width: 80px;
        height: 31px; 
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 100"><title>Asset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><image width="256" height="100" xlink:href="data:image/png;base64,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"/></g></g></svg>') 50% no-repeat;
        color: #fff;
        text-align: center;
        margin: 0px 0 0 -160px;
        z-index: 1;
    }
    & img{
        width: 80%;
        height: 170px;
        margin: 10px 0 0 0;
    }
    & .nameProduct{
        width: 95%;
        height: 70px;
        white-space: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis; /* Thêm dấu "..." nếu bị cắt */
        margin: 15px 5px 0 10px ;
        text-align: left;
        font-size: 14px;
        font-weight: 600;
        color: #333e48;
    }    
`

export const WrapperPriceSimilar = styled.div`
    width: 95%;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    & .Price{
        width:95%;
        height: 30px;
        display: flex;
        align-items: center;
        &  p:first-child{
            color: #d70018;
            font-weight: 600;
            font-size: 25px;
        }
        &  p:last-child{
            color: #d70018;
            font-size: 15px;
            font-weight: 500;
        }
    }
    & .newPrice{
        width: 95%;
        height: 30px;
        display: flex;
        align-items: center;
        &  p:first-child{
            color: #d70018;
            font-weight: 600;
            font-size: 25px;
        }
        &  p:last-child{
            color: #d70018;
            font-size: 15px;
            font-weight: 500;
        }
    }
    & .oldPrice{
        width:  95%;
        height: 30px;
        display: flex;
        align-items: center; 
        &  p:first-child{
            color: #ccc;
            font-weight: 600;
            font-size: 15px;
            text-decoration: line-through;
        }
        &  p:last-child{
            color: #ccc;
            font-size: 15px;
            font-weight: 500;
            text-decoration: line-through;
        }
    }
`

export const WrapperConditionSimilar = styled.div`
    width: 95%;
    height: 30px;
    & .soldProduct{
        width: 50%;
        height: 30px;
        display: flex;
        justify-content: start;
        align-items: center;
        margin: 0 0 0 10px;
        color: rgba(0,0,0,.87);
        font-size: .75rem;
        & p:first-child{
            margin-right: 5px;
        }
    }
`

export const WrapperRateSimilar = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 5px;
    & .ant-rate {
        font-size: 15px;
    }
`

export const WrapperComment = styled.div`
    width: 1500px;
    max-height: 2100px;
    border-top: 1px dotted rgba(0, 0, 0, .09);
    & .formComment{
        width: 1000px;
        margin: 20px 0 20px 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: rgba(60, 64, 67, 0.1) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        border-radius: 10px;
        & .title{
            -webkit-line-clamp: 2;
            white-space: normal;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            margin: 20px 0 20px 0;
            font-size: 20px;
            font-weight: 500;
        }
        & .comment{
            max-width: 800px;
            border: 1px solid #ccc;
            padding: 10px 50px;
            border-radius: 10px;
            margin: 0 0 30px 0;
            display: flex;
            flex-direction: column;
            & .rateComment{
                display: flex;
                align-items: center;
                margin: 15px 0 25px 0;
                span{
                    margin: 0 30px 0 0;
                } 
           }

           & .imgComment{
            display: flex;
            align-items: center;
            margin: 0 0 25px 0;
            p {
                margin: 0 20px 0 0;
            }
           }
        }

        & .userComment{
            width: 950px;
            max-height: 1500px;
            border-radius: 10px;
            margin: 10px 0 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            & .commentUser{
                width: 800px;
                max-height: 800px;
                margin: 20px 0;
                border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                & .profileUser{
                    display: flex;
                    margin: 20px 0 0 0;
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background-color: #f5f5f5;
                    }
                    .profile{
                        display: flex;
                        flex-direction: column;
                        top: 0;
                        margin: 0 20px;
                        span{
                            display: flex;
                            left: 0;
                        }
                        .ant-rate{
                            font-size: 15px;
                            color: #fadb14;
                            margin: 0 0 10px -35px;
                        }
                        
                    }
                }
                & .comment{
                    margin: 20px 30px 20px 70px;
                    width: 680px;
                    max-height: 400px;
                    display: block; 
                    word-wrap: break-word;
                    word-break: break-word;
                    overflow-wrap: break-word; 
                    text-align: left; 
                    padding: 0;
                    font-size: 20px;
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    border: none;

                }

                & .commentImg{
                    max-width: 680px;
                    max-height: 150px;
                    margin: 20px 30px 40px 70px;
                    display: flex;
                    align-items: center;
                    border: none;
                    img{
                        width: 100px;
                        height: 100px;
                        margin: 0 20px 0 0;
                        border: 1px dotted #ccc;
                    }
                }
            }
        }
    }
`
export const WrapperPaginate = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 0 0 ;
`
