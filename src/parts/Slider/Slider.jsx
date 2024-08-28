import React from 'react';
import { Image } from 'antd';
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';
import { Wrapper, WrapperImage } from './style';
import logo1 from '../../assets/images/slider/0912_Promotion_Campaign_KV_1900x684.jpg';
import logo2 from '../../assets/images/slider/ASUS-dominate-image.jpg';
import logo3 from '../../assets/images/slider/banner-02.jpg';
import logo4 from '../../assets/images/slider/banner.jpg';
import logo5 from '../../assets/images/slider/dekstop-banner.jpg';


const AnimatedImage = () => {
  const images = [logo1, logo2, logo3, logo4, logo5]; // Danh sách hình ảnh
  
  // Animation để di chuyển hình ảnh liên tục
  const props = useSpring({
    from: { transform: 'translateX(0%)' },
    to: { transform: `translateX(-50%)` }, // Di chuyển qua một vòng của hình ảnh
    config: { duration: 25000 }, // Thay đổi thời gian chuyển động
    reset: true, // Đặt lại animation khi hoàn tất
    loop: true // Lặp lại hiệu ứng
  });

  return (
    <Wrapper>
      <div style={{ overflow: 'hidden', height: '230px' }}>
        <animated.div
          style={{
            ...props,
            display: 'flex',
            width: `${images.length * 120}%`, // Đảm bảo đủ không gian để các hình ảnh di chuyển hết chiều rộng
            height: '230px', // Kích thước cố định cho các hình ảnh
          }}
        >
          {images.concat(images).map((img, index) => (
            <WrapperImage key={index}>
              <Image src={img} alt={`example-${index}`} preview={true} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </WrapperImage>
          ))}
        </animated.div>
      </div>
    </Wrapper>
  );
};

export default AnimatedImage;
