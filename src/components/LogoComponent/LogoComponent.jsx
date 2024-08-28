import React from 'react'
import logo from '../../assets/images/logo/logo-asus-inkythuatso-2-01-26-09-21-11.jpg'
import { WrapperLogo } from './style'

const LogoComponent = () => {
  return (
    <div>
        <a href="h"><WrapperLogo src={logo} alt='logo'/></a>
    </div>
  )
}

export default LogoComponent