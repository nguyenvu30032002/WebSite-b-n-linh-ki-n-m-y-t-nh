import { Form } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 740px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const WrapperForm = styled(Form)`
    max-width: 450px !important;
    height: 250px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .14);
    position: relative;
    & .ant-form-item-control-input-content{
        display: flex !important;
    }
    & Button{
        margin: 10px 30px 30px 10px;
        width: 100px;
    }
    .tittle{
        margin: 30px 0 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .anticon{
            position: absolute;
            left: 0;
            margin: 0 0 0 40px;
            font-size: 20px;
            cursor: pointer;
            color: #1677ff;
        }
    }
`