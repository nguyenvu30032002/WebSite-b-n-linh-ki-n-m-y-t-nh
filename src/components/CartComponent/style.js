import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const WapperCart = styled(FontAwesomeIcon)`
    margin-left: 40px;
    margin-right: 25px;
    width: 20px;
    height: 20px;
    color: black;
    position: relative;
    top: -10px;
    
    &:hover{
        color: #1677ff;
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
    position: relative;
    right: -50px;
    top: -3px;
    z-index: 1;
    font-size: 13px;

` 

