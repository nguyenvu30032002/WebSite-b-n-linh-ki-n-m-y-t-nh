import React, { useState } from 'react'
import { DatePicker, Radio } from 'antd';
import { Wrapper, WrapperAvatar, WrapperBody, WrapperHeader, WrapperInformation} from './style'
import Header from "../../parts/Header/Header";
import { useNavigate } from 'react-router-dom';
const Information = () => {
  const onDate = (name,dateString) => {
    console.log(name);
  };
  
  const [value, setValue] = useState(1);
  const onRadio = (e) => {
    console.log(e.target.name, ":" ,e.target.value);
    setValue(e.target.value);
  };

  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/')
  }
  const [img, setImg] = useState("");
  const onImg = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file); // Đọc file và convert thành Data URL
    }
  }
  
  // const logo = null
  return (
    <Wrapper>
        <WrapperHeader>
          <Header/>
        </WrapperHeader>
       <WrapperBody>
          <WrapperAvatar>
            {
              img ? (
                <div className='avatar'>
                  <img src={img} alt="avatar" />
                <div className='changeAvatar'>
                  <label htmlFor="fileAvatar">
                      Thay đổi avatar
                  </label>
                    
                  <input id='fileAvatar' onChange={onImg} type="file" />
                </div>
                </div>
              ) : (
      
                 <div className='nullAvatar'>
                  <label htmlFor="nullFileAvatar">
                    Chọn ảnh
                  </label>
                  
                  <input id='nullFileAvatar' onChange={onImg} type="file" />
                 </div>
              )
            }
            
          </WrapperAvatar>
          <WrapperInformation>
            <> 
              <div>
                <label htmlFor="">Email: </label>
                <input className='inputEmail' type="email" name='email' placeholder='nguyenvu3003200@gmail.com' disabled />
              </div>

              <div>
                <label htmlFor="">Nickname: </label>
                <input type="text" name='email' placeholder='Anh Vu' />
              </div>

              <div>
                <label htmlFor="">Ngày sinh: </label>
                <DatePicker name='date' className='date' onChange={onDate} needConfirm />
              </div>

              <div>
                <label htmlFor="">Giới tính: </label>
                <Radio.Group name='male' onChange={onRadio} value={value}>
                  <Radio value={'Nam'}>Nam</Radio>
                  <Radio value={'Nữ'}>Nữ</Radio>
                  <Radio value={'Khác'}>Khác</Radio>
                </Radio.Group>
              </div>

              <div>
                <label htmlFor="">So dien thoai: </label>
                <input type="text" name='email' placeholder='3482347324' />
              </div>

              <div>
                <label htmlFor="">Dia chi: </label>
                <input type="text" name='email' placeholder='Ha noi' />
              </div>
              <div className='button'>
                <button type='submit'>Lưu thay đổi</button>
                <button onClick={handleHome}> Quay lai</button>
              </div>
            </>
          </WrapperInformation>
       </WrapperBody>
    </Wrapper>
  )
}

export default Information