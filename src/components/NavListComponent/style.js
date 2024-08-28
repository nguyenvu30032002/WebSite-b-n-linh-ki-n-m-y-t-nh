import styled from "styled-components";

export const Wrapper = styled.div`
    & ul{
        list-style-type: none;
       
    }
    & li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 30px;
        margin: 30px 10px 0 10px;
        border-bottom: 1px solid black;
        
    }
    & li:hover{
        background-color: red;
        margin: 25px 0 0 20px;
        
    }
`