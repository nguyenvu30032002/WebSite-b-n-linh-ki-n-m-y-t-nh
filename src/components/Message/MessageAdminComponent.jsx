import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeftOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons'
import {  Space } from 'antd'
import Input from 'antd/es/input/Input'
import { Wrapper, WrapperMessage, WrapperMessages, WrappperImage } from './styleAdmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';
const MessageAdminComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [openMessage, setOpenMessage] = useState(false)
    const [openMessages, setOpenMessages] = useState(false)
    const endOfMessagesRef = useRef(null); // Tham chiếu đến phần tử cuối cùng của tin nhắn
  

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
      console.log('Giá trị Input:', inputValue);
    };
   
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

                    <div>
                    <img src="OIP.jpg" alt="user" />
                    <div className='user'>
                        <p>Nguyen Anh Vu  sfafafdfsdfsdfsfsdfs</p>
                        <span>tin nhan sdfsfsdfsfsdfdsfsd</span>
                    </div>
                    </div>

                    <div>
                    <img src="OIP.jpg" alt="user" />
                    <div className='user'>
                        <p>Nguyen Anh Vu  sfafafdfsdfsdfsfsdfs</p>
                        <span>tin nhan sdfsfsdfsfsdfdsfsd</span>
                    </div>
                    </div>

                    <div>
                    <img src="OIP.jpg" alt="user" />
                    <div className='user'>
                        <p>Nguyen Anh Vu  sfafafdfsdfsdfsfsdfs</p>
                        <span>tin nhan sdfsfsdfsfsdfdsfsd</span>
                    </div>
                    </div>
                    <div>
                    <img src="OIP.jpg" alt="user" />
                    <div className='user'>
                        <p>Nguyen Anh Vu  sfafafdfsdfsdfsfsdfs</p>
                        <span>tin nhan sdfsfsdfsfsdfdsfsd</span>
                    </div>
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

export default MessageAdminComponent