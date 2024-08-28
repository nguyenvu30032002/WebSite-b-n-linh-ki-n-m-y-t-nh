import styled from "styled-components";
import { Input } from 'antd';

const { Search } = Input;

export const WrapperSearch = styled(Search) `
    display: flex;
    align-items: center;
    width: 600px;
    .ant-input {
        height: 40px; /* Chỉnh chiều cao của input */
        line-height: 90px; /* Điều chỉnh dòng bên trong input */
        border-radius: 20px;
    }

    .ant-btn {
        height: 40px; /* Chỉnh chiều cao của nút */
        line-height: 90px; /* Điều chỉnh dòng bên trong nút */
        
    }

`