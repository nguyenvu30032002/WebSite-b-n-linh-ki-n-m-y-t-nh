import React, { useEffect, useState } from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, WrapperAmount } from './style';
import AuthUser from '../../services/AuthUser';
import UserService from '../../services/UserService';

const CartComponent = () => {
  const {getToken} = AuthUser();
  const {carts, fetchCart} = UserService();
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const loadCart = async () => {
  //     setLoading(true);
  //     await fetchCart();
  //     setLoading(false);
  //   };
  //   loadCart();
  // }, [fetchCart]);
  return (
    <div> 
        {/* {
            carts.length > 0 ? (
              <WrapperAmount>
              {carts.length}
            </WrapperAmount>
            ) : null
          } */}
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