import React, { useEffect, useRef, useState } from 'react'
import { Wrapper, WrapperMessage, WrappperImage } from './styleUser'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'
import { message,Space } from 'antd'
import Input from 'antd/es/input/Input'
import UserService from '../../services/UserService'
import Pusher from 'pusher-js'

const MessageUserComponent = () => {
  const {user, messageUser} = UserService()
  const [openMessage, setOpenMessage] = useState(false)
  const endOfMessagesRef = useRef(null); // Tham chiếu đến phần tử cuối cùng của tin nhắn
  const [messages, setMessages] = useState([])
  const [messager, setMessager] = useState('')

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
    e.preventDefault()
    if(!user){
      setMessager('')
      message.error('Vui lòng đăng nhập')
      
    }
    else{
      const data = {
        user_id : user.id,
        message : messager
      }
      setMessager('')
      messageUser(data)
    }
  };

  // let allMessage = []
  useEffect(() => {
    Pusher.logToConsole = true;
  
    const pusher = new Pusher('4dda97803b66743534b3', {
      cluster: 'eu'
    });
    
    const channel = pusher.subscribe('chat');
    channel.bind('message', function(data) {
      // allMessage.push(data)
      // setMessages(allMessage)
      setMessages((prevMessages) => [...prevMessages, data]); // Thêm message mới vào mảng hiện tại
    });
  
    return () => {
      channel.unbind_all();  //  Xóa tất cả các listeners (sự kiện đã đăng ký) trên kênh chat. Điều này giúp tránh việc các sự kiện tiếp tục được gọi khi component đã bị hủy.
      channel.unsubscribe();// Ngừng đăng ký kênh chat của Pusher. Điều này ngăn không cho nhận thêm tin nhắn khi component đã bị hủy hoặc không còn cần thiết.
    }
  }, []);


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
            {
              messages.map((msg, index) => (
                <div key={index} style={{justifyContent: msg.user_id === user.id ? 'flex-end' : 'flex-start' }}>
                  <p className='mess'>
                    {msg.message}
                  </p>
                </div>
              ))
            }
                {/* <div style={{justifyContent: messages.user_id === user.id ? 'flex-end' : 'flex-start' }}>
                  <p className='mess'>
                   {messages.message}
                  </p>
                </div> */}
               
            <div ref={endOfMessagesRef} /> 
          </div>
          
          <div className='footer'>
          <Space.Compact
            style={{
              width: '100%',
            }}
          >
            <Input value={messager} onChange={(e) => setMessager(e.target.value)} onPressEnter={handleSubmit} />
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