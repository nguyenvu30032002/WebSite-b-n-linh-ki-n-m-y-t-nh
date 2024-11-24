import React, { useCallback, useEffect, useState } from 'react'
import Header from "../../parts/Header/Header";
import { ProductSimilar, Wrapper, WrapperAmount, WrapperBody, WrapperCarousel, WrapperComment, WrapperConditionSimilar, WrapperDescription, WrapperHeader, WrapperImg, WrapperModal, WrapperOrder, WrapperOrigin, WrapperPrice, WrapperPriceSimilar, WrapperProduct, WrapperProductInformation, WrapperProductName, WrapperRate, WrapperRateSimilar, WrapperSimilar } from "./style";
import Footer from "../../parts/Footer/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Image, Input, message, Radio, Rate, Upload} from 'antd';
import UserService from '../../services/UserService';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CameraOutlined, HeartFilled} from '@ant-design/icons';
import ProductService from '../../services/ProductService';



const Product = () => {
  
    const location = useLocation();
    const product = location.state?.product;
    const navigate = useNavigate(); 
    const { userOrder, userCart, getUser} = UserService();
    const {getProductSimilar} = ProductService()
    const [amount, setAmount] = useState(1);
    const [valueRadio, setValueRadio] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [zoom, setZoom] = useState(false) 
    const [productSimilar, setProductSimilar] = useState([])

    const fetchProductSimilar = useCallback(async() => {
      try{
          const dataProductSimilar = await getProductSimilar(product)
          setProductSimilar(dataProductSimilar)
      }catch(error){
        throw error
      }
    },[getProductSimilar,product])

    useEffect(() => {
      fetchProductSimilar()
    }, [fetchProductSimilar])

    const fetchUser = useCallback(async() =>{
      try{
        const dataUser = await getUser()
        setUser(dataUser)
      }catch(error){
        throw error
      }
    },[getUser])
  
    useEffect(() => {
      fetchUser()
    }, [fetchUser])


    const handlePlus = () =>{
        setAmount(() => amount + 1)
    }
    const handleMinus = () =>{
      setAmount(() => amount - 1)
    }
    const handleZoom = () => {
      setZoom(true);
    }
    const handlePreviewClose = (visible) => {
      setZoom(visible); // Cập nhật trạng thái khi preview đóng
    };
    const handleClick = (product) => {
        window.scrollTo(0, 0);
        navigate(`/product/id/${product.id}/name/${encodeURIComponent(product.name)}`, { state: { product } });
    }
///////////////////////////////// MODAL //////////////////////////////////////////////////////

    const showModal = () => {
      if(!user){
        navigate('/login')
      }
      else{
        setIsModalOpen(true);
      }
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
//////////////////////////////// PAY ////////////////////////////////////////////////


    const handleRadioChange = (e) => {
      setValueRadio(e.target.value); // Cập nhật giá trị khi chọn radio
    };
    const handleOk = (e) => {
      const data =
       {
        user_id: user.id,
        userName: user.name,
        address: user.address,
        phone: user.phone,
        status: valueRadio,
        product_id: product.id,
        imgProduct: product.image,
        nameProduct: product.name,
        amount: amount,
        totalMoney: ((product.price) - (product.price * (product.discount / 100)))*amount,
        origin: product.origin,
       };

      if(user.address === null){
        message.error('Vui lòng điền địa chỉ nhận hàng')
        setIsModalOpen(true);
      }
      else if(!valueRadio){
        message.error('Vui lòng chọn phương thức thanh toán');
        setIsModalOpen(true);
      }
      else if(user.phone === null){
        message.error('Vui lòng thêm số điện thoại');
        setIsModalOpen(true);
      }
      else{
        userOrder(data)
        .then((response) =>{
          const data = response.data;
            if(data){
              message.success('Đặt hàng thành công')
              setIsModalOpen(false);
            }
            else{
              message.error('Dặt hàng thất bại')
              setIsModalOpen(false);
            }
        })
        .catch((error) => {
          message.error('Có lỗi xảy ra, vui lòng thử lại!');
          setIsModalOpen(false);
        })
        
      }
    };

    const handleCart = () => {
      if(!user){
        navigate('/login')
      }
      else{
        const data =
       {
        user_id: user.id,
        userName: user.name,
        address: user.address,
        phone: user.phone,
        product_id: product.id,
        imgProduct: product.image,
        nameProduct: product.name,
        amount: amount,
        price: ((product.price) - (product.price * (product.discount / 100))),
        origin: product.origin,
       };
       userCart(data)
       .then((reponse) => {
        const data = reponse.data
        if(data){
          message.success('Thêm vào giỏ hàng thành công')
        }
        else{
          message.error('Thêm vào giỏ hàng thất bại')
        }
       })
       .catch((error) => {
        message.error('Có lỗi xảy ra, vui lòng thử lại!');
        setIsModalOpen(false);
      })
      }
      
    }
///////////////////////////////////////////////////  Comment   /////////////////////////////////////////////////
  

  const handleCommentChange = (e) => {
    if(user){
      setComment(e.target.value);
    }
    else{
      message.error('Vui lòng đăng nhập')
    }
  };

  const handleRateChange = (value) => {
    if(user){
      setRating(value);
    }
    else{
      message.error('Vui lòng đăng nhập')

    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    if(user){
      setFileList(newFileList);
    }
    else{
      message.error('Vui lòng đăng nhập')
    }
  };  
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
        cursor: 'pointer',
      }}
      type="button"
    >
      <CameraOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const handleSubmit = async () => {
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
  
    try {
      // Chuyển đổi danh sách file thành Base64
      const imgComment = await Promise.all(
        fileList.map((file) => convertToBase64(file.originFileObj)) // `originFileObj` là file gốc từ Ant Design Upload
      );
      const imgCommentString = imgComment.join(",");
      console.log("Comment:", comment);
      console.log("Rating:", rating);
      console.log("Uploaded Images (Base64):", imgCommentString);
  
      // Xử lý gửi dữ liệu đến server
    } catch (error) {
      console.error("Error converting to Base64:", error);
    }
  };

return (
    <Wrapper>
            <WrapperHeader>
                <Header/>
            </WrapperHeader>
            <WrapperBody>
              <WrapperProductInformation key={product.id}>
                  <WrapperImg>
                    <WrapperCarousel arrows infinite={false}>
                      <div>
                      <Image className='img' onClick={handleZoom}  preview={{ visible: zoom , onVisibleChange:handlePreviewClose }} src={`http://localhost:3000/${product.image}`} alt={product.name} />
                      {/* <img src={product.image} alt={product.name} onError={() => console.error('Error loading image')} /> */}
                      </div>
                    </WrapperCarousel>
                    </WrapperImg>
                    <WrapperProduct>
                      <WrapperProductName>
                         <p>
                            {product.name}
                         </p>
                      </WrapperProductName>
                      <WrapperRate>
                        <Rate className='rate' disabled allowHalf defaultValue={1.5} />
                        <HeartFilled className='heart' />
                      </WrapperRate>
                      {/* {
                        product.id && product.variants !== null ? (
                          <WrapperVariants>
                          <Button>8gb</Button>
                          <Button>16gb</Button>
                          <Button>32gb</Button>
                        </WrapperVariants>
                        ) : null
                      } */}
                      {
                        product.description !== null ? (
                          <WrapperDescription>
                            {product.description}
                          </WrapperDescription>
                        ) : (
                          null
                        )
                      }
                      <WrapperOrigin>
                        <div className='originProduct'>
                          <p>Nguồn gốc:</p>
                          <p>{product.origin}</p>
                        </div>
                        <div className='brandProduct'>
                          <p>Thương hiệu:</p>
                          <p>{product.brand}</p>
                        </div>
                      </WrapperOrigin>
                      <WrapperPrice>
                      
                      {
                        product.discount ===0 ? (
                          <div className='newPrice'>
                            <p>{Number((product.price) - (product.price * (product.discount / 100))).toLocaleString('vi-VN')}</p>
                            <p>đ</p>
                          </div>
                        ) : (
                        <>
                        <div className='oldPrice'>
                          <p>{Number(product.price).toLocaleString('vi-VN')}</p>
                          <p>đ</p>
                        </div>
                        <div className='arrow'>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                        <div className='newPrice'>
                          <p>{Number((product.price) - (product.price * (product.discount / 100))).toLocaleString('vi-VN')}</p>
                          <p>đ</p>
                        </div>
                        </>
                        )
                      }
                      </WrapperPrice>

                        <WrapperAmount>
                          <p>Số lượng:</p>
                          {
                            amount > 1 ? (
                              <button onClick={handleMinus}><FontAwesomeIcon icon={faMinus} /></button>
                            ) : (
                              <button disabled onClick={handleMinus}><FontAwesomeIcon icon={faMinus} /></button>
                            )
                          }
                          <div>{amount}</div>
                          {
                            amount < 99 ? (
                              <button onClick={handlePlus}><FontAwesomeIcon icon={faPlus} /></button>
                            ) : (
                              <button disabled onClick={handlePlus}><FontAwesomeIcon icon={faPlus} /></button>
                            )
                          }
                        </WrapperAmount>
                        <WrapperOrder>
                          <Button className='OrderProduct' type="primary" onClick={showModal} >Đặt hàng</Button>
                          <Button className='cartProduct' type="primary" danger><FontAwesomeIcon icon={faCartShopping} onClick={handleCart}/></Button>
                        </WrapperOrder>
                  </WrapperProduct>
              </WrapperProductInformation>
              {
                productSimilar && (
                  <WrapperSimilar>
                    <span className='similar'>SẢN PHẨM TƯƠNG TỰ</span>
                    <div>
                    {
                      productSimilar.map((product) => (
                        <ProductSimilar key={product.id}>
                            {product.discount !== 0 ? (
                              <p className='discountProduct'>-{(product.discount).toLocaleString('vi-VN')}%</p>
                            ) : null}
                            <img onClick={() => handleClick(product)} src={`http://localhost:3000/${product.image}`}  alt={product.name} />
                            <p onClick={() => handleClick(product)} className='nameProduct' style={{WebkitLineClamp: product.discount !== 0 ? 2 : 3,}}>{product.name}</p>
                            <WrapperPriceSimilar onClick={() => handleClick(product)}>
                              {product.discount !== 0 ? (
                                <div className='oldPrice'>
                                  <p>{Number(product.price).toLocaleString('vi-VN')}</p>
                                  <p>đ</p>
                                </div>
                              ) : null}
                              {product.discount === 0 ? (
                                <div className='Price'>
                                  <p>{Number(product.price).toLocaleString('vi-VN')}</p>
                                  <p>đ</p>
                                </div>
                              ) : (
                                <div className='newPrice'>
                                  <p>{Number((product.price) - (product.price * (product.discount / 100))).toLocaleString('vi-VN')}</p>
                                  <p>đ</p>
                                </div>
                              )}
                            </WrapperPriceSimilar>
                            <WrapperConditionSimilar onClick={() => handleClick(product)}>
                              <div className="soldProduct">
                                <p>Đã bán:</p>
                                <p>{product.sold}</p>
                              </div>
                            </WrapperConditionSimilar>
                            <WrapperRateSimilar>
                              <Rate disabled allowHalf defaultValue={1.5} />
                              <HeartFilled />
                            </WrapperRateSimilar>
                         </ProductSimilar>
                      ))
                    }
                    </div>
                  </WrapperSimilar>
                )
              }
              <WrapperComment>
                <div className='formComment'>
                 <span className='title'>Đánh giá & nhận xét {product.name}</span>
                 <div className='comment' >
                    <div className='rateComment'>
                      <span>Chọn đánh giá của bạn: </span>
                      <Rate onChange={handleRateChange} />                    
                    </div>
                    <div className='imgComment'>
                    <p>Đính kèm ảnh:</p>
                    <Upload
                      listType="picture-card"
                      fileList={fileList} // Danh sách ảnh đã chọn
                      onChange={handleUploadChange} // Xử lý thay đổi danh sách file
                      beforeUpload={() => false} // Ngăn không upload ngay, chỉ lưu tạm
                    >
                      {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                      <Image
                        wrapperStyle={{
                          display: 'none',
                        }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                      />
                    )}
                    </div>
                    <Input.TextArea 
                      rows={1} 
                      // style={{width: '600px'}}
                      placeholder="Nhập bình luận của bạn..." 
                      value={comment} 
                      onChange={handleCommentChange} 
                      style={{ width: '550px', float: 'left', maxHeight: '150px'}}
                      maxLength={100}
                      showCount 
                    />

                    <div style={{ marginTop: 30 }}>
                      <Button type="primary" onClick={handleSubmit}>Gửi bình luận</Button>
                    </div>
                  </div>
                  <div className='userComment'>
                    <div className='commentUser' key={1}>
                      <div className='profileUser'>
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          
                          <div className='profile'>
                            <span style={{ fontSize: 15, color: 'rgba(0,0,0,.87)'}}>sadada</span>
                            <Rate disabled defaultValue={2} />
                            <span style={{color: 'rgba(0,0,0,.54)'}}>2022-2-20</span>
                          </div>
                      </div>
                      <span className='comment'>
                          aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </span>
                      <div className='commentImg'>
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                      </div>
                    </div>

                    <div className='commentUser' key={2}>
                      <div className='profileUser'>
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          
                          <div className='profile'>
                            <span style={{ fontSize: 15, color: 'rgba(0,0,0,.87)'}}>sadada</span>
                            <Rate disabled defaultValue={2} />
                            <span style={{color: 'rgba(0,0,0,.54)'}}>2022-2-20</span>
                          </div>
                      </div>
                      <span className='comment'>
                          aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </span>
                      <div className='commentImg'>
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                      </div>
                    </div>

                    <div className='commentUser' key={3}>
                      <div className='profileUser'>
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          
                          <div className='profile'>
                            <span style={{ fontSize: 15, color: 'rgba(0,0,0,.87)'}}>sadada</span>
                            <Rate disabled defaultValue={2} />
                            <span style={{color: 'rgba(0,0,0,.54)'}}>2022-2-20</span>
                          </div>
                      </div>
                      <span className='comment'>
                          aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </span>
                      <div className='commentImg'>
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                          <img src="/static/media/d0tb7-copy.62dad774c0cb86058595.jpg" alt="" />
                      </div>
                    </div>
                    
                  </div>
                </div>
                
              </WrapperComment>
            </WrapperBody>
            <Footer/>
            <WrapperModal title="Thông tin đơn hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Mua"  
            footer={[
                valueRadio === "Chưa thanh toán" && (
                  <Button key="ok" type="primary" onClick={handleOk}>
                    Mua
                  </Button>
                ),
              <Button key="cancel" onClick={handleCancel}>
                Hủy
              </Button>,
            ]}>
              
              <div className='Orders' key={product.id}>
              <img src={`http://localhost:3000/${product.image}`} alt={product.name} />
                <p className='name'>{product.name}</p>
                <p>x {amount}</p>
                {
                  product.id && product.variants === true ? (
                    <p>{product.variants}</p>
                  ) : null
                }
                <p>{(Number((product.price) - (product.price * (product.discount / 100)))*amount).toLocaleString('vi-VN')} đ</p>
              </div>
              {
                user && (
                  <div className='information'>
                    <div>
                      <p>Tới: {user.name}</p>
                      <div className='address'>
                        <p>Địa chỉ:</p>
                        {
                          user.address !== null ? (
                            <p>{user.address}</p>
                          ) : (
                            <p style={{color: '#1677ff', cursor: 'pointer'}} onClick={() => navigate('/information')}>Thay dổi</p>
                          )
                        }
                      </div>
                    </div>
                    <div className='phone'>
                    <p>Số điện thoại: </p>
                    <div>
                      {
                          user.phone !== null ? (
                            <p>{user.phone}</p>
                          ) : (
                            <p style={{color: '#1677ff', cursor: 'pointer'}} onClick={() => navigate('/information')}>Thay dổi</p>
                          )
                        }</div>
                    </div>
                  </div>
                )
              }
              <Radio.Group onChange={handleRadioChange} value={valueRadio}>
                <Radio value="Chưa thanh toán">Thanh toán bằng tiền mặt</Radio>
                <Radio value="Đã thanh toán">Thanh toán bằng tài khoản ngân hàng</Radio>
              </Radio.Group>
              {
                valueRadio === 'Đã thanh toán' && (
                <div className='paypal'>
                <PayPalScriptProvider options={{ "client-id": "AfB9WXP0WczD-_mnfInE8yKoZf2Qy_BqrsB83l4O1AeW2iauLKLXNV29i0cNbTpZg_bQsd0V_sySxFnI" }}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{
                            amount: { value:((((product.price) - (product.price * (product.discount / 100)))*amount) / 23000).toFixed(2) }
                          }]
                        });
                      }}
                      onApprove={async (data, actions) => {
                        try{
                          const details = await actions.order.capture();
                          const data =
                        {
                         user_id: user.id,
                         userName: user.name,
                         address: user.address,
                         phone: user.phone,
                         status: valueRadio,
                         product_id: product.id,
                         imgProduct: product.image,
                         nameProduct: product.name,
                         amount: amount,
                         totalMoney: ((product.price) - (product.price * (product.discount / 100)))*amount,
                         origin: product.origin,
                        };
                 
                       if(user.address === null){
                         message.error('Vui lòng điền địa chỉ nhận hàng')
                         setIsModalOpen(true);
                       }
                       else if(user.phone === null){
                         message.error('Vui lòng thêm số điện thoại');
                         setIsModalOpen(true);
                       }
                       else{
                         userOrder(data);
                         setIsModalOpen(false);
                       }
                        }
                        catch(error){
                          message.error("Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.");
                        }
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
                )
              }
            </WrapperModal>
           
        </Wrapper>
        
  )
}

export default Product