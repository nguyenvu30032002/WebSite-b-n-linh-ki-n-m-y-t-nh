import {  Modal, Table } from "antd";
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
        height: 460px;
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
export const WrapperModal = styled(Modal)`
  width: 680px !important;
  height: 550px !important;
  & .ant-modal-content{
    width: 100% ;
    height: 100%;
    & .user{
      width: 100%;
      height: 430px;
      display: flex;
      border-bottom: 1px solid #ccc;
      & img{
        width: 250px;
        height: 250px;
        margin: 0 20px 0 0;
      }
      & .infor{
        display: flex;
        flex-direction: column;
        & div{
          margin: 0 0 10px 0;
          display: flex;
          align-items: center;
          height: 50px;
          & label{
            font-size: 15px;
            font-weight: 500;
            margin: 0 10px 0 10px;
          }
          & p{
            color: #ff4d4f;
            font-size: 20px;
            font-weight: 500;
          }
          & span{
            color: #cccc;
            font-size: 20px;
            font-weight: 500;
          }
          & .ant-select-selector{
            height: 30px;
            width: 120px;
            margin-top: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            & .ant-select-selection-item{
              color: #000;
              font-weight: 400;
            }
          }
          & .ant-select-arrow{
              margin-top: 3px;
            }
        }
      }
    }
  }
`
