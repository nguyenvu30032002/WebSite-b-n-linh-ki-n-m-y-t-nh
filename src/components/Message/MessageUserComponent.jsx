import React, { useEffect, useRef, useState } from 'react'
import { Wrapper, WrapperMessage, WrappperImage } from './styleUser'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'
import {  Space } from 'antd'
import Input from 'antd/es/input/Input'

const MessageUserComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [openMessage, setOpenMessage] = useState(false)
  const endOfMessagesRef = useRef(null); // Tham chiếu đến phần tử cuối cùng của tin nhắn

  const handleOpenMessage = () => {
    setOpenMessage(true)
  }
  const handleCloseMessage = () => {
    setOpenMessage(false)
  }
  useEffect(() => {
    if (openMessage) {
      endOfMessagesRef.current?.scrollIntoView();
    }
  }, [openMessage]);

/////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    console.log('Giá trị Input:', inputValue);
  };
 

  return (
    <Wrapper>
        {
          openMessage === false && (
            <WrappperImage onClick={handleOpenMessage}>
              <img src="OIP.jpg" alt="message" />
              <div>9</div>
            </WrappperImage>
          )
        }
       {
        openMessage === true && (
          <WrapperMessage>
          <div className='header'>
            <p>Chat với nhân viên tư vấn</p>
            <CloseOutlined onClick={handleCloseMessage}/>
          </div>

          <div className='main'>
            <div>
              <p className='mess'>
                sadaafdsckasjbfdfhdsf
                
              </p>
            </div>
            <div>
              <p className='mess'>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus tenetur culpa explicabo neque. Quam unde labore quaerat reiciendis totam temporibus fuga, quas laudantium nam minus quibusdam neque culpa magnam a!
              </p>
            </div>
            <div>
              <p className='mess'>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus tenetur culpa explicabo neque. Quam unde labore quaerat reiciendis totam temporibus fuga, quas laudantium nam minus quibusdam neque culpa magnam a!
              </p>
            </div>
            <div ref={endOfMessagesRef} /> 
          </div>
          
          <div className='footer'>
          <Space.Compact
            style={{
              width: '100%',
            }}
          >
            <Input onChange={(e) => setInputValue(e.target.value)} onPressEnter={handleSubmit} />
            <SendOutlined type="primary" onClick={handleSubmit}/>
          </Space.Compact>
          </div>
        </WrapperMessage>
        )
       }
    </Wrapper>
  )
}

export default MessageUserComponent