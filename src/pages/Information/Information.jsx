import React, { useState } from 'react';
import { Button, DatePicker, message, Radio } from 'antd';
import { Wrapper, WrapperAvatar, WrapperBody, WrapperHeader, WrapperInformation } from './style';
import Header from "../../parts/Header/Header";
import { useNavigate } from 'react-router-dom';
import Footer from '../../parts/Footer/Footer';
import avatarPlaceholder from '../../assets/images/avatar/d0tb7-copy.jpg';
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
    avatar: userFromSession?.avatar ? `${apiUrl}${userFromSession.avatar}` : avatarPlaceholder,
    date_of_birth: userFromSession?.date_of_birth ? moment(userFromSession.date_of_birth).format('YYYY-MM-DD') : null,
    newAvatarFile: null,
    newAvatarUrl: avatarPlaceholder,
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
      const imageUrl = URL.createObjectURL(file); // Hiển thị ảnh ngay khi người dùng chọn
      setUser(prevUser => ({
        ...prevUser,
        newAvatarFile: file,
        newAvatarUrl: imageUrl,  // Hiển thị ngay hình ảnh đã chọn
      }));
    }
  };

  const updateUser = async (id, userData) => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('phone', userData.phone);
    formData.append('address', userData.address);
    formData.append('gender', userData.gender);
    if (userData.newAvatarFile) {
      formData.append('avatar', userData.newAvatarFile); // Gửi avatar mới nếu có
    }
    formData.append('date_of_birth', userData.date_of_birth);

    try {
      const response = await axios.post(`${apiUrl}/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      // Cập nhật avatar trong state ngay sau khi update thành công
      const updatedAvatarUrl = response.data.avatar ? `${apiUrl}${response.data.avatar}` : avatarPlaceholder;
      setUser(prevUser => ({
        ...prevUser,
        avatar: updatedAvatarUrl,  // Cập nhật avatar hiển thị ngay lập tức
      }));

      // Cập nhật thông tin người dùng từ phản hồi để đảm bảo tất cả dữ liệu mới
      userFromSession.avatar = updatedAvatarUrl; // Cập nhật lại avatar trong session
      message.success('Thay đổi thông tin thành công');
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
      newAvatarFile: user.newAvatarFile,  // Gửi file mới nếu có
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
              src={user.newAvatarFile ? user.newAvatarUrl : user.avatar}  // Hiển thị avatar mới nếu có
              alt="avatar" 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
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
            <input type="text" name='phone' value={user.phone} onChange={handleInputChange} placeholder='3482347324' />
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
