import React from 'react'
import logo from '../../assets/images/avatar/logo192.png'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { WrapperInformantion, WrapperInformantionImg } from './style';
import { useNavigate } from 'react-router-dom';

const InformationComponent = () => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: <>Thông tin tài khoản</>,
      key: '0',
      onClick: () => navigate('/information'),
    },
    {
      label: <>Đơn hàng</>,
      key: '1',
      
    },
    {
      label: <>Đổi mật khẩu</>,
      key: '2',
      
    },
    // {
    //   type: 'divider',
    // },
    {
      label: 'Đăng xuất',
      key: '3',
    },
  ];
    
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