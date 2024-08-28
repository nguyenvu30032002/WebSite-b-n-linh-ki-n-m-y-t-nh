import styled from "styled-components";
import LogoComponent from "../../components/LogoComponent/LogoComponent";

export const Wrapper =  styled.div`
    height: 160px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    border-top: 1px solid black ;
`

export const WrapperFooter = styled.div`
    width: 1230px;
    /* background-color: #000; */
    display: flex;
    justify-content: space-between;
`

export const WrappperImg = styled.div`
    display: grid;
    grid-column: auto;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 100%;
`

export const WrapperLogo = styled(LogoComponent)`
`

export const WrapperIntroduce = styled.div`
    width: 200px;
    height: 100%;
    margin: 0 0 20px 0;
    & p{
        width: 180px;
        display: block;
        margin: 10px 0 0 30px;
        float: left;
        cursor: pointer;    
        
    }
    & div:last-child{
        margin-top: -10px;
    } 
    /* & h4{
        margin-bottom: 5px;
    } */
`

export const WrapperList = styled.div`
    background-color: red;
`

export const WrapperConnect = styled.div`
    width: 200px;
    height: 100%;
    margin: 0 0 20px 0;
    & p{
        margin: 5px 0 0 -120px;
        cursor: pointer;    
        
    }
    :nth-child(2){
        margin-top: -10px;
    }
    
    & h4{
        margin-bottom: 5px;
    }
`


export const WrapperMap = styled.div`
    width: 200px;
    height: 100%;
`