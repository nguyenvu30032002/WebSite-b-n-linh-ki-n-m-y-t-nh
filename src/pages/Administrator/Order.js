import styled from "styled-components";
import { Modal, Table } from 'antd'


export const WrapperModal = styled(Modal)`
  width: 800px !important;
  height: 500px !important;
  & .ant-modal-content{
    width: 100% ;
    height: 100%;
    & .bill_of_lading_code{
      display: flex;
      justify-content: end;
      font-size: 18px;
    }
    & .product{
      width: 100%;
      max-height: 270px;
      display: flex;
      border-bottom: 1px solid #ccc;
      display: grid;  /* Sử dụng grid */
      grid-template-columns: 1fr ;  /* Chia layout thành 2 cột */
      gap: 10px;  /* Khoảng cách giữa các phần tử */
      overflow-y: auto;
      & div{
        width: 710px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
        & img{
        width: 80px;
        height: 50px;
        margin: 0 0 0 10px;
        border: 1px solid #efefef;
      }
        & .nameProduct{
          min-width: 400px;
          max-width: 400px;
          font-size: 15px;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        
        & .amount{
            min-width: 180px;
            max-width: 180px;
            font-size: 15px;
            font-weight: 500;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0 10px 0 0;
            text-align: center;
        }
      }

    }
    & .user{
      display: flex;
      justify-content: space-evenly;
          font-size: 20px;
          font-weight: 500;
    }
  }
`


export const WrapperTable = styled(Table)`
    table-layout: none;
    margin-bottom: 20px;
    & .ant-table{
        width: 1100px;
        height: 435px;
        border: 1px solid #ccc;
        & .ant-table-cell:nth-child(2){
          min-width: 150px;
          max-width: 150px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & .ant-table-cell:nth-child(4){
          min-width: 170px;
          max-width: 170px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
    } 
    /* & tbody{
      width: 1100px;
        height: 420px;
    } */
`