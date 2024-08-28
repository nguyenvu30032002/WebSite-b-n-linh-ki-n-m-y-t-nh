import React from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { WapperCart, WrapperAmount } from './style';

const CartComponent = () => {
  return (
    <div> 
        <WrapperAmount>
          1
        </WrapperAmount>
        <a href='h'><WapperCart icon={faCartShopping} /></a>
        
    </div>
  )
}

export default CartComponent