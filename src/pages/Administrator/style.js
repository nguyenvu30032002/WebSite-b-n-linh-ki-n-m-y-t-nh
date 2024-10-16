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
    border-right: 1px solid #ccc;
    & .ant-btn{
      width: 200px;
      margin: 20px 0 0 0;
    }

`

export const Wrappertable = styled.div`
    width: 1150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
