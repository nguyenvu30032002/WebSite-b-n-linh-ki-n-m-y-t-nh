import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const WapperCart = styled(FontAwesomeIcon)`
    width: 20px;
    height: 20px;
    color: black;
    &:hover{
        color: #ee4d2d;
    }
`

export const WrapperAmount = styled.div`
    color: white;
    background-color: red;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin: -30px -20px 0 0;
    z-index: 1;
    font-size: 13px;

` 

