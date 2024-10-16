import styled from "styled-components";
import { Modal } from 'antd'


export const WrapperModal = styled(Modal)`
  width: 800px !important;
  height: 500px !important;
  & .ant-modal-content{
    width: 100% ;
    height: 100%;
    & .product{
      width: 100%;
      height: 270px;
      display: flex;
      border-bottom: 1px solid #ccc;
      & img{
        width: 250px;
        height: 250px;
        margin: 0 20px 0 0;
      }
      & div{
        display: flex;
        flex-direction: column;
        & p:first-child{
          width: 500px;
          font-size: 20px;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & p{
          width: 500px;
          font-size: 15px;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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