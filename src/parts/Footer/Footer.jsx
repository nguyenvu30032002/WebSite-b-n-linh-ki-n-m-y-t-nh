import React from 'react'
import { Wrapper, WrapperConnect, WrapperFooter, WrapperIntroduce, WrapperList, WrapperListConnect, WrapperLogo, WrapperMap, WrappperImg } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';


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
                    <ul>
                    {/* <p></p>
                        <p></p>
                        <p></p> */}
                        <li><a href="h">Giới thiệu công ty</a></li>
                        <li><a href="h">Thông tin tuyển dụng</a></li>
                        <li><a href="h">Tin tức công nghệ</a></li>
                        <li><a href="h">Tin tức</a></li>
                    </ul>
                </WrapperList>
            </WrapperIntroduce>
            <WrapperConnect>
                <h3>
                     Kết nối với chúng tôi
                </h3>
                <WrapperListConnect>
  
                    <ul>
                        <li>
                        <div>
                            <p><FontAwesomeIcon icon={faFacebook} style={{color: "#341fd6",}} /></p>
                            <a href="g">https://www.facebook.com/</a>
                        </div>
                        </li>
                        <li>
                        <div>
                            <p><FontAwesomeIcon icon={faYoutube} style={{color: "#f20707",}} /></p>
                            <a href="g">https://www.youtube.com/</a>
                        </div>
                        </li>
                        <li>
                        <div>
                            <p><FontAwesomeIcon icon={faInstagram} style={{color: "#e62828",}} /></p>
                            <a href="g">https://www.instagram.com/</a>
                        </div>
                        </li>
                        <li>
                        <div>
                            <p><FontAwesomeIcon icon={faTiktok} style={{color: "#0e0c0d",}} /></p>
                            <a href="g">https://www.tiktok.com/</a>
                        </div>
                        </li>
                    </ul>
                </WrapperListConnect>
            </WrapperConnect>
            <WrapperMap>
                <h3>
                     Bản đồ
                </h3>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6573256990937!2d105.78236867502507!3d21.046392987173217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb158a2305d%3A0x5c357d21c785ea3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyDEkGnhu4duIEzhu7Fj!5e0!3m2!1svi!2s!4v1725001028908!5m2!1svi!2s" title='map'  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </WrapperMap>
        </WrapperFooter>
    </Wrapper>
  )
}

export default Footer