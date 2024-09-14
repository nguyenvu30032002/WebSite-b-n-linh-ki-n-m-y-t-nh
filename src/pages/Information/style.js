import styled from "styled-components";

export const Wrapper = styled.div`
background-color: #e8e8e8;
  display: inline-block;
  align-items: center;
  justify-content: center;
  width: 1535px; // Chiếm toàn bộ chiều rộng của container cha
  margin: 0 auto; // Căn giữa theo chiều ngang

`

export const WrapperHeader = styled.div`
  width: 1535px; // Chiếm toàn bộ chiều rộng của container cha
  margin: 0 auto; // Căn giữa theo chiều ngang
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
  background-color: #fff;
`

export const WrapperBody = styled.div`
    background-color: #fff;
    display: flex;
    width: 1230px;
    margin: 0 auto; // Căn giữa theo chiều ngang
    border-left: 1px solid black;
    border-right: 1px solid black;
`
export const WrapperAvatar = styled.div`
    width: 400px;
    height: 350px;
    margin: 40px 20px;
    display: grid;
    justify-content: center;
    align-items: center;
    border-right: 1px solid silver;
    & .avatar{
        width: 90%;
        height: 80%;
        margin-top: -40px;
    }
    & img{
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: 1px solid black;
        object-fit: cover;
    }

    & input{
        display: none;
    }

    & label{
        width: 170px;
        height: 50px;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        font-size: 25px;
        text-transform: capitalize;
        font-weight: 500;
        border: 1px dashed silver;
        color: silver;
        cursor: pointer;
    }

    & .changeAvatar{
        width: 120px;
        height: 25px;
        margin: 10px 70px 0 70px ;   
        & input{
        display: none;
        }
        & label{
            
            width: 120px;
            height: 25px;
            display: flex;
            justify-content: center;
            text-align: center;
            align-items: center;
            font-size: 15px;
            text-transform: capitalize;
            font-weight: 400;
            border: 1px dashed silver;
            color: #2f383e;
            cursor: pointer;
        }
    }

    & .nullAvatar{
        margin: -65px 0 0 0 ;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 250px;
        height: 80%;
        border: 1px dashed silver;
    }
`

export const WrapperInformation = styled.div` 
    display: flex;
    width: 100%;
    height: 600px;
    margin: 40px 0 0 0;
    flex-direction: column;
    align-items: flex-start;
    div:nth-child(n + 2) {
        margin: 30px 0 0 0;
    }
    .inputEmail{
        border: none;
    }
    & div{
        display: inline-block;
        & label{
            display: block; 
            font-size: 15px;
            text-transform: capitalize;
            width: 170px;
            float: left;
            margin: 10px 0 10px 0;
            font-weight: 500;
        }
        & input{
            width: 400px;
            height: 35px;
            border-radius: 10px;
            border: 1px solid black;
            background-color: white;
            font-size: 15px;
            border: 1px solid #ccc; /* Giữ nguyên border không đổi */
            padding-left: 20px;
        }

        & input:focus {
            outline: none; /* Loại bỏ outline mặc định */
            border: 1px solid #ccc; /* Giữ nguyên border không đổi */
        }

        & .ant-picker{
            margin-top: 5px;
            & input{
                border: none;
                border-radius: 0%   ;
                padding-left: 5px;
            }
        }

        & .ant-radio-group{
            margin-top: -5px;
            & .ant-radio-wrapper{
                width: 70px;
            }
        }
    }
    & .button{
        width: 65%;
        height: 70px;
        margin: 0 auto;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        
            & button{
                background-color: #fff;
                width: 150px;
                height: 40px;
                box-shadow: none;
                border: 1px solid silver;
                border-radius: 15px;
                -webkit-box-shadow: -5px 5px 3px 1px rgba(0,0,0,0.58);
                transition: all 1.0s ease;
                position: relative; 
                transform: translate(0, 0); /* Khởi tạo transform */
                cursor: pointer;
            }

            button:focus {
                background-color: #1677ff;
                box-shadow: none;
                -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.58);
                animation: moveBack 1.0s forwards; /* Thực hiện animation trong 0.5 giây */
                transform: translate(-5px, 5px); /* Di chuyển vị trí khi focus */
                border: 1px solid black;
            }

            @keyframes moveBack {
                0% {
                    transform: translate(-5px, 5px);/* Bắt đầu với vị trí đã di chuyển */
                    
                }
                100% {
                    transform: translate(0, 0); /* Quay lại vị trí ban đầu */
                    -webkit-box-shadow: -5px 5px 3px 1px rgba(0,0,0,0.58);
                    background-color: #fff;
                    border: 1px solid silver    ;
                }
            }
        }
`