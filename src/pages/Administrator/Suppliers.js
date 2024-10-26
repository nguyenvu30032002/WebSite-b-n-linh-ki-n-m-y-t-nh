import {  Modal, Table } from "antd";
import styled, { keyframes } from "styled-components";

export const WrapperTable = styled(Table)`
    table-layout: none;
    margin-bottom: 20px;
    & .ant-table{
        width: 1100px;
        height: 440px;
        border: 1px solid #ccc;
    } 
    /* & tbody{
      width: 1100px;
        height: 420px;
    } */
`

const slideIn = keyframes`
  from {
    width: 0;
    transform: translateX(0); /* Bắt đầu ở bên phải */
  }
  to {
    width: 450px;
    transform: translateX(0); /* Kết thúc ở vị trí ban đầu */
  }
`;

const slideOut = keyframes`
  from {
    width: 450px;
    transform: translateX(0); /* Bắt đầu ở vị trí ban đầu */
  }
  to {
    width: 0;
    transform: translateX(0); /* Kết thúc ở bên phải */
  }
`;


export const WrapperToggle = styled.div`
    height: 230px;
    background-color: #fff;
    z-index: 1;
    position: absolute;
    right: 0;
    overflow: hidden;
    animation: ${slideIn} 0.3s ease forwards;
    border: 1px solid #000 ;
    border-top-left-radius: 15px ;
    border-bottom-left-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    & .ant-form {
      margin: 45px 30px 0 0;
      width: 100%;
      
    }
    & .cancel{
      position: absolute;
      top: 0;
      left: 0;
      font-size: 25px;
      margin: 5px 0 0 10px;
      cursor: pointer;
   
    }
`

export const WrapperToggleShow = styled.div`
    right: 0;
    height: 150px;
    background-color: #fff;
    overflow: hidden;
    z-index: 1;
    animation: ${slideOut} 0.3s ease forwards;
    position: absolute;
    border-left: 1px solid #ccc ;
    border-top-left-radius: 15px ;
    border-bottom-left-radius: 15npx;
    
`
export const WrapperModal = styled(Modal)`
& input{
  width: 350px;
  height: 40px;
  padding: 0 0 0 10px ;
  outline: none;
  font-size: 20px;
  margin: 10px 0 10px 0;
}  

`
