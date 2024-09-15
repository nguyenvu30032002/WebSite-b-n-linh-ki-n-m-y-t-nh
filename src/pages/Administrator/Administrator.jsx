import React from 'react'
import { Wrapper, WrapperBody, WrapperButton, WrapperHeader, WrapperNav, Wrappertable } from './style'
import Header from '../../parts/Header/Header'
import { Dropdown, Space } from 'antd'
import { DownCircleFilled } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faParachuteBox, faPeopleRoof, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

const Administrator = () => {
    const items = [
        {
          label: 'Quản trị viên',
          key: '1',
          icon: <FontAwesomeIcon icon={faPeopleRoof} />,
        },
        {
          label: 'Người dùng',
          key: '2',
          icon:<FontAwesomeIcon icon={faUser} />,
        },
        {
          label: 'Sản phẩm',
          key: '3',
          icon: <FontAwesomeIcon icon={faProductHunt} />,
        },
        {
            label: 'Loại sản phẩm',
            key: '4',
            icon: <FontAwesomeIcon icon={faFilter} />,
  
        },
        {
            label: 'Nhà cung cấp',
            key: '4',
            icon: <FontAwesomeIcon icon={faParachuteBox} /> ,
  
        },
        {
          label: 'Đơn hàng',
          key: '5',
          icon:<FontAwesomeIcon icon={faTruck} />,

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
          Quản lý
          <DownCircleFilled />
        </Space>
      </WrapperButton>
    </Dropdown>
            </WrapperNav>
            <Wrappertable>
                <h1>dfsdfsd</h1>
            </Wrappertable>
        </WrapperBody>
    </Wrapper>
  )
}

export default Administrator