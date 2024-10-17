import React, { useEffect, useState } from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, WrapperAmount } from './style';
import AuthUser from '../../services/AuthUser';
import UserService from '../../services/UserService';

const CartComponent = () => {
  const {getToken} = AuthUser();
  const {carts} = UserService();
  return (
    <div> 
          {
            getToken() !== null && carts.length > 0 && (
              <WrapperAmount>
              {carts.length}
            </WrapperAmount>
            ) 
          }
        {
          getToken() !== null ? (
            <a href='/cart'><WapperCart icon={faCartShopping} /></a>
          ) : null
        }
        
    </div>
  )
}

export default CartComponent