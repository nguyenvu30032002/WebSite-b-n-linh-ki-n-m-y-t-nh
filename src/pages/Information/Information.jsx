import React, { useState } from 'react';
import { Button, DatePicker, message, Radio } from 'antd';
import { Wrapper, WrapperAvatar, WrapperBody, WrapperHeader, WrapperInformation } from './style';
import Header from "../../parts/Header/Header";
import { useNavigate } from 'react-router-dom';
import Footer from '../../parts/Footer/Footer';
import img from '../../assets/images/avatar/d0tb7-copy.jpg'
import AuthUser from '../../services/AuthUser';
import moment from 'moment';
import axios from 'axios';

const Information = () => {
  const { getUser, token } = AuthUser();
  const userFromSession = getUser();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({
    name: userFromSession?.name || '',
    phone: userFromSession?.phone || '',
    address: userFromSession?.address || '',
    gender: userFromSession?.gender || '',
    avatar: userFromSession?.avatar || img ,
    date_of_birth: userFromSession?.date_of_birth ? moment(userFromSession.date_of_birth).format('YYYY-MM-DD') : null,
    newAvatarName: userFromSession?.avatar || '',  // Lưu tên hình ảnh
    newAvatarPreviewUrl: null,  // URL xem trước hình ảnh
  });

  const onDate = (date, dateString) => {
    setUser(prevUser => ({
      ...prevUser,
      date_of_birth: dateString 
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setUser(prevUser => ({
      ...prevUser,
      gender: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  };

  const onImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prevUser => ({
          ...prevUser,
          newAvatarName: file.name,       // Lưu tên hình ảnh
          newAvatarPreviewUrl: reader.result,  // Lưu URL xem trước
        }));
      };
      reader.readAsDataURL(file); // Đọc file và chuyển thành Base64
    }
  };

  const updateUser = async (id, userData) => {
    const updateData = {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      gender: userData.gender,
      avatar: userData.newAvatarName,  // Chỉ gửi tên hình ảnh
      date_of_birth: userData.date_of_birth
    };

    try {
      const response = await axios.post(`${apiUrl}/update/${id}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      message.success('Thay đổi thông tin thành công');
      return response;
    } catch (error) {
      message.error('Thay đổi thất bại');
    }
  };

  const handleSubmit = () => {
    const id = userFromSession?.id;
    const userData = {
      name: user.name || userFromSession?.name,
      phone: user.phone || userFromSession?.phone,
      address: user.address || userFromSession?.address,
      gender: user.gender || userFromSession?.gender,
      newAvatarName: user.newAvatarName,  // Gửi tên file ảnh
      date_of_birth: user.date_of_birth || userFromSession?.date_of_birth,
    };

    updateUser(id, userData);
  };

  return (
    <Wrapper>
      <WrapperHeader>
        <Header />
      </WrapperHeader>
      <WrapperBody>
        <WrapperAvatar>
          <div className='avatar'>
            <img 
              src={user.newAvatarPreviewUrl ? user.newAvatarPreviewUrl : `http://localhost:3000${user.avatar}`}
              alt="avatar" 
              style={{ objectFit: 'cover' }} 
            />
            <div className='changeAvatar'>
              <label htmlFor="fileAvatar">Thay đổi avatar</label>
              <input id='fileAvatar' onChange={onImg} type="file" accept="image/*" />
            </div>
          </div>
        </WrapperAvatar>
        <WrapperInformation>
          <div>
            <label>Email: </label>
            <input className='inputEmail' type="email" name='email' value={userFromSession?.email} disabled />
          </div>

          <div>
            <label>Nickname: </label>
            <input type="text" name='name' value={user.name} onChange={handleInputChange} />
          </div>

          <div>
            <label>Ngày sinh: </label>
            <DatePicker
              name='date_of_birth'
              className='date'
              onChange={onDate}
              value={user.date_of_birth ? moment(user.date_of_birth) : null}
            />
          </div>

          <div>
            <label>Giới tính: </label>
            <Radio.Group name='gender' onChange={handleGenderChange} value={user.gender}>
              <Radio value='Nam'>Nam</Radio>
              <Radio value='Nữ'>Nữ</Radio>
              <Radio value='Khác'>Khác</Radio>
            </Radio.Group>
          </div>

          <div>
            <label>Số điện thoại: </label>
            <input type="text" name='phone' value={user.phone} onChange={handleInputChange} placeholder='Số điện thoại' />
          </div>

          <div>
            <label>Địa chỉ: </label>
            <input type="text" name='address' value={user.address} onChange={handleInputChange} />
          </div>

          <div className='button'>
            <Button onClick={handleSubmit} type="primary">Lưu thay đổi</Button>
            <Button type="primary" onClick={handleHome}>Quay lại</Button>
          </div>
        </WrapperInformation>
      </WrapperBody>
      <Footer />
    </Wrapper>
  );
};

export default Information;
