import React, { useCallback, useEffect, useState } from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, WrapperAmount } from './style';
import AuthUser from '../../services/AuthUser';
import UserService from '../../services/UserService';

const CartComponent = () => {
  const {getToken} = AuthUser();
  const [user, setUser] = useState([]);
  const [carts, setCarts] = useState([]);
  const {getUser,getCart} = UserService();

  const fetchUser = useCallback(async() =>{
    try{
      const dataUser = await getUser()
      setUser(dataUser)
    }catch(error){
      throw error
    }
  },[getUser])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const fetchCarts = useCallback(async() => {
    try{
      const dataCarts = await getCart();
      setCarts(dataCarts || [])
    }catch(error){
      throw error
    }
  }, [getCart])

  useEffect(() => {
    if (user) {
      fetchCarts();
    }
  }, [user,fetchCarts])
  // const cartLength = useMemo(() => carts.length, [carts]);

  return (
    <div> 
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
        
    </div>
  )
}

export default CartComponent