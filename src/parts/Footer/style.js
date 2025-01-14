import styled from "styled-components";
import LogoComponent from "../../components/LogoComponent/LogoComponent";

export const Wrapper =  styled.div`
    width: 1500px; // Chiếm toàn bộ chiều rộng của container cha
    margin: 0 auto; // Căn giữa theo chiều ngang
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
        margin: 10px 0 0 30px;
        float: left;
        cursor: pointer;    
        
    }
    & div:last-child{
        margin-top: -10px;
    } 
`

export const WrapperList = styled.div`
     margin: 0 0 0 15px;
     width: 200px;
     height: 110px;
    & ul{

        list-style: none;
    }

    & a{
        text-decoration: none;
        float: left;
        margin: 5px 0 0 0;
        color: black;
    }
    & a:hover{
        color: #1677ff;
    }
`

export const WrapperConnect = styled.div`
    width: 200px;
    height: 100%;
    margin: 0 0 20px 0;
    & ul{
        display: block;
        list-style: none;
        margin: 5px;
        & div{
            display: flex;
            margin: 3px 20px 0 0 ;
            & p{
                margin: 3px 20px 0 0 ;
            }
        }
        & a{
           
            overflow: hidden; /* Ẩn nội dung vượt quá chiều rộng */
            white-space: nowrap; /* Ngăn chặn xuống dòng */
            text-overflow: ellipsis; /* Hiển thị dấu ba chấm khi văn bản bị cắt */
            text-decoration: none;
            color: #551A8B;
        }

        & a:hover{
           
          color: #1677ff ;
       }
    } 
`
export const WrapperListConnect = styled.div`
    margin: -10px 0 0 -35px ;
`


export const WrapperMap = styled.div`
    width: 200px;
    height: 100%;
    & iframe{
        width: 200px;
        height: 100px;
        margin: -10px 0 0 0 ;
    }
`