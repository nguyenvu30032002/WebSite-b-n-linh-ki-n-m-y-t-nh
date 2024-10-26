import React from 'react'
import logo from '../../assets/images/logo/logo-asus-inkythuatso-2-01-26-09-21-11.jpg'
import { WrapperLogo } from './style'
import AuthUser from '../../services/AuthUser';

const LogoComponent = () => {
  const { user } = AuthUser();
  return (
    <div>
        {
          !user && (
            <a href="/"><WrapperLogo src={logo} alt='logo'/></a>
          )
        }
        {
          user && user.role === 'User' && (
            <a href="/"><WrapperLogo src={logo} alt='logo'/></a>
          )
        }
        {
          user && user.role === 'Admin' && (
            <a href="/administrator"><WrapperLogo src={logo} alt='logo'/></a>
          )
        }
    </div>
  )
}

export default LogoComponent