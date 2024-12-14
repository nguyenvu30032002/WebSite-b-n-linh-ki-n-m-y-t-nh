import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    z-index: 1;
    bottom: 0;
    right: 0;
    margin: 0 30px 100px 0;
`
export const WrappperImage = styled.div`
    position: relative;
    & img
    {
        width: 70px;
        height: 70px;
        cursor: pointer;
    }
    & div{
        width: 30px;
        height: 25px;
        position: absolute;
        background-color: #fff;
        top: 0;
        right: 0;
        margin: -10px -10px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        color: #d70018;
        border: 1px solid #ccc;
        padding: 4px;
        border-radius: 50%;
    }
`
export const WrapperMessages = styled.div`
    width: 350px;
    max-height: 500px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;

    & .header{
        width: 100%;
        height: 60px;
        background-color: #1677ff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc ;
        margin-bottom: 15px;
        & p {
            margin: 0 0 0 15px;
            font-size: 16px;
            white-space: nowrap;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #fff;
        }
        & .anticon {
            margin: 0 15px 0 0;
            color: #fff;
            cursor: pointer;
        }
    }
    & .main{
        width: 100%;
        height: 400px;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        & div{
            width: 100%;
            max-height: 60px;
            display: flex;
            justify-content: start;
            align-items: center;
            margin: 10px 0 20px 0;
            cursor: pointer;
            & img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin: 0 20px 0 10px;
            }
            & .user{
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: start ;
                & p{
                    width: 180px;
                    height: 30px;
                    font-size: 20px;
                    margin: 0 0 5px 0;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: start;
                    font-weight: 500;
                }
                & span{
                    width: 160px;
                    margin: 0 0 5px 0;
                    text-align: start;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
`

export const WrapperMessage = styled.div`
    width: 350px;
    max-height: 500px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;

    & .header{
        width: 100%;
        height: 60px;
        background-color: #1677ff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc ;
        margin-bottom: 15px;
        & p {
            margin: 0 0 0 15px;
            font-size: 16px;
            white-space: nowrap;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #fff;
        }
        & .anticon {
            margin: 0 15px 0 0;
            color: #fff;
            cursor: pointer;
        }
        & .anticon-arrow-left{
            margin: 0 0 0 20px;
        }
    }
    & .main{
        width: 100%;
        height: 380px;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        & div{
            width: 100%;
            max-height: 500px;
            margin: 0px 0 20px 0;
            display: flex;
            /* justify-content: end; */
            & .mess{
                max-width: 230px;
                max-height: 500px;
                background-color: hsla(0, 0%, 91%, .5);
                margin: 0 25px 0 25px;
                overflow-wrap: break-word;
                box-sizing: border-box;
                text-align: left;
                border-radius: 15px;
                padding: 10px;
            } 
        }
        & > div:first-child {
            margin-top: auto;
            margin-bottom: 20px;
            
        }

    }
    & .footer{
        width: 100%;
        height: 50px;
        margin-bottom: 5px ;
        display: flex;
        align-items: center;
        & .ant-space-compact{
            display: flex;
            justify-content: center;
            align-items: center;
            & input{
                width: 250px;
                border-radius: 20px;
                background-color: #f3f3f3;
            }
            & .anticon{
                color: #1677ff;
                margin: 0 0 0 25px;
            }
        }
    }
`