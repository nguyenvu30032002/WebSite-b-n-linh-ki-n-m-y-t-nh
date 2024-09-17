import React from 'react'
import logo from '../../assets/images/avatar/logo192.png'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { WrapperInformantion, WrapperInformantionImg } from './style';
import { useNavigate } from 'react-router-dom';

const InformationComponent = () => {
  const navigate = useNavigate();
  const role = 'user'
  const role1 = 'admin'
  const items: MenuProps['items'] = [
    {
      label: <>Thông tin tài khoản</>,
      key: '0',
      onClick: () => navigate('/information'),
    }, 
    {
      label: <>Đổi mật khẩu</>,
      key: '3',
      onClick: () => navigate('/changePassword')
    },
    // {
    //   type: 'divider',
    // },
    {
      label: 'Đăng xuất',
      key: '4',
    },
   
  ];

  if(role1 === 'admin'){
    items.splice(1,0, {
      label: <>Quản lý</>,
      key: '1',
      onClick: () => navigate('/administrator'),
    });
  }
  
  if(role === 'user'){
    items.splice(2,0, {
        label: <>Đơn hàng</>,
        key: '2',
        onClick: () => navigate('/order'),
    });
  }
    
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