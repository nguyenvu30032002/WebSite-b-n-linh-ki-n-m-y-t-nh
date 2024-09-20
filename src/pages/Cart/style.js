import styled from "styled-components";

export const Wrapper = styled.div`
   width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
    margin: 0 auto; // Căn giữa theo chiều ngang
`

export const WrapperHeader = styled.div`
  width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
  margin: 0 auto; // Căn giữa theo chiều ngang
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
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
    align-items: center;
    
`

export const WrapperCart = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .checkbox{
        width: 580px;
        height: 30px;
        margin: 20px 0 10px 10px;
        /* position: fixed; */
        display: flex;
        justify-content: start;
        align-items: center;
        border-bottom: 1px solid #ccc;
        
    }

    & .cart{
        width: 700px ;
        height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px 0 0 0;
        overflow-y: auto;
    }

    & .Order{
        width: 600px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0  20px 10px;
    & .Order:nth-child(1){
        margin: 50px 0 10px 0;
        background-color: red;
    }
        & .informationOrder{
            width: 550px;
            height: 50px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 0 0 0 10px;
            border: 1px solid #ccc;
            & img{
                width: 35px;
                height: 35px;
                border: 1px solid #000;
            }
            & .amount{
                display: flex;
                & button{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #fff;
                    width: 20px;
                    height: 20px;
                    margin: 0 5px 0 5px;
                    border: 1px solid #ccc;
                }
                & div{
                    width: 25px;
                    height: 20px;
                    border-left: 1px solid #000;
                    border-right: 1px solid #000;
                }
            }
        }
    }
`

export const WrapperPay = styled.div`
width: 30%;
height: 100%;
background-color: green;

`