import styled from "styled-components";

export const Wrapper = styled.div`
 background-color: #e8e8e8;
  display: inline-block;
  align-items: center;
  justify-content: center;
  width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
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
    width: 1230px;
    height: 550px;
    margin: 0 auto; // Căn giữa theo chiều ngang
    border: 1px solid black;
    border-bottom: none;
    border-top: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .ant-form{
      width: 100% !important;
      border: none;
    }
`