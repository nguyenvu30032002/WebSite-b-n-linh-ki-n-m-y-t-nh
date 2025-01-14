import React, { useCallback, useEffect } from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, Wrapper, WrapperAmount } from './style';
import AuthUser from '../../services/AuthUser';
import UserService from '../../services/UserService';
import { setCart } from '../../store/Action';
import { useDispatch, useSelector } from 'react-redux';

const CartComponent = () => {
  const {getToken} = AuthUser();
  // const [carts, setCarts] = useState([]);
  const {user, getCart} = UserService();
  const dispatch = useDispatch();
  const cartCount  = useSelector((state) => state.carts); 

  const fetchCarts = useCallback(async() => {
    try {
      if (user) { 
        const dataCarts = await getCart(user.id);
        dispatch(setCart(dataCarts.length));
      }
    } catch (error) {
      throw error
    }
  }, [getCart, user, dispatch])

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);
  return (
    <Wrapper> 
          {
            user && cartCount> 0 && (
              <WrapperAmount>
              {cartCount}
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