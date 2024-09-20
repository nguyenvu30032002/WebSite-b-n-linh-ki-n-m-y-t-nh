import styled  from "styled-components";

export const Wrapper = styled.div`
    width: 920px;
    margin: 30px 0 30px 50px;
    /* border-radius: 30px; */
   
`

export const WrapperArrange = styled.div`
    width: 100%;
    height: 50px;
    margin: 0 0 10px 0;
    display: flex;
    justify-content: start;
    align-items: center;
    & button{
        margin: 0 10px 0 10px;
    }
    & Button.active {
        background-color: #1890ff; /* Màu sắc khi nút được nhấn */
        color: white;
        border: 1px solid #1890ff;
    }
`

export const WrapperProduct = styled.div`
    width: 100%;
    height: 95%;
    display: grid;
    gap: 2px;
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
    margin: 0px 10px 0px 10px;
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
        margin: 0px 0 0 -180px;
        z-index: 1;
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
    margin: -40px 0 0 0 ;
`

///////////////////////////////////


export const ProductOutOfStock = styled.div`
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
    cursor: no-drop;
    background-color: #ccc;
    & .OutOfStock{
        position: absolute;
        background-color: #fff;
        width: 100px;
        height: 100px;
        z-index: 1;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 100px 10px;
        border: 1px solid #a3b8c8;
        font-size: 25px;
        font-weight: 500;
        color:#a3b8c8;
    }

    & .discountProduct{
        position: absolute;
        width: 50px;
        height: 25px;
        background-color: #d70018;
        color: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        margin: 0px 0 0 -180px;
        z-index: 1;
        opacity: 0.3;
    }
    & img{
        width: 80%;
        height: 120px;
        margin: 10px 0 0 0;
        opacity: 0.3; /* Làm cho hình ảnh mờ đi */
        position: relative; /* Cần thiết để định vị pseudo-element */
    }

    & img::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ccc; /* Màu xám nhạt */
        opacity: 0.5; /* Điều chỉnh để thay đổi độ mạnh của màu */
        z-index: 1; /* Đảm bảo lớp màu nằm trên hình ảnh */
        pointer-events: none; /* Cho phép các thao tác chuột thông qua lớp overlay */
    }
    & .nameProduct{
        width: 95%;
        height: 30px;
        white-space: nowrap;        /* Không cho phép xuống dòng */
        overflow: hidden;           /* Ẩn phần nội dung tràn ra ngoài */
        text-overflow: ellipsis;    /* Hiển thị dấu "..." khi vượt quá */
        margin-top: 15px;
        opacity: 0.3;
    }    
`

export const WrapperOriginOutOfStock = styled.div`
    width: 100%;
    height: 25px;
    margin-top: -10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.3;
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

export const WrapperPriceOutOfStock = styled.div`
    width: 95%;
    height: 30px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 5px 0 10px 0;
    opacity: 0.3;
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
            color: #000;
            font-weight: 500;
            margin-right: 2px;
            text-decoration: line-through;
        }
        &  p:last-child{
            color: #000;
            font-size: 15px;
            font-weight: 500;
           
        }
    }
`

export const WrapperConditionOutOfStock = styled.div`
    width: 95%;
    height: 30px;
    display: flex;
    opacity: 0.3;
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