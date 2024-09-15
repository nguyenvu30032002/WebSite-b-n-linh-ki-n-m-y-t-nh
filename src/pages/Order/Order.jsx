import React, { useState } from 'react'
import Header from '../../parts/Header/Header'
import { Wrapper, WrapperBody, WrapperButton, WrapperH1, WrapperHeader, WrapperNav, WrapperOrder, Wrappertable } from './style'
import { DownCircleFilled  } from '@ant-design/icons';
import { Dropdown, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHourglassHalf, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import OrderComponent from '../../components/OrderComponent/OrderComponent';


const Order = () => {
    const[selectedOrderStatus, setSelectedOrderStatus] = useState('Chờ xác nhận')
    const items = [
        {
          label: 'Chờ xác nhận',
          key: '1',
          icon: <FontAwesomeIcon icon={faHourglassHalf} />,
          onclick: () => setSelectedOrderStatus('Chờ xác nhận'),
        },
        {
          label: 'Đã giao',
          key: '2',
          icon: <FontAwesomeIcon icon={faTruck} />,
          onclick: () => setSelectedOrderStatus('Đã giao')
        },
        {
          label: 'Đã nhận',
          key: '3',
          icon: <FontAwesomeIcon icon={faCheck} />,
          onclick: () => setSelectedOrderStatus('Đã nhận')
        },
        {
          label: 'Đã hủy',
          key: '4',
          icon: <FontAwesomeIcon icon={faXmark} />,
          onclick: () => setSelectedOrderStatus('Đã hủy')
        },
        
      ];
    const menuProps = {
        items,
      };

      // const ordersData = {
      //   'Chờ xác nhận': ['Order #123', 'Order #124', 'Order #125'],
      //   'Đã giao': ['Order #111', 'Order #112'],
      //   'Đã hủy': ['Order #101', 'Order #102'],
      // };

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
                   <OrderComponent/>
                </WrapperOrder>
            </Wrappertable>
        </WrapperBody>
    </Wrapper>
  )
}

export default Order