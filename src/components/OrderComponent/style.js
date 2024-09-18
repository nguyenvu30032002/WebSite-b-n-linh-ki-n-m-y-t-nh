import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    gap: 25px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    & .product{
        width: 250px;
        height: 350px;
        border: 1px solid #000;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px 20px 10px 20px;
    }
` 
export const WrapperInformation = styled.div`
    width: 90%;
    height: 90%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    & .imgProduct{
        width: 90%;
        height: 150px;
        border: none;
        & img{
            width: 90%;
            height: 150px;
            object-fit: contain;
            border: none;
        }
    }
    & .nameProduct{
        width: 90%;
        height: 30px;   
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0 10px 0;
        & p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 500;
            text-transform: capitalize;
        }
    }
    & .amountProduct{
        width: 90%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        & .quantityProduct{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            white-space: nowrap;
            border-right: 1px solid silver;
            & p:not(:first-child){
                font-weight: 400;
                margin-left: 5px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

        }
        & .originProduct{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-left: 1px solid silver;
            padding-left: 5px;
            & p:not(:first-child){
                font-weight: 400;
                margin-left: 5px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
        }
        }
        
    }

    & .totalMoney{
        width: 90%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        margin: 10px 0 10px 0;
        white-space: nowrap;
        & p:nth-child(2) {
            font-weight: 400;
            margin-left: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    & .condition{
        width: 90%;
        height: 30px;
        display: flex;
        justify-content: end;
        align-items: center;
        font-weight: 500;
        margin-right: 10px;
        & p:not(:first-child){
            font-weight: 400;
            margin-left: 10px;
            color: #ee4d2d;
        }
    }
`

export const WrapperSelect = styled.div`
   display: flex;
   width: 100%;
   height: 32px;
   justify-content: space-evenly;
   align-items: center;
   border-top: 1px solid silver;
   & button{
    background-color: #fff;
    border: 1px solid silver;
    border-radius: 10px;

   }
`


