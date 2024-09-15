import styled from "styled-components";
import { Button } from 'antd'

export const Wrapper = styled.div`
  background-color: #e8e8e8;
  display: inline-block;
  align-items: center;
  justify-content: center;
  width: 1535px; // Chiếm toàn bộ chiều rộng của container cha
  margin: 0 auto; // Căn giữa theo chiều ngang

`

export const WrapperHeader = styled.div`
  width: 1535px; // Chiếm toàn bộ chiều rộng của container cha
  margin: 0 auto; // Căn giữa theo chiều ngang
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  background-color: #fff;
`

export const WrapperBody = styled.div`
    background-color: #fff;
    display: flex;
    width: 1230px;
    justify-content: center;
    margin: 0 auto; // Căn giữa theo chiều ngang
    border-left: 1px solid black;
    border-right: 1px solid black;
    background-color: red;
`

export const WrapperNav = styled.div`
    background-color: blue;
    width: 300px;

`

export const Wrappertable = styled.div`
    background-color: green;
    width: 850px;
`

export const WrapperButton = styled(Button)`

`