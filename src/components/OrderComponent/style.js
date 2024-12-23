import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    /* gap: 25px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
    & .product{
        width: 750px;
        max-height: 550px;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15);
        margin: 10px 20px 10px 20px;
        border-radius: 10px;
    }
` 
export const WrapperInformation = styled.div`
    width: 750px;
    max-height: 250px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: end;
    border: none;
    border-radius: 10px;
    
    & .orderCode{
        display: flex;
        max-width: 420px;
        align-items: center;
        justify-content: end;
        margin: 10px 15px 0 0;
        border-bottom: 1px dotted rgba(0, 0, 0, .09);
        & span:last-child{
            margin: 0 0 0 10px;
            font-weight: 500;
        }
    }

    
    & .informationProduct{
        width: 740px;
        max-height: 150px;
        margin: 10px auto;
        display: flex;
        justify-content: center;
        overflow: hidden;
        & .orderDetail{
            display: flex;
            max-height: 150px;
            & .imgProduct{
                width: 100px;
                height: 100px;
                border: none;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 5px 0 5px 0;
                & img{
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                    border: 1px solid #e1e1e1;
                    
                }
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
        }
        
    }
    
    & .totalMoney{
        max-width: 560px;
        height: 30px;
        display: flex;
        justify-content: end;
        align-items: center;
        white-space: nowrap;
        margin: 0 15px 0 0;
        border-top: 1px dotted rgba(0, 0, 0, .09);
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
            min-width: 450px;
            float: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0 0 0 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        & .phone{
            min-width: 250px;
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
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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

export const WrapperPaginate = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
`


