import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Wrapper, WrapperMessage, WrappperImage } from './styleUser'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'
import { message,Select,Space } from 'antd'
import Input from 'antd/es/input/Input'
import UserService from '../../services/UserService'
import Pusher from 'pusher-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const MessageUserComponent = () => {
  const {user, messageUser, getMessageUser,readMessage} = UserService()
  const [openMessage, setOpenMessage] = useState(false)
  const endOfMessagesRef = useRef(null); // Tham chiếu đến phần tử cuối cùng của tin nhắn
  const [messages, setMessages] = useState([])
  const [messager, setMessager] = useState('')
  const [getMessages, setGetMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [chatWithAdmin, setChatWithAdmin] = useState(false)
  const [chatWithAi, setChatWithAi] = useState(false)
  const [userQuestion, setUserQuestion] = useState([])

  const handleOpenMessage = () => {
    if(user){
      fetchMessageUser()
    }
    setChatWithAdmin(true)
    setOpenMessage(true)
  }
  const handleCloseMessage = () => {
    if(user){
      fetchMessageUser();
    }
    setUserQuestion([])
    setMessages([])
    setChatWithAdmin(false)
    setChatWithAi(false)
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
    if (!messager.trim()) {
      message.error('Tin nhắn không được để trống');
      return; // Dừng hàm nếu điều kiện không đạt
    }
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
    if(user){
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
      
    }
    
  }, [user]);

 //////////////////////////////////////////////////////
 
 const fetchMessageUser = useCallback(async() => {
  try{
    const data = await getMessageUser(user.id)
    setGetMessages(data)
  }
  catch(error){
    throw error
  }
  finally {
    setIsLoading(false); 
  }
 }, [getMessageUser,user.id])

 useEffect(() => {
  fetchMessageUser();
 },[fetchMessageUser])

 ///////////////////////////////

 const fetchReadMessage = useCallback(async() => {
  try{
    await readMessage(user.id) 
  }
  catch(error){
    throw error
  }
 }, [readMessage,user.id])

 useEffect(() => {
  if(user && openMessage)
  {
    fetchReadMessage();
  }
 },[fetchReadMessage, user, openMessage])

///////////////////////////////////////////////////////////////////////////////////////////////


const handleChange = (value) => {
  if(value === 'Chat với nhân viên tư vấn')
  {
    setChatWithAi(false)
    setChatWithAdmin(true)
  }
  else{
    setChatWithAdmin(false)
    setChatWithAi(true)
  }
};

const handleSubmitAI = (e) => {
  e.preventDefault()
  if (!messager.trim()) {
    message.error('Tin nhắn không được để trống');
    return; // Dừng hàm nếu điều kiện không đạt
  }
  if(!user){
    setMessager('')
    message.error('Vui lòng đăng nhập')
    
  }
  else{
    // const data = {
    //   user_id : user.id,
    //   message : messager
    // }
    // setMessager('')
    // messageUser(data)
    setMessager('')
    setUserQuestion([...userQuestion, messager])
  }
};

  return (
    <Wrapper>
        {
          openMessage === false && (
            <WrappperImage onClick={handleOpenMessage}>
              <img src="OIP.jpg" alt="message" />
              {
                getMessages.some(msg => msg.is_from_admin === 1 && msg.is_read === 0) && (
                  <div>{getMessages.filter(msg => msg.is_from_admin === 1 && msg.is_read === 0).length}</div>
                )
              }
            </WrappperImage>
          )
        }
       {
        openMessage === true && (
          <WrapperMessage>
          <div className='header'>
            <p>
              <Select
                defaultValue="Chat với nhân viên tư vấn"
                style={{
                  width: 220,
                }}
                onChange={handleChange}
                options={[
                  { value: 'Chat với nhân viên tư vấn', label: 'Chat với nhân viên tư vấn' },
                  { value: 'Chat với AI', label: 'Chat với AI' },
                  
                ]}
              />
              
            </p>
            <CloseOutlined onClick={handleCloseMessage}/>
          </div>

          {
            chatWithAdmin === true && (
              <>
                <div className='main'>
            
                  {
                  isLoading ? (
                    <div style={{width: '100%', height: '100%', display: 'flex', justifyContent:' center', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faSpinner} spin  style={{color: "#74C0FC", fontSize: '40px'}}  />
                    </div>
                    
                  ) : getMessages.length === 0 &&  messages.length === 0 ? (
                      <div style={{width: '100%', height: '100%', display: 'flex', justifyContent:' center', alignItems: 'center'}}>
                        <p>Không có tin nhắn</p>
                      </div>
                  ) :  (
                    getMessages.map((msg, index) => (
                      <div key={index} style={{justifyContent: msg.is_from_user ? 'flex-end' : 'flex-start' }}>
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
                                  <span className='oldPrice'>{Number(msg.created_by_product.price).toLocaleString('vi-VN')}</span>
                                  <span className='newPrice'>{Number((msg.created_by_product.price) - (msg.created_by_product.price * (msg.created_by_product.discount / 100))).toLocaleString('vi-VN')}</span>
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
              </>
            )
          }
          {
            chatWithAi === true && (
              <>
                <div className='main'>
            
                  {/* {
                  isLoading ? (
                    <div style={{width: '100%', height: '100%', display: 'flex', justifyContent:' center', alignItems: 'center'}}>
                        <FontAwesomeIcon icon={faSpinner} spin  style={{color: "#74C0FC", fontSize: '40px'}}  />
                    </div>
                    
                  ) : getMessages.length === 0 &&  messages.length === 0 ? (
                      <div style={{width: '100%', height: '100%', display: 'flex', justifyContent:' center', alignItems: 'center'}}>
                        <p>Không có tin nhắn</p>
                      </div>
                  ) :  (
                    getMessages.map((msg, index) => (
                      <div key={index} style={{justifyContent: msg.is_from_user ? 'flex-end' : 'flex-start' }}>
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
                                  <span className='oldPrice'>{Number(msg.created_by_product.price).toLocaleString('vi-VN')}</span>
                                  <span className='newPrice'>{Number((msg.created_by_product.price) - (msg.created_by_product.price * (msg.created_by_product.discount / 100))).toLocaleString('vi-VN')}</span>
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
                  }      */}
                      <div style={{justifyContent: 'flex-start' , alignItems: 'center' }}>
                        <img style={{width: '35px', height: '35px', margin: '0 -20px 0 0'}} src="./robot-chatbot-icon-sign-free-vector.jpg" alt="chat bot" />
                        <p className='mess'>
                          Tôi có thể giúp gì cho bạn
                        </p>
                      </div>
                      {userQuestion.map((question, index) => (
                          <div 
                              key={index} 
                              style={{ justifyContent: 'flex-end', alignItems: 'center' }}
                          >
                              <p className='mess'>
                                  {question}
                              </p>
                          </div>
                      ))}
                  <div ref={endOfMessagesRef} />               
                  </div>
                
                <div className='footer'>
                  <Space.Compact
                    style={{
                      width: '100%',
                    }}
                  >
                    <Input value={messager} onChange={(e) => setMessager(e.target.value)} onPressEnter={handleSubmitAI} />
                    <SendOutlined type="primary" onClick={handleSubmitAI}/>
                  </Space.Compact>
                </div>
              </>
            )
          }
        </WrapperMessage>
        )
       }
    </Wrapper>
  )
}

export default MessageUserComponent