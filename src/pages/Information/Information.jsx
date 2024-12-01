import React, { useCallback, useEffect, useState } from 'react';
import { Button, DatePicker, message, Radio } from 'antd';
import { Wrapper, WrapperAvatar, WrapperBody, WrapperHeader, WrapperInformation } from './style';
import Header from "../../parts/Header/Header";
import { useNavigate } from 'react-router-dom';
import Footer from '../../parts/Footer/Footer';
import img from '../../assets/images/avatar/d0tb7-copy.jpg'
import AuthUser from '../../services/AuthUser';
import moment from 'moment';
import UserService from '../../services/UserService';

const Information = () => {
  const { token } = AuthUser();
  const {getUser, updateUser} = UserService()
  const [file, setFile] = useState('')
  const [user, setUser] = useState({
    email: '',
    name: '',
    date_of_birth: null,
    gender: '',
    phone: '',
    address: '',
    avatar: ''
  });

  const fetchUser = useCallback(async() => {
    try{
      const data = await getUser()
      setUser(data)
    }
    catch(error){
      throw error
    }
  }, [getUser])

  useEffect(() => {
    if(token){
      fetchUser()
    }
  }, [fetchUser, token])

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
    setFile(file.name)
  };


  const handleSubmit = () => {
    const id = user?.id;
    const data = {
      name: user.name,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      avatar: file, 
      date_of_birth: user.date_of_birth 
    };
    console.log(data)
    updateUser(id, data)
    .then((response) => {
      const data = response.data
      if(data.message === 'success'){
        fetchUser()
        message.success('Thay đổi thông tin thành công')
      }
      else{
        fetchUser()
        message.error('Thay đổi thông tin thất bại')
      }
    })
    .catch((error) => {
      fetchUser()
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    })
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
              src={file ? file : (user.avatar ? `http://localhost:3000/${user.avatar}` : img)}
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
            <input className='inputEmail' type="email" name='email' value={user?.email} disabled />
          </div>

          <div>
            <label>Nickname: </label>
            <input type="text" name='name' value={user.name || ''} onChange={handleInputChange} />
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
            <Radio.Group name='gender' onChange={handleGenderChange} value={user.gender || ''}>
              <Radio value='Nam'>Nam</Radio>
              <Radio value='Nữ'>Nữ</Radio>
              <Radio value='Khác'>Khác</Radio>
            </Radio.Group>
          </div>

          <div>
            <label>Số điện thoại: </label>
            <input type="text" name='phone' value={user.phone || ''} onChange={handleInputChange} placeholder='Số điện thoại' />          </div>

          <div>
            <label>Địa chỉ: </label>
            <input type="text" name='address' value={user.address || ''} onChange={handleInputChange} />
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
