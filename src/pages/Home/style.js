import styled from "styled-components";


export const AnimatedImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; // Chiếm toàn bộ chiều rộng của container cha
  height: 220px;
  width: 100%; // Đặt kích thước tối đa cho AnimatedImage nếu cần
  margin: 0 auto; // Căn giữa theo chiều ngang
  margin-top: 15px;

`

export const WrapperHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;
`