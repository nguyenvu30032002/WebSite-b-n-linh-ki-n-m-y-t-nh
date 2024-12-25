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
    display: flex;
    width: 1230px;
    max-height: 1200px;
    min-height: 800px;
    justify-content: center;
    margin: 0 auto; // Căn giữa theo chiều ngang
    border-left: 1px solid black;
    border-right: 1px solid black;
  
`

export const WrapperNav = styled.div`
    width: 250px;
    height: 800px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 5px;
    & span:first-child{
      margin-top: 70px;
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
    width: 80%;
    height: 100%;
    margin: 0 auto;
`

export const WrapperH1 = styled.h1`
  border-bottom: 1px solid silver ;  
`
export const WrapperOrder = styled.div`
  width: 100%;
  height: 88%;
`