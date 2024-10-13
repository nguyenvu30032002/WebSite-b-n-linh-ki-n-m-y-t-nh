import React from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, WrapperAmount } from './style';
import AuthUser from '../../services/AuthUser';

const CartComponent = () => {
  const {getToken} = AuthUser();
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