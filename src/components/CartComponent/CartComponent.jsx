import React, { useCallback, useEffect, useState } from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, Wrapper, WrapperAmount } from './style';
import AuthUser from '../../services/AuthUser';
import UserService from '../../services/UserService';

const CartComponent = () => {
  const {getToken} = AuthUser();
  const [carts, setCarts] = useState([]);
  const {user, getCart} = UserService();

  const fetchCarts = useCallback(async() => {
    try {
      if (user) { 
        const dataCarts = await getCart(user.id);
        setCarts(dataCarts || []);
      }
    } catch (error) {
      throw error
    }
  }, [getCart, user])

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);
  return (
    <Wrapper> 
          {
            user && carts.length > 0 && (
              <WrapperAmount>
              {carts.length}
            </WrapperAmount>
            ) 
          }
          {
            getToken() && (
              <a href='/cart'><WapperCart icon={faCartShopping} /></a>
            ) 
          }
        
    </Wrapper>
  )
}

export default CartComponent