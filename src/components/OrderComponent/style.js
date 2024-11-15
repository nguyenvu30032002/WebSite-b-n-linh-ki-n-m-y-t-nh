import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 67%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 25px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
    & .product{
        width: 750px;
        max-height: 350px;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15);
        margin: 10px 20px 10px 20px;
        border-radius: 10px;
    }
` 
export const WrapperInformation = styled.div`
    width: 750px;
    max-height: 150px;
    background-color: white;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    & .imgProduct{
        width: 170px;
        height: 130px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 0 5px 0;
        & img{
            width: 120px;
            height: 120px;
            object-fit: contain;
            border: 1px solid #e1e1e1;
            
        }
    }
    & .informationProduct{
        width: 580px;
        max-height: 150px;
        margin: 0 0 0 20px;
            }
    & .nameProduct{
        width: 580px;
        height: 30px;   
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 10px 0;
        & p{
            max-width: 580px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 500;
        }
    }

    & .orderCode{
        display: flex;
        align-items: center;
        & span:last-child{
            margin: 0 0 0 10px;
            font-weight: 500;
        }
    }

    & .amount{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        & .price{
            display: flex;
            margin-right: 20px;
            justify-content: center;
            align-items: center;
            & .newPrice{
                font-size: 20px;
                font-weight: 600;
                color: #ee4d2d;
            }
            & .oldPrice{
                font-size: 15px;
                text-decoration: line-through;
                color: #ccc;
                font-weight: 600;
                margin-left: 10px;
            }

        }

    }

    & .totalMoney{
        width: 560px;
        height: 30px;
        display: flex;
        justify-content: end;
        align-items: center;
        white-space: nowrap;
        & span{
            color: #1677ff;
        }
    }

    & .condition{
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        & p:not(:first-child){
            font-weight: 400;
            margin-left: 10px;
            color: #ee4d2d;
        }
    }
`

export const WrapperUser = styled.div`
    width: 100%;
    height: 85px;
    display: flex;
    flex-direction: column;
    border-top: 1px dotted rgba(0, 0, 0, .09);
    & div{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        & .name{
            display: flex;
            width: 450px;
            float: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    & .address{
        width: 700px;
        margin: 0 0 0 24px;
        display: flex;
        float: left;
    }
    & p{
        font-weight: 500;
    }
    & span{
        font-weight: 400;
        margin: 0 0 0 10px;
        color: rgba(0, 0, 0, .54);
        font-size: 15px;
    }
`

export const WrapperSelect = styled.div`
   display: flex;
   width: 100%;
   height: 70px;
   justify-content: end;
   align-items: center;
   border-top: 1px dotted rgba(0, 0, 0, .09);
    & .cancel{
        min-height: 40px;
        min-width: 150px;
        margin: 0 20px;
        background-color: #fff;
        border: 1px solid #DBDBDB;
        color: #555;
        font-size: 14px;
        font-weight: 400;
        border-radius: 2px;
        cursor: pointer;
    }

    & .confirm{
        min-height: 40px;
        min-width: 150px;
        background-color: #1677ff;
        border: 1px solid rgba(0,0,0,.09);
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        border-radius: 2px;
        cursor: pointer;
    }

    & .acquisition{
        min-height: 40px;
        min-width: 150px;
        background-color: #1677ff;
        margin: 0 20px;
        border: 1px solid rgba(0,0,0,.09);
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        border-radius: 2px;
        cursor: pointer;
    }
`


