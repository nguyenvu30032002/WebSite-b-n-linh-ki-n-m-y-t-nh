import React, { useState } from 'react'
import { Wrapper, WrapperBody, WrapperButton, WrapperHeader, WrapperNav, Wrappertable } from './style'
import Header from '../../parts/Header/Header'
import { Dropdown, Space } from 'antd'
import { DownCircleFilled } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faParachuteBox, faPeopleRoof, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import AdminPage from './AdminPage'
import OrderPage from './OrderPage'
import UserPage from './UserPage'
import ProductPage from './ProductPage'
import CategoriesPage from './CategoriesPage'

const Administrator = () => {
  const [selectedPage, setSelectedPage] = useState('admin');
    const items = [
        {
          label: 'Quản trị viên',
          key: '1',
          icon: <FontAwesomeIcon icon={faPeopleRoof} />,
          onClick: () => setSelectedPage('admin'),
        },
        {
          label: 'Người dùng',
          key: '2',
          icon:<FontAwesomeIcon icon={faUser} />,
          onClick: () => setSelectedPage('user'),
        },
        {
          label: 'Sản phẩm',
          key: '3',
          icon: <FontAwesomeIcon icon={faProductHunt} />,
          onClick: () => setSelectedPage('product'),
        },
        {
            label: 'Loại sản phẩm',
            key: '4',
            icon: <FontAwesomeIcon icon={faFilter} />,
            onClick: () => setSelectedPage('category'),
        },
        {
            label: 'Nhà cung cấp',
            key: '5',
            icon: <FontAwesomeIcon icon={faParachuteBox} /> ,
            onClick: () => setSelectedPage('supplier'),
        },
        {
          label: 'Đơn hàng',
          key: '6',
          icon:<FontAwesomeIcon icon={faTruck} />,
          onClick: () => setSelectedPage('order'),
        },
      ];
    const menuProps = {
        items,
      };

      const renderContent = () => {
        switch (selectedPage) {
            case 'admin':
                return <AdminPage />;
            case 'user':
                return <UserPage/>;
            case 'product':
                return <ProductPage/>;
            case 'category':
                return <CategoriesPage/>;
            case 'supplier':
                return <div>Thông tin Nhà cung cấp</div>;
            case 'order':
                return <OrderPage/>;
            default:
                return <h1>Vui lòng chọn một mục để quản lý</h1>;
        }
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
                    Quản lý
                    <DownCircleFilled />
                  </Space>
                </WrapperButton>
              </Dropdown>
            </WrapperNav>
            <Wrappertable>
                {renderContent()}
            </Wrappertable>
        </WrapperBody>
    </Wrapper>
  )
}

export default Administrator