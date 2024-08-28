import React from 'react'
import { Wrapper, WrapperConnect, WrapperFooter, WrapperIntroduce, WrapperList, WrapperLogo, WrapperMap, WrappperImg } from './style'


const Footer = () => {
  return (
    <Wrapper>
        <WrapperFooter>
            <WrappperImg>
                <WrapperLogo/>
                <div>
                    Mua hàng: 19001515
                </div>
                <div>
                    Khiếu nại: 19001514
                </div>
            </WrappperImg>
            <WrapperIntroduce>
                <h3>
                     Giới thiệu
                </h3>
                <WrapperList>
                    <p><a href="h">Giới thiệu công ty</a></p>
                    <p><a href="h">Thông tin tuyển dụng</a></p>
                    <p><a href="h">Tin tức công nghệ</a></p>
                </WrapperList>
            </WrapperIntroduce>
            <WrapperConnect>
                <h3>
                     Kết nối với chúng tôi
                </h3>
                <div>
                    <p>
                        <img src="" alt="" />
                        <a href="g">facebook</a>
                    </p>
                    <p>
                        <img src="" alt="" />
                        <a href="g">zal</a>
                    </p>
                    <p>
                        <img src="" alt="" />
                        <a href="g">instar</a>
                    </p>
                    <p>
                        <img src="" alt="" />
                        <a href="g">tiktok</a>
                    </p>
                </div>
            </WrapperConnect>
            <WrapperMap>
                <h3>
                     Bản đồ
                </h3>
            </WrapperMap>
        </WrapperFooter>
    </Wrapper>
  )
}

export default Footer