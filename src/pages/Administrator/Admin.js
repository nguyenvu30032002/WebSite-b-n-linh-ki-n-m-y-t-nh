import {  Table } from "antd";
import styled, { keyframes } from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    position: relative;
`

export const WrapperTable = styled(Table)`
    table-layout: none;
    margin-bottom: 20px;
    & .ant-table{
        width: 1100px;
        height: 480px;
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
    height: 520px;
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
      margin-right: 30px;
      width: 100%;
      /* border: 1px solid #000; */
    }
`

export const WrapperToggleShow = styled.div`
    right: 0;
    height: 520px;
    background-color: #fff;
    overflow: hidden;
    z-index: 1;
    animation: ${slideOut} 0.3s ease forwards;
    position: absolute;
    border-left: 1px solid #ccc ;
    border-top-left-radius: 15px ;
    border-bottom-left-radius: 15npx;
    
`
