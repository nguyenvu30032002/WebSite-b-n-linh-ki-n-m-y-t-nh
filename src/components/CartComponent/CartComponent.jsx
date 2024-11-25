import React, { useCallback, useEffect, useState } from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, Wrapper, WrapperAmount } from './style';
import AuthUser from '../../services/AuthUser';
import UserService from '../../services/UserService';

const CartComponent = () => {
  const {getToken} = AuthUser();
  const [carts, setCarts] = useState([]);
  const {user,getCart} = UserService();
  const [isCartLoaded, setIsCartLoaded] = useState(false); 

  const fetchCarts = useCallback(async() => {
    try {
      if (user && !isCartLoaded) { // Chỉ gọi khi có `user` và chưa tải giỏ hàng
        const dataCarts = await getCart();
        setCarts(dataCarts || []);
        setIsCartLoaded(true); // Đánh dấu giỏ hàng đã được tải
      }
    } catch (error) {
      throw error
    }
  }, [getCart, user, isCartLoaded])

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);
  // const cartLength = useMemo(() => carts.length, [carts]);

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