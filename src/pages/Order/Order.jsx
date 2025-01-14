import React, { useState } from 'react'
import Header from '../../parts/Header/Header'
import { Wrapper, WrapperBody, WrapperH1, WrapperHeader, WrapperNav, WrapperOrder, Wrappertable } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHourglassHalf, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import OrderComponent from '../../components/OrderComponent/OrderComponent';
import Footer from '../../parts/Footer/Footer';



const Order = () => {
   
    const[selectedOrderStatus, setSelectedOrderStatus] = useState('Chờ xác nhận')
  return (
    <Wrapper>
        <WrapperHeader>
            <Header/>
        </WrapperHeader>
        <WrapperBody>
            <WrapperNav>
              <span onClick={() => setSelectedOrderStatus('Chờ xác nhận')}><FontAwesomeIcon icon={faHourglassHalf} style={{margin: '0 15px 0 0'}} /> Chờ xác nhận</span>
              <span onClick={() => setSelectedOrderStatus('Đã giao')}><FontAwesomeIcon icon={faTruck} style={{margin: '0 15px 0 0'}} /> Đã giao</span>
              <span onClick={() => setSelectedOrderStatus('Đã nhận')}><FontAwesomeIcon icon={faCheck} style={{margin: '0 15px 0 0'}} /> Đã nhận</span>
              <span onClick={() => setSelectedOrderStatus('Đã hủy')}><FontAwesomeIcon icon={faXmark} style={{margin: '0 15px 0 0'}} /> Đã hủy</span>
            </WrapperNav>
            <Wrappertable>
                <WrapperH1>{selectedOrderStatus}</WrapperH1>
                <WrapperOrder>           
                   <OrderComponent selectedOrderStatus={selectedOrderStatus}/>
                </WrapperOrder>
            </Wrappertable>
        </WrapperBody>
        <Footer/>
    </Wrapper>
  )
}

export default Order