import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeftOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons'
import {  message, Space } from 'antd'
import Input from 'antd/es/input/Input'
import { Wrapper, WrapperMessage, WrapperMessages, WrappperImage } from './styleAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';
import Pusher from 'pusher-js'
import UserService from '../../services/UserService'

const MessageAdminComponent = () => {
    const {user, messageUser} = UserService()
    const [openMessage, setOpenMessage] = useState(false)
    const [openMessages, setOpenMessages] = useState(false)
    const endOfMessagesRef = useRef(null); // Tham chiếu đến phần tử cuối cùng của tin nhắn
    const [messages, setMessages] = useState([])
    const [messager, setMessager] = useState('')

    const handleOpenMessages = () => {
        setOpenMessages(true)
    }
    const handleCloseMessages = () => {
        setOpenMessages(false)
      }

//////////////////////////////////////////////////
    
    const handleOpenMessage = () => {
        setOpenMessage(true)
        setOpenMessages(false)
    }
    const handleCloseMessage = () => {
         setOpenMessage(false)
    }
    const handleBack = () => {
        setOpenMessages(true)
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
      channel.unbind_all();  // Dọn dẹp để tránh sự kiện bị gọi lại
      channel.unsubscribe();
    }
  }, []);
   
  return (
    <Wrapper>
    {
      openMessage === false && (
        <WrappperImage onClick={handleOpenMessages}>
          <img src="OIP.jpg" alt="message" />
          <div>9</div>
        </WrappperImage>
      )
    }
    {
        openMessages === true && (
            <WrapperMessages>
                <div className='header'>
                    <p>Chat với khách hàng</p>
                    <CloseOutlined onClick={handleCloseMessages}/>
                </div>

                <div className='main'>
                    <div onClick={handleOpenMessage}>
                    <img src="OIP.jpg" alt="user" />
                    <div className='user'>
                        <p>Nguyen Anh Vu  sfafafdfsdfsdfsfsdfs</p>
                        <span>tin nhan sdfsfsdfsfsdfdsfsd</span>
                    </div>
                    <FontAwesomeIcon  icon={faCircleSolid} bounce style={{color: "#1fe31c", margin: '0 20px 0 0'}} />
                    </div>

                   
                </div>
            
             </WrapperMessages>
        )
    }
   {
    openMessage === true && (
      <WrapperMessage>
      <div className='header'>
        <ArrowLeftOutlined onClick={handleBack}/>
        <p>Chat với khách hàng</p>
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

export default MessageAdminComponent