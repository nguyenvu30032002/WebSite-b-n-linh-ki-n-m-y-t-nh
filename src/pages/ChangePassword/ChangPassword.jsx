import React from 'react'
import { Wrapper, WrapperBody, WrapperHeader } from './style'
import Header from '../../parts/Header/Header'
import Footer from '../../parts/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const ChangPassword = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
        <WrapperHeader>
            <Header/>
        </WrapperHeader>
        <WrapperBody>
            <div>
              <label htmlFor="password">Mật khẩu mới:</label>
              <input id='password' type='password'/>
            </div>

            <div>
              <label htmlFor="enterPassword">Xác nhận mật khẩu mới:</label>
              <input id='enterPassword' type='password'/>
              
            </div>
            <div className='changePassword'>
              <Button type="primary">Đổi mật khẩu</Button>
              <Button type="primary" onClick={() => navigate('/')}>Quay lại</Button>
            </div>
        </WrapperBody>
        <Footer/>
    </Wrapper>
  )
}

export default ChangPassword