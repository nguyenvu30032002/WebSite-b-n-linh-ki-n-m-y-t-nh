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
    height: 650px;
    justify-content: center;
    margin: 0 auto; // Căn giữa theo chiều ngang
    border-left: 1px solid black;
    border-right: 1px solid black;
`

export const WrapperNav = styled.div`
    width: 250px;
    height: 100%;
    border-right: 1px solid silver ;

`
export const WrapperButton = styled(Button)`
    width: 200px;
`

export const Wrappertable = styled.div`
    width: 80%;
    height: 100%;
    margin: 0 auto;
`

export const WrapperH1 = styled.h1`
  border-bottom: 1px solid silver ;  
`
export const WrapperOrder = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: auto;
`