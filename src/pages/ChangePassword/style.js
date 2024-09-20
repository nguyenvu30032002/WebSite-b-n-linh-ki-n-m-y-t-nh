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
    & div:not(:nth-child(3)){ 
      display: flex;
      flex-direction: column;
      align-items: start;
      margin: 30px 0 20px 0;
      & label{
        margin: 0 0 10px 0;
      }
      & input{
        width: 550px;
        height: 34px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding-left: 10px;
      }
      & input:focus {
        border-color: 0 0 5px rgba(22, 119, 255, 0.5); /* Màu border sẽ thay đổi khi nhấn vào */
        box-shadow: 0 0 5px rgba(22, 119, 255, 0.5); /* Đổ bóng với màu #1677ff */
        outline: none; /* Tắt viền mặc định của trình duyệt nếu cần */
      }
    }
    & div:nth-child(1){
      margin: 50px 0 0 0;
    }

    & .changePassword{
      width: 350px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0 0 0;
      & button{
        width: 120px;
        height: 40px;
        & div{
          display: none;
        }
      }
    }
   
`