import {  Modal, Table } from "antd";
import styled from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    position: relative;
`

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
