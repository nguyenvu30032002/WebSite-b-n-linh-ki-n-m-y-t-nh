import React from 'react'
import avatar from '../../assets/images/avatar/d0tb7-copy.jpg'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { WrapperInformantion, WrapperInformantionImg } from './style';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../services/AuthUser';

const InformationComponent = () => {
  const navigate = useNavigate();
  const {token, logout, getToken, getUser} = AuthUser();
  const logoutUser = () => {
    if(token !== undefined){
        logout();
    }
  }
  const user = getUser();
  const userAvt = user && user.avatar ? `http://localhost:3000/${ user.avatar}` : avatar;
  const userDisplayName =  user ? (user.name ? user.name : user.email) : null;
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
      onClick :logoutUser,
    },
   
  ];


  if (getToken() !== null && user?.role === 'Admin') {
        items.splice(1,0, {
              label: <>Quản lý</>,
              key: '1',
              onClick: () => navigate('/administrator'),
          });
  }

  if (getToken() !== null && user?.role === 'User') {
    items.splice(2, 0, {
      label: <>Đơn hàng</>,
      key: '2',
      onClick: () => navigate('/order'),
    });
  }

  
    
  return (
    <>
    {getToken() !== null ? ( // Nếu token không null, hiển thị nội dung
      <WrapperInformantion>
        <WrapperInformantionImg src={userAvt} alt="avatar" />
        <Dropdown menu={{ items }} trigger={['click']}>
          <Button>
            <Space>
              {
                userDisplayName
              }     
            </Space>
          </Button>
        </Dropdown>
      </WrapperInformantion>
    ) : ( // Nếu token null, bạn có thể render 1 nội dung khác hoặc để trống
      <WrapperInformantion> 
        <div onClick={() => navigate('/login')}>
          Đăng nhập/Đăng kí
        </div>
      </WrapperInformantion> // Hoặc render ra thông báo
    )}
  </>
);
}

export default InformationComponent