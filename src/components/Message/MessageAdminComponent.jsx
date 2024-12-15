import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeftOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons'
import {  message, Space } from 'antd'
import Input from 'antd/es/input/Input'
import img from '../../assets/images/avatar/d0tb7-copy.jpg'
import { Wrapper, WrapperMessage, WrapperMessages, WrappperImage } from './styleAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Pusher from 'pusher-js'
import UserService from '../../services/UserService'
import AdminService from '../../services/AdminService'

const MessageAdminComponent = () => {
    const {user} = UserService()
    const {getMessageUser, getUserMessage, readMessage, sendMessageAdmin, notReadMessage} = AdminService()
    const [openMessage, setOpenMessage] = useState(false)
    const [openMessages, setOpenMessages] = useState(false)
    const endOfMessagesRef = useRef(null); // Tham chiếu đến phần tử cuối cùng của tin nhắn
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([])
    const [messager, setMessager] = useState('')
    const [messageUser, setMessageUser] = useState([])
    const [userMessage, setUserMessage] = useState([])
    const [notReadMessages, setNotReadMessages] = useState([])
    const [user_id, setUser_id] = useState('')

  const fetchGetMessageUser = useCallback(async() => {
    setIsLoading(true);
    try{
      const data = await getMessageUser()
      setMessageUser(data)
    }
    catch(error){
      throw error
    }
    finally {
      setIsLoading(false); 
    }
  }, [getMessageUser])

  useEffect(() => {
    if(openMessages){
      fetchGetMessageUser()
    }
    
  }, [fetchGetMessageUser, openMessages])

  /////////////////////////////////////

  const fetchUserMessage = useCallback(async(id) => {
    try{
      if(id){
        const data = await getUserMessage(id)
        setUserMessage(data)
      }
    }
    catch(error){
      throw error
    }
    finally {
      setIsLoading(false); 
    }
  }, [getUserMessage])

  useEffect(() => {
    fetchUserMessage()
  }, [fetchUserMessage])

  ///////////////////////

   const fetchReadMessage = useCallback(async(id) => {
    try{
      if(id){
        await readMessage(id) 
      }
    }
    catch(error){
      throw error
    }
   }, [readMessage])
  
   useEffect(() => {
    fetchReadMessage();
    if(openMessage && user_id)
    {
      fetchReadMessage();
    }
   },[fetchReadMessage, openMessage, user_id])

   const fetchNotReadMessage = useCallback(async() => {
    try{
      const data = await notReadMessage()
      setNotReadMessages(data)
    }
    catch(error)
    {
      throw error
    }
   }, [notReadMessage])

   useEffect(() => {
    fetchNotReadMessage()
   }, [fetchNotReadMessage])
 
/////////////////////////////////////////////////////////////////////////////////////////

    const handleOpenMessages = () => {
        fetchGetMessageUser()
        setOpenMessages(true)
    }
    const handleCloseMessages = () => {
        fetchNotReadMessage()
        setOpenMessages(false)
      }

//////////////////////////////////////////////////
    
    const handleOpenMessage = (id) => {
        setMessages([])
        setUser_id(id)
        fetchReadMessage(id)
        fetchUserMessage(id)
        setOpenMessage(true)
        setOpenMessages(false)
    }
    const handleCloseMessage = () => {
        setMessages([])
        fetchNotReadMessage()
        setOpenMessage(false)
    }
    const handleBack = () => {
        fetchGetMessageUser()
        setMessages([])
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
    fetchReadMessage()
    if (!messager.trim()) {
      message.error('Tin nhắn không được để trống');
      return; 
    }
      const data = {
        user_id : user_id,
        message : messager,
        admin_id : user.id
      }
      setMessager('')
      sendMessageAdmin(data)
  };

  // let allMessage = []
  useEffect(() => {
    Pusher.logToConsole = true;
  
    const pusher = new Pusher('4dda97803b66743534b3', {
      cluster: 'eu'
    });
    
    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      setMessages((prevMessages) => [...prevMessages, data]);  // Cập nhật mảng tin nhắn mới
    });
  
    return () => {
      channel.unbind_all();  // Dọn dẹp để tránh sự kiện bị gọi lại
      channel.unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
    {
      openMessages === false && openMessage === false  && (
        <WrappperImage onClick={handleOpenMessages}>
          <img src="OIP.jpg" alt="message" />
          {
                notReadMessages.some(msgs => msgs.is_from_user === 1 && msgs.is_read === 0) && (
                  <div>{notReadMessages.filter(msgs => msgs.is_from_user === 1 && msgs.is_read === 0).length}</div>
                )
              }
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
                  {
                     isLoading === true ? 
                     (
                        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent:' center', alignItems: 'center'}}>
                          <FontAwesomeIcon icon={faSpinner} spin  style={{color: "#74C0FC", fontSize: '40px'}}  />
                        </div>
                                  
                     ) : (
                    messageUser.map((msg) => (
                      <div key={msg.id} onClick={() => handleOpenMessage(msg.id)}>
                        <img src={msg?.avatar ? msg.avatar : img} alt="user" />
                        <div className='user'>
                            <p>{msg.name}</p>
                            {/* {
                              messages && messages.some((message) => message.user_id === msg.id) ? (   
                                // Lọc tin nhắn của người dùng hiện tại và sắp xếp theo thời gian gửi mới nhất
                                messages
                                .filter((message) => message.user_id === msg.id)
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))  // Sắp xếp theo thời gian
                                .slice(0, 1)  // Lấy tin nhắn mới nhất
                                .map((message, index) => (
                                  <span key={message.created_at} style={{ fontWeight: '600' }}>
                                    {message.message}
                                  </span>
                                ))
                              ) : ( */}
                              {
                                msg.latest_product_id ? (
                                  <span style={{fontWeight: msg.latest_message_is_read === 0 ? '600' : '400'}}>Đã gửi một hình ảnh</span>
                                ) : (
                                  msg.latest_message && (
                                    <span style={{fontWeight: msg.latest_message_is_read === 0 ? '600' : '400'}}>{msg.latest_message}</span>
                                  )
                                )
                              }
                              {/* ) */}
                            
                            
                        </div>
                        {
                          msg.latest_message_is_read === 0 && (
                            <FontAwesomeIcon  icon={faCircleSolid} bounce style={{color: "#1fe31c", margin: '0 20px 0 0'}} />
                          )
                        }
                      </div>  
                    ))
                  )
                  }
                      
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
                     isLoading ? (
                      <div style={{width: '100%', height: '100%', display: 'flex', justifyContent:' center', alignItems: 'center'}}>
                          <FontAwesomeIcon icon={faSpinner} spin  style={{color: "#74C0FC", fontSize: '40px'}}  />
                      </div>
                      
                     ) :  (
                      userMessage.map((msg, index) => (
                        <div key={index} style={{justifyContent: msg.is_from_admin ? 'flex-end' : 'flex-start' }}>
                          {
                            (msg?.message) && (
                              <p className='mess'>
                                {msg.message}
                              </p>
                            )
                          }
                         {
                          (msg?.product_id) && (
                            <div className='product'>
                                <div className='product_info'>
                                  <img src={msg.created_by_product.image} alt="" />
                                  <div className='name_price'>
                                    <span className='name'>{msg.created_by_product.name}</span>
                                    <span className='oldPrice'>{Number(msg.created_by_product.price).toLocaleString('vi-VN')}đđ</span>
                                    <span className='newPrice'>{Number((msg.created_by_product.price) - (msg.created_by_product.price * (msg.created_by_product.discount / 100))).toLocaleString('vi-VN')}đ</span>
                                  </div>
                                </div>
                            </div>
                          )
                         }
                        </div>
                      ))
                     )
                    } 
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