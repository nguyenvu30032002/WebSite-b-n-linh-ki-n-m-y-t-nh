import styled from "styled-components";

export const Wrapper = styled.div`
    width: 700px;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    & .product{
        width: 100%;
        height: 100%;
        display: flex;
        margin: 10px 0 30px 0;
        & .orderNumber{
            margin: 15px 30px 15px 0;
            font-size: 17px;
            font-weight: 500;
        }
    }
` 
export const WrapperInformation = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid silver; 
    
    & .imgProduct{
        width: 30px;
        height: 30px;
        border: 1px solid silver; 
        & img{
            width: 30px;
            height: 30px;
            object-fit: contain;
        }
    }
    & .nameProduct{
        width: 120px;
        height: 50px;   
        & p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 500;
            text-transform: capitalize;
        }
    }
    & .amountProduct{
        width: 120px;
        height: 50px;
        display: flex;
        justify-content: space-around;
        font-weight: 500;
        & p:not(:first-child){
            font-weight: 400;
        }
    }

    & .totalMoney{
        width: 250px;
        height: 50px;
        display: flex;
        justify-content: space-evenly;
        font-weight: 500;
        & p:not(:first-child){
            font-weight: 400;
        }
    }
`
