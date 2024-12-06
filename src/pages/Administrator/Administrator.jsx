import React, { useState } from 'react'
import { WapperHeader, Wrapper, WrapperBody, WrapperHeader, WrapperNav, Wrappertable } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faParachuteBox, faPeopleRoof, faSliders, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import AdminPage from './AdminPage'
import OrderPage from './OrderPage'
import UserPage from './UserPage'
import ProductPage from './ProductPage'
import CategoriesPage from './CategoriesPage'
import LogoComponent from '../../components/LogoComponent/LogoComponent'
import InformationComponent from "../../components/InformationComponent/InformationComponent.tsx";
import Suppliers from './Suppliers.jsx';
import Variants from './Variants.jsx';
import MessageAdminComponent from '../../components/Message/MessageAdminComponent.jsx';

const Administrator = () => {
  const [selectedPage, setSelectedPage] = useState('admin');
   
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
                return <Suppliers/>;
            case 'order':
                return <OrderPage/>;
            case 'variants':
                return <Variants/>    
            default:
                return <h1>Vui lòng chọn một mục để quản lý</h1>;
        }
    };
  return (
    <Wrapper>
        <WrapperHeader>
        <WapperHeader>
            <LogoComponent/>
            <InformationComponent/>
        </WapperHeader>
        </WrapperHeader>
        <WrapperBody>
            <WrapperNav>
              <span onClick={() => setSelectedPage('admin')}><FontAwesomeIcon icon={faPeopleRoof} style={{margin: '0 15px 0 0'}} /> Quản trị viên</span>
              <span onClick={() => setSelectedPage('user')}><FontAwesomeIcon icon={faUser} style={{margin: '0 15px 0 0'}} /> Người dùng</span>
              <span onClick={() => setSelectedPage('product')}><FontAwesomeIcon icon={faProductHunt} style={{margin: '0 15px 0 0'}} /> Sản phẩm</span>
              <span onClick={() => setSelectedPage('category')}><FontAwesomeIcon icon={faFilter} style={{margin: '0 15px 0 0'}} /> Loại sản phẩm</span>
              <span onClick={() => setSelectedPage('variants')}><FontAwesomeIcon icon={faSliders} style={{margin: '0 15px 0 0'}} /> Phân loại sản phẩm</span>
              <span onClick={() => setSelectedPage('supplier')}><FontAwesomeIcon icon={faParachuteBox} style={{margin: '0 15px 0 0'}} /> Nhà cung cấp</span>
              <span onClick={() => setSelectedPage('order')}><FontAwesomeIcon icon={faTruck} style={{margin: '0 15px 0 0'}} /> Đơn hàng</span>
              
            </WrapperNav>
            <Wrappertable>
                {renderContent()}
            </Wrappertable>
        </WrapperBody>
        <MessageAdminComponent/>
    </Wrapper>
  )
}

export default Administrator