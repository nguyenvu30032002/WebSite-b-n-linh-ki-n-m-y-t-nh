import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "antd";
import styled from "styled-components";

const CheckboxGroup = Checkbox.Group;

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
    background-color: #fff;
    width: 1230px;
    height: 550px;
    margin: 0 auto; // Căn giữa theo chiều ngang
    border: 1px solid black;
    border-bottom: none;
    border-top: none;
    display: flex;
    align-items: center;
    display: flex;
    
`

export const WrapperCart = styled.div`
    width: 70%;
    height: 100%;
    display: flex; 
    flex-direction: column;
    align-items: center;
    & .svg-inline--fa{
            width: 50px;
        }
    & .Order{
        width: 600px;
        height: 70px;
        display: flex;
        align-items: center;
        margin: 10px ;
        
        & .informationOrder{
            width: 550px;
            height: 50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 0 0 0 10px;
            border: 1px solid #ccc;
                
            & img{
                width: 35px;
                height: 35px;
                border: 1px dotted rgba(0, 0, 0, .09);
            }
            & .nameP{
                height: 50px;
                width: 250px;
                display: flex;
                justify-content: space-around;
                & .nameProduct{
                max-width: 150px;
                height: 30px;
                display: inline-block;
                justify-content: center;
                align-items: center;
                text-align: start;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                }
                & .variantProduct{
                    min-width: 70px;
                    max-width: 70;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: center;
                }
            }
            
            & div{
                width: 90px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                & .ant-input-number{
                    width: 50px !important;
                    
                }
                & .ant-input-number-handler-wrap{
                    width: 20px !important;
                }
                
            }

            & .price{
                width: 120px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        
    }
`

export const WrapperCheckAll = styled(Checkbox)`
    width: 600px;
    margin: 20px 0 0 0;
    border-bottom: 1px solid #ccc;
   
`
export const WrapperDeleteAll = styled(FontAwesomeIcon)`
        margin: -20px 0 0 580px;
        color: #ccc;
        cursor: pointer;
        & .svg-inline--fa{
            background-color: red;
            width: 50px;
        }
`
export const WrapperCheckBox = styled(CheckboxGroup)`
    width: 700px;
    height: auto; /* Thay vì một chiều cao cố định */
    max-height: 470px;
    overflow-y: auto;
    margin-left: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;

`


export const WrapperPay = styled.div`
    width: 30%;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #ccc;
    padding: 0 30px 0 10px;
    margin: 0px 0 0 0;
    & .address{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 5px 0;
        & p:first-child{
            font-weight: 500;
        }
    }

    & .phone{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0 0 0 ;
        & p:first-child{
            font-weight: 500;
        }
    }

    & .nameUser{
        width: 100%;
        height: 40px;
        font-size: 25px;
        font-weight: 500;
        display: flex;
        justify-content: start;
        align-items: center;
        margin: 10px 0 0 0;
    }

    & .totalAmount{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0 0 0;
        & p:first-child{
            font-size: 25px;
            font-weight: 500;
        }
    }

    & .VAT{
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: center;
    }

    & .submitData{
       
        width: 100%;
        max-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0 0 0 ;
        & button{
            width: 100%;
            height: 50px;
            font-size: 20px;
            font-weight: 500;
        }
       
    }

    & .select{
        height: 80px;
        margin: 0 0 0px 0;
        & .ant-radio-wrapper{
            margin: 10px ;
            float: left;
        }
    }

    & a{
        text-decoration: none;
        color: #1677ff;
    }

`