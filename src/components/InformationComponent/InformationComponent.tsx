import React from 'react'
import logo from '../../assets/images/avatar/logo192.png'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { WrapperInformantion, WrapperInformantionImg } from './style';

const items: MenuProps['items'] = [
    {
      label: <>Information</>,
      key: '0',
    },
    {
      label: <>Order</>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Logout',
      key: '3',
    },
  ];

const InformationComponent = () => {
    
  return (
    <WrapperInformantion>
        <WrapperInformantionImg src={logo} alt='avatar'/>
        <Dropdown menu={{ items }} trigger={['click']}>
            <Button>
            <Space>
                asfsdgsusdhfudihudsfsdfdsdsdfd
            </Space>
            </Button>
        </Dropdown>
    </WrapperInformantion>
  )
}

export default InformationComponent