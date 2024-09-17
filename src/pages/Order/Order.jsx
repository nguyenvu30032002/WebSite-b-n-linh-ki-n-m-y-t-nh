import React, { useState } from 'react'
import Header from '../../parts/Header/Header'
import { Wrapper, WrapperBody, WrapperButton, WrapperH1, WrapperHeader, WrapperNav, WrapperOrder, Wrappertable } from './style'
import { DownCircleFilled  } from '@ant-design/icons';
import { Dropdown, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHourglassHalf, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import OrderComponent from '../../components/OrderComponent/OrderComponent';
import Footer from '../../parts/Footer/Footer';



const Order = () => {
    const[selectedOrderStatus, setSelectedOrderStatus] = useState('Chờ xác nhận')
    const items = [
        {
          label: 'Chờ xác nhận',
          key: '1',
          icon: <FontAwesomeIcon icon={faHourglassHalf} />,
          onClick: () => setSelectedOrderStatus('Chờ xác nhận'),
        },
        {
          label: 'Đã giao',
          key: '2',
          icon: <FontAwesomeIcon icon={faTruck} />,
          onClick: () => setSelectedOrderStatus('Đã giao')
        },
        {
          label: 'Đã nhận',
          key: '3',
          icon: <FontAwesomeIcon icon={faCheck} />,
          onClick: () => setSelectedOrderStatus('Đã nhận')
        },
        {
          label: 'Đã hủy',
          key: '4',
          icon: <FontAwesomeIcon icon={faXmark} />,
          onClick: () => setSelectedOrderStatus('Đã hủy')
        },
        
      ];
    const menuProps = {
        items,
      };
  return (
    <Wrapper>
        <WrapperHeader>
            <Header/>
        </WrapperHeader>
        <WrapperBody>
            <WrapperNav>
              <Dropdown menu={menuProps}>
                <WrapperButton>
                  <Space>
                    Quản lý đơn hàng
                    <DownCircleFilled />
                  </Space>
                </WrapperButton>
              </Dropdown>
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