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
    width: 700px !important;
    height: 300px;
    border: 1px solid #ccc;
    padding: 40px;
`