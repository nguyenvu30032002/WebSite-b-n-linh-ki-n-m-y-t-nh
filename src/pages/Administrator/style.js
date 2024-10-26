import styled from "styled-components";
import { Button } from 'antd'

export const Wrapper = styled.div`
  background-color: #e8e8e8;
  display: inline-block;
  align-items: center;
  justify-content: center;
  width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
  height: 740px;
  margin: 0 auto; // Căn giữa theo chiều ngang

`

export const WrapperHeader = styled.div`
  width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
  margin: 0 auto; // Căn giữa theo chiều ngang
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  background-color: #fff;
`

export const WapperHeader = styled.div`
    display: flex;
    height: 70px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 1500px;
    margin: 0 150px 0 135px;
`

export const WrapperBody = styled.div`
    background-color: #fff;
    display: flex;
    width: 1400px;
    height: 650px;
    justify-content: space-between;
    margin: 0 auto; // Căn giữa theo chiều ngang
    border-left: 1px solid black;
    border-right: 1px solid black;
`

export const WrapperNav = styled.div`
    width: 250px;
    height: 650px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 5px;
    & span:first-child{
      margin-top: 40px;
    }
    & span{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 210px;
      min-height: 40px;
      font-size: 20px;
      cursor: pointer;
      border-bottom: 1px solid #ccc;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 40px;
      font-weight: 500;
    }

`

export const Wrappertable = styled.div`
    width: 1150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color
    & .ant-flex{
      width: 890px;
      height: 550px;
      & .ant-table-wrapper{
        width: 890px;
        height: 550px;
      }
      
    }
`

export const WrapperButton = styled(Button)`

`
