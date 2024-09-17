import styled  from "styled-components";

export const Wrapper = styled.div`
    width: 920px;
    margin: 30px 0 30px 50px;
    /* border-radius: 30px; */
   
`

export const WrapperProduct = styled.div`
    width: 100%;
    height: 95%;
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
`

export const Product = styled.div`
    width: 230px;
    height: 300px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0px 10px -10px 10px;
    cursor: pointer;
    & .discountProduct{
        position: absolute;
        width: 50px;
        height: 25px;
        background-color: #d70018;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        margin: 0px 0 0 -200px;
    }
    & img{
        width: 80%;
        height: 120px;
        margin: 10px 0 0 0;
    }
    & .nameProduct{
        width: 95%;
        height: 30px;
        white-space: nowrap;        /* Không cho phép xuống dòng */
        overflow: hidden;           /* Ẩn phần nội dung tràn ra ngoài */
        text-overflow: ellipsis;    /* Hiển thị dấu "..." khi vượt quá */
        margin-top: 15px;
    }    
`

export const WrapperOrigin = styled.div`
    width: 100%;
    height: 25px;
    margin-top: -10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & p{
        width: 45%;
        
    }
    & p:first-child{
        border-right: 1px solid #ccc;
    }
    & p:last-child{
        border-left: 1px solid #ccc;
    }
`

export const WrapperPrice = styled.div`
    width: 95%;
    height: 30px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 5px 0 10px 0;
    & .newPrice{
        width: 50%;
        height: 30px;
        display: flex;
        justify-content: start;
        align-items: center;
        border-right: 1px solid #ccc ;
        &  p:first-child{
            color: #d70018;
            font-weight: 500;
            margin-right: 2px;
        }
        &  p:last-child{
            color: #d70018;
            font-size: 15px;
            font-weight: 500;
        }
    }
    & .oldPrice{
        width:  50%;
        height: 30px;
        display: flex;
        justify-content: end;
        align-items: center;
        border-left: 1px solid #ccc ;
        &  p:first-child{
            color: #ccc;
            font-weight: 500;
            margin-right: 2px;
            text-decoration: line-through;
        }
        &  p:last-child{
            color: #ccc;
            font-size: 15px;
            font-weight: 500;
           
        }
    }
`

export const WrapperCondition = styled.div`
    width: 95%;
    height: 30px;
    display: flex;
    & .soldProduct{
        width: 50%;
        height: 30px;
        display: flex;
        justify-content: start;
        align-items: center;
        border-right: 1px solid #ccc ;
        & p:first-child{
            margin-right: 5px;
            font-weight: 500;
        }
    }

    & .inventoryProduct{
        width: 50%;
        height: 30px;
        display: flex;
        justify-content: end;
        align-items: center;
        border-left: 1px solid #ccc ;
        & p:first-child{
            margin-right: 5px;
            font-weight: 500;
        }
    }
`

export const WrapperPaginate = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`