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
    width: 530px;
    transform: translateX(0); /* Kết thúc ở vị trí ban đầu */
  }
`;

const slideOut = keyframes`
  from {
    width: 530px;
    transform: translateX(0); /* Bắt đầu ở vị trí ban đầu */
  }
  to {
    width: 0;
    transform: translateX(0); /* Kết thúc ở bên phải */
  }
`;


export const WrapperToggle = styled.div`
    max-height: 650px;
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
      margin: 60px 30px 0 0;
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
    & .product{
      /* background-color: red; */
      max-width: 600px;
      max-height: 550px;
      display: flex;
      margin-left: 10px;
      & .informationProduct{
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        & .select{
          display: flex;
          justify-content: space-between;
          /* margin: 3px 0 20px 0; */
        }
        & .payment{
          display: flex;
          justify-content: space-between;
          /* margin: 0px 0 5px 0; */
        }
        & .inventory{
          display: flex;
          justify-content: space-between;
          /* margin: 0px 0 5px 0; */
        }
        & .ant-form-item-control-input-content{
          max-width: none;
        }
      }
      & .checkbox{
        display: flex;
        justify-content: end;
        /* margin: 10px 0 0 0; */
        & .anticon{
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    & .variants{
      display: flex;
      justify-content: space-between;
      margin: 10px 5px 10px;
    }
    & .add{
      display: flex;
      justify-content: center;
      align-items: center;
    }
`

export const WrapperToggleShow = styled.div`
    right: 0;
    height: 650px;
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
  width: 680px !important;
  height: 550px !important;
  & .product{
    display: flex;
    & .ant-upload {
      width: 150px !important;
      height: 50px !important;
      display: flex;
      justify-content: center;
    }
    & img{
      width: 200px;
      height: 200px;
    }
    /* & .ant-upload-list-item-container{
      width: 200px !important;
      height: 200px !important;
    } */
    & .informationProduct{
      margin: 0 0 0 20px;
      & .select{
          display: flex;
          justify-content: space-between;
          margin: 20px 0 20px 0;
        }
        & .payment{
          display: flex;
          justify-content: space-between;
          margin: 0px 0 20px 0;
        }
        & .inventory{
          display: flex;
          justify-content: space-between;
          margin: 0px 0 20px 0;
        }
        & .checkbox{
          display: flex;
          justify-content: end;
          margin: 0 0 10px 0;
        }
    }
  }
`