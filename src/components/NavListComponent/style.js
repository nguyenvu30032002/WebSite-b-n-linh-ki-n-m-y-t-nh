import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
    display: flex ;
    flex-direction: column;
    justify-content: center;
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
export const WrapperIcon = styled(FontAwesomeIcon)`
    margin: 5px 10px 0 0;
    font-size: 15px;
    display: none;
`

export const WrapperList = styled.div`
    width: 95%;
     margin: 0 5px;
     
    & ul{
        list-style-type: none;
        & li{
           width: 120px;
           position: relative;
           display: flex;
           margin: 25px 10px;
           font-size: 17px;
           transition:  right linear 0.2s;
           cursor: pointer;
           right: 0;
           font-weight: 400;
           text-transform: uppercase;
           &:hover ${WrapperIcon} {
                display: inline; 
            }
            & span {
                overflow: hidden; /* Ẩn nội dung vượt quá chiều rộng */
                white-space: nowrap; /* Ngăn chặn xuống dòng */
                text-overflow: ellipsis; /* Hiển thị dấu ba chấm khi văn bản bị cắt */
            }
        }
        & li:hover{
            right: -15px;
            color: #fc5b31;
        }
    }
`

