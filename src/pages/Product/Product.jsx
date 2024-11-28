import React, { useCallback, useEffect, useState } from 'react'
import Header from "../../parts/Header/Header";
import { ProductSimilar, Wrapper, WrapperAmount, WrapperBody, WrapperCarousel, WrapperComment, WrapperConditionSimilar, WrapperDescription, WrapperHeader, WrapperImg, WrapperModal, WrapperOrder, WrapperOrigin, WrapperPaginate, WrapperPrice, WrapperPriceSimilar, WrapperProduct, WrapperProductInformation, WrapperProductName, WrapperRate, WrapperRateSimilar, WrapperSimilar } from "./style";
import Footer from "../../parts/Footer/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCartShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Image, Input, message, Pagination, Radio, Rate, Upload} from 'antd';
import UserService from '../../services/UserService';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CameraOutlined, HeartFilled} from '@ant-design/icons';
import ProductService from '../../services/ProductService';



const Product = () => {
  
    const location = useLocation();
    const product = location.state?.product;
    const navigate = useNavigate(); 
    const { userOrder, userCart, user, createComment,getAllComments} = UserService();
    const {getProductSimilar} = ProductService()
    const [amount, setAmount] = useState(1);
    const [valueRadio, setValueRadio] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [zoom, setZoom] = useState(false) 
    const [productSimilar, setProductSimilar] = useState([])
    const [imgComment, setImgComment] = useState('');
    const [dataComment, setDataComment] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataComment.slice(indexOfFirstItem, indexOfLastItem);
  // Hàm xử lý sự kiện thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

///////////////////////////////////////////////////////////////////////////////////////////
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

    const fetchComments = useCallback(async () => {
      try {
        if (user) {
          const data = { product_id: product.id, user_id: user.id };
          const dataComment = await getAllComments(data);
          setDataComment(dataComment || []);
        } else {
          const data = { product_id: product.id };
          const dataComment = await getAllComments(data);
          setDataComment(dataComment || []);
        }
      } catch (error) {
        throw error;
      }
    }, [getAllComments, product.id, user]);

    useEffect(() => {
      fetchComments()
     
    },[fetchComments])
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
  if (user) {
    setComment(e.target.value);
  } else {
    message.error('Vui lòng đăng nhập để bình luận');
  }
};

const handleRateChange = (value) => {
  if (user) {
    setRating(value);
  } else {
    message.error('Vui lòng đăng nhập để đánh giá sản phẩm');
  }
};

const handleUploadChange = ({ fileList: newFileList }) => {
  if (user) {
    const imgComment = newFileList?.length
      ? JSON.stringify(newFileList.map((file) => file.name))
      : '';
    setImgComment(imgComment); // Cập nhật `imgComment` để dùng trong handleSubmit
    setFileList(newFileList); // Cập nhật `fileList`
  } else {
    message.error('Vui lòng đăng nhập để tải ảnh lên');
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
    if (user) {
      const data = {
        user_id: user.id,
        product_id: product.id,
        comment: comment,
        rate: rating,
        image: imgComment,
      };
  
      try {
        const response = await createComment(data);
        const res = response.data;
  
        if (res.message === 'notExists') {
          setFileList([]);
          setRating(0);
          setComment('');
          message.error('Vui lòng mua hàng để đánh giá sản phẩm');
        } else if (res.message === 'success') {
          setFileList([]);
          setRating(0);
          setComment('');
          fetchComments();
          message.success('Đánh giá sản phẩm thành công');
        } else {
          setFileList([]);
          setRating(0);
          setComment('');
          message.error('Đánh giá sản phẩm thất bại');
        }
      } catch (error) {
        setFileList([]);
        setRating(0);
        setComment('');
        message.error('Có lỗi xảy ra, vui lòng thử lại!');
      }
    } else {
      message.error('Vui lòng đăng nhập');
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
                        {
                          Array.isArray(product.comments) && product.comments.length > 0 ? (
                            <Rate className='rate' disabled allowHalf defaultValue={product.comments.length > 0 ? product.comments.reduce((acc, curr) => acc + curr.rate, 0) / product.comments.length : 0} />
                          ) : null
                        }
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
                            <HeartFilled />
                            {
                              Array.isArray(product.comments) && product.comments.length > 0 ? (
                                <Rate disabled allowHalf defaultValue={product.comments.length > 0 ? product.comments.reduce((acc, curr) => acc + curr.rate, 0) / product.comments.length : 0} />
                              ) : null
                            }
                             
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
                      <Rate value={rating}  onChange={handleRateChange} />                    
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

                    <div className='userComment' >
                    {
                      currentItems.map(dataComment => (
                        <div className='commentUser' key={dataComment.id}>
                        <div className='profileUser'>
                            <img src={dataComment.created_by_user.image ? dataComment.created_by_user.image : '/static/media/d0tb7-copy.62dad774c0cb86058595.jpg' } alt={dataComment.created_by_user.name} />
                            
                            <div className='profile'>
                              <span style={{ fontSize: 15, color: 'rgba(0,0,0,.87)',margin:'0 0 10px 0'}}>{dataComment.created_by_user.name}</span>
                              {
                                dataComment.rate  && dataComment.rate !==0 ? (

                                      <Rate disabled defaultValue={dataComment.rate} />

                                ) : null
                              }
                              <span style={{color: 'rgba(0,0,0,.54)'}}>{dataComment.created_at ? new Date(dataComment.created_at).toLocaleString('vi-VN') : 'Ngày chưa có'}</span>
                            </div>
                        </div>
                        {
                          dataComment.comment && (
                            <span className='comment'>
                              {dataComment.comment}
                            </span>
                          )
                        }
                        {
                          dataComment.image && (
                            <div className='commentImg'>
                              {
                                Array.isArray(JSON.parse(dataComment.image)) && JSON.parse(dataComment.image).map((image, index) => (
                                  <img key={index} src={`http://localhost:3000/${image}`} alt={image.name} />
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                      ))
                    }
                    {
                      Array.isArray(dataComment) && dataComment.length > 0 ? (
                        <WrapperPaginate>
                          <Pagination
                            current={currentPage}
                            total={dataComment.length}
                            pageSize={itemsPerPage}
                            onChange={handlePageChange}
                          />
                        </WrapperPaginate>
                      ) : null
                    }
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