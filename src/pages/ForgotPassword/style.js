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
    width: 500px !important;
    height: 200px;
    border: 1px solid #ccc;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    & .ant-form-item-control-input-content{
        display: flex !important;
    }
    & Button{
        margin: 10px 30px 0 10px;
    }
`