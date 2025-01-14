import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
    display: flex ;
    flex-direction: column;
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden; 
    
`
export const WrapperCategories = styled.div`
    display: flex;
    font-size: 25px;
    width: 95%;
    border-bottom: 1px solid #CECECE;
    margin: 0 5px;
    & div{
        margin: 10px 10px 10px 10px;
    }
    & p{
        margin: 10px 10px 10px 10px;
        font-weight: 700;
    }

`

export const WrapperList = styled.div`
    width: 95%;
    margin: 0 5px;
     
    & ul{
        list-style-type: none;
        & li{
           width: 150px;
           height: 25px;
           position: relative;
           display: flex;
           margin: 25px 10px;
           font-size: 15px;
           transition:  right linear 0.2s;
           cursor: pointer;
           right: 0;
           font-weight: 500;
           text-transform: capitalize;
           border-bottom: 1px solid #ccc;
           transition: transform 0.3s ease, color 0.3s ease; 
            & span {
                overflow: hidden; /* Ẩn nội dung vượt quá chiều rộng */
                white-space: nowrap; /* Ngăn chặn xuống dòng */
                text-overflow: ellipsis; /* Hiển thị dấu ba chấm khi văn bản bị cắt */
            }
        }
        & li:hover{
            transform: translateY(0px) translateX(20px) ;
            color: #fc5b31;
        }
    }
`

