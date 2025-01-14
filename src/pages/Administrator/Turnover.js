import styled from "styled-components";

export const Wrapper = styled.div`
width: 1100px;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
overflow-y: auto;
overflow-x: hidden;
    & .divZero{
        width: 100%;
        min-height: 50px;
        display: flex;
        justify-content: end;
        align-items: center;
        padding-right: 150px;
    }
    & .divOne{
        width: 100%;
        height: 100%;
        display: flex;
        margin: 0 0 70px 0;
        & .sumOrder{
            width: 500px;
            height: 300px;

        }
        & .totalMoney{  
            width: 500px;
            height: 300px;

        }
    }

    & .divTwo{
        width: 100%;
        height: 100%;
        display: flex;
        margin: 70px 0 0 0;
        & .sumPayProduct{
            width: 500px;
            height: 300px;
            /* display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center; */
        }
        & .productPay{
            width: 500px;
            height: 300px;
            & .recharts-wrapper{
                width: 500px;
                height: 300px;
            }
           
        }
    }
    

`