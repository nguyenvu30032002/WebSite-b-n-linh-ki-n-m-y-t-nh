import React from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, WrapperAmount } from './style';
import AuthUser from '../../services/AuthUser';
import { useNavigate } from 'react-router-dom';

const CartComponent = () => {
  const {getToken} = AuthUser();
  const navigate = useNavigate();
  return (
    <div> 
        <WrapperAmount>
          1
        </WrapperAmount>
        {
          getToken() === null ? (
            <a href='/login'><WapperCart icon={faCartShopping} /></a>
          ) : (
            <a href='/cart'><WapperCart icon={faCartShopping} /></a>
          )
        }
        
    </div>
  )
}

export default CartComponent