import styled from "styled-components";

export const WrapperInformantion = styled.div`
    width: 170px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-right: -85px;
    .ant-space-item{
        width: 100px;
        overflow: hidden; /* Ẩn nội dung vượt quá chiều rộng */
        white-space: nowrap; /* Ngăn chặn xuống dòng */
        text-overflow: ellipsis; /* Hiển thị dấu ba chấm khi văn bản bị cắt */
    }
    border: none;
    & div:hover{
        cursor: pointer;
        color:#1677ff ;
    }
`

export const WrapperInformantionImg = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid black;

`