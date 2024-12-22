import React, { useCallback, useEffect, useState } from 'react'
import Header from "../../parts/Header/Header";
import { ProductSimilar, Wrapper, WrapperAmount, WrapperBody, WrapperCarousel, WrapperComment, WrapperConditionSimilar, WrapperDescription, WrapperHeader, WrapperImg, WrapperModal, WrapperOrder, WrapperOrigin, WrapperPaginate, WrapperPrice, WrapperPriceSimilar, WrapperProduct, WrapperProductInformation, WrapperProductName, WrapperRate, WrapperRateSimilar, WrapperSimilar, WrapperVariants } from "./style";
import Footer from "../../parts/Footer/Footer";
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCartShopping, faMinus, faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import { Button, Image, Input, message, Pagination, Radio, Rate, Upload} from 'antd';
import UserService from '../../services/UserService';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CameraOutlined, HeartFilled} from '@ant-design/icons';
import ProductService from '../../services/ProductService';
import AuthUser from '../../services/AuthUser';
import { setCart } from '../../store/Action';
import { useDispatch } from 'react-redux';


const Product = () => {

    const { id} = useParams();
    const navigate = useNavigate(); 
    const { userOrder, userCart, createComment,getAllComments, createFavourite, getAllFavourite, deleteFavourite, messageUser, getCart} = UserService();
    const {getProductSimilar, getProduct} = ProductService()
    const {getUser, user} = AuthUser()
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
    const [favourite, setFavourite] = useState([])
    const [product, setProduct] = useState([])
    const dispatch = useDispatch();

    ////////////////////////////////////////////////////////////////

    const fetchProduct = useCallback(async() => {
      try{
        const data = await getProduct(id)
        setProduct(data)
      }
      catch(error){
        throw error
      }
    },[getProduct, id])

    useEffect(() => {
      fetchProduct()
    }, [fetchProduct])
  
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

/////////////////////////////////////////

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


///////////////////////////////////////////////////////////////////////////////////////////

const handleHeart = (product) => {
  if (getUser()) {
    const favouriteProduct = favourite.find(fvr => fvr.product_id === product.id && fvr.favourite === 1);

    if (favouriteProduct) {
      const data = { product_id: product.id, user_id: user.id };
      deleteFavourite(data)
        .then(() => {
          fetchFavourite();
        })
        .catch((error) => {
          message.error('Có lỗi xảy ra, vui lòng thử lại!');
        });
    } else {
      const data = { product_id: product.id, user_id: user.id };
      createFavourite(data)
        .then(() => {
          fetchFavourite();
        })
        .catch((error) => {
          message.error('Có lỗi xảy ra, vui lòng thử lại!');
        });
    }
  } else {
    message.error('Vui lòng đăng nhập');
  }
};

const fetchFavourite = useCallback(async() => {
  try{
    
    // if(user){
    //   const data = await getAllFavourite(user.id)
    //   setFavourite(data)
    // }
    const data = await getAllFavourite(user.id)
    setFavourite(data)
  }
  catch(error){
    throw error
  }
},[getAllFavourite, user])

useEffect(() => {
  if(user){
    
    fetchFavourite()
  }
}, [fetchFavourite, user])

//////////////////////////////////////////

const handleShareMessage = () => {
  if(user)
  {
    const data = {
      user_id : user.id,
      product_id : product.id
    }
    message.success('Gửi nhân viên thành công')
    messageUser(data)
  }
  else{
    message.error('Vui lòng đăng nhập')
  }
}

/////////////////////////////////////////////////////////

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
      if(!(getUser())){
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
        price: product.price,
        discount: product.discount
       };

      if(!(user.address)){
        message.error('Vui lòng điền địa chỉ nhận hàng')
        setIsModalOpen(true);
      }
      else if(!valueRadio){
        message.error('Vui lòng chọn phương thức thanh toán');
        setIsModalOpen(true);
      }
      else if(!(user.phone)){
        message.error('Vui lòng thêm số điện thoại');
        setIsModalOpen(true);
      }
      else{
        userOrder(data)
        .then((response) =>{
          const data = response.data;
            if(data){
              setAmount(1)
              message.success('Đặt hàng thành công')
              setIsModalOpen(false);
            }
            else{
              setAmount(1)
              message.error('Dặt hàng thất bại')
              setIsModalOpen(false);
            }
        })
        .catch((error) => {
          setAmount(1)
          message.error('Có lỗi xảy ra, vui lòng thử lại!');
          setIsModalOpen(false);
        })
        
      }
    };

////////////////////////////////////////////// CART ////////////////////////////////////////////////

const fetchCarts = useCallback(async() => {
    try {
      if (user) { 
        const dataCarts = await getCart(user.id);
        dispatch(setCart(dataCarts.length));
      }
    } catch (error) {
      throw error
    }
  }, [getCart, user, dispatch])

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

    const handleCart = () => {
      if(!(getUser())){
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
        newPrice: ((product.price) - (product.price * (product.discount / 100))),
        oldPrice: product.price,
        discount: product.discount
       };
       userCart(data)
       .then((reponse) => {
        const data = reponse.data
        if(data){
          setAmount(1)
          fetchCarts()
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

///////////////////////////////////////////////////////////////////////////////////////

const [selectedVariantPrice, setSelectedVariantPrice] = useState(null);
const [selectedVariant, setSelectedVariant] = useState(null);

const handleVariantClick = (variant) => {
  setSelectedVariant(variant); // Cập nhật variant được chọn
  setSelectedVariantPrice(variant.price); // Cập nhật giá của variant khi click
};
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]); // Chọn variant đầu tiên
      setSelectedVariantPrice(product.variants[0].price); // Cập nhật giá của variant đầu tiên
    }
  }, [product]);

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
                    <FontAwesomeIcon title="Gửi cho nhân viên" onClick={handleShareMessage} icon={faShare} style={{color: '#0B89EA', position: 'absolute', zIndex: '10', right: '0', top: '0', margin: '10px 10px 0 0 ', fontSize: '25px', cursor: 'pointer'}}/>
                    </WrapperImg>
                    <WrapperProduct>
                      <WrapperProductName>
                         <p>
                            {product.name}
                            
                         </p>
                      </WrapperProductName>
                      {
                        product.variants && product.variants.length > 0 && (
                          <WrapperVariants>
                            {
                              product.variants.map((variant) => (
                                <Button key={variant.id} onClick={() => handleVariantClick(variant)} 
                                style={{
                                  marginRight: '8px',
                                  color: selectedVariant && selectedVariant.id === variant.id ? '#1677ff' : '', // Nút được chọn sẽ có màu nền khác
                                  border: selectedVariant && selectedVariant.id === variant.id ? '1px solid #1677ff' : '', // Nút được chọn sẽ có border xanh
                                }}
                                >{
                                  variant.name}
                                  </Button> // Đảm bảo bạn trả về Button ở đây
                              ))
                            }
                          </WrapperVariants>
                        )
                      }
                      <WrapperRate>
                        {
                          Array.isArray(product.comments) && product.comments.length > 0 ? (
                            <Rate className='rate' disabled allowHalf defaultValue={product.comments.length > 0 ? product.comments.reduce((acc, curr) => acc + curr.rate, 0) / product.comments.length : 0} />
                          ) : null
                        }
                        <HeartFilled style={{ 
                          color: favourite?.map(fav => fav.product_id === product.id && fav.favourite === 1 ? 'red' : undefined).includes('red') 
                            ? 'red' 
                            : undefined ,fontSize: '40px', cursor: 'pointer', position: 'absolute', right: '0'
                        }} 
                        onClick={() => handleHeart(product)}
                        />
                      </WrapperRate>
                      
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
                          product.discount === 0 ? (
                            <>
                            {product.variants && product.variants.length > 0 ? (
                              <div className='newPrice'>
                              <p>{Number(selectedVariantPrice).toLocaleString('vi-VN')}</p>
                              <p>đ</p>
                            </div>
                            ) : (
                              <div className='newPrice'>
                                <p>{Number(product.price).toLocaleString('vi-VN')}</p>
                                <p>đ</p>
                              </div>
                            )}
                            </>
                          ) : (
                            <>
                              {product.variants && product.variants.length > 0 ? (
                                <>
                                  <div className='oldPrice'>
                                    <p>{Number(selectedVariantPrice ).toLocaleString('vi-VN')}</p>
                                    <p>đ</p>
                                  </div>
                                  <div className='arrow'>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </div>
                                  <div className='newPrice'>
                                    <p>{Number((selectedVariantPrice ) - (selectedVariantPrice  * (product.discount / 100))).toLocaleString('vi-VN')}</p>
                                    <p>đ</p>
                                  </div>
                                </>
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
                              )}
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
                          <Button className='OrderProduct' type="primary" onClick={showModal} >Mua hàng</Button>
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
                            {
                              product.discount === 0 ? (
                                product.variants && product.variants.length > 0 ? (
                                  <div className='Price'>
                                    <p>{Number(product.variants[0]?.price).toLocaleString('vi-VN')}</p>
                                    <p>đ</p>
                                  </div>
                                ) : (
                                  <div className='Price'>
                                    <p>{Number(product.price).toLocaleString('vi-VN')}</p>
                                    <p>đ</p>
                                  </div>
                                )
                              ) : (
                                product.variants && product.variants.length > 0 ? (
                                  <>
                                    <div className='oldPrice'>
                                      <p>{Number(product.variants[0]?.price).toLocaleString('vi-VN')}</p>
                                      <p>đ</p>
                                    </div>
                                    <div className='newPrice'>
                                      <p>{Number((product.variants[0]?.price) - (product.variants[0]?.price * (product.discount / 100))).toLocaleString('vi-VN')}</p>
                                      <p>đ</p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className='oldPrice'>
                                      <p>{Number(product.price).toLocaleString('vi-VN')}</p>
                                      <p>đ</p>
                                    </div>
                                    <div className='newPrice'>
                                      <p>{Number((product.price) - (product.price * (product.discount / 100))).toLocaleString('vi-VN')}</p>
                                      <p>đ</p>
                                    </div>
                                  </>
                                )
                              )
                            }
                            </WrapperPriceSimilar>
                            <WrapperConditionSimilar onClick={() => handleClick(product)}>
                              <div className="soldProduct">
                                <p>Đã bán:</p>
                                <p>{product.sold}</p>
                              </div>
                            </WrapperConditionSimilar>
                            <WrapperRateSimilar>
                            <HeartFilled style={{ 
                              color: favourite?.map(fav => fav.product_id === product.id && fav.favourite === 1 ? 'red' : undefined).includes('red') 
                                ? 'red' 
                                : undefined 
                            }} 
                            onClick={() => handleHeart(product)} />
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
                  product.variants && product.variants.length > 0 && selectedVariant ? (
                    <>
                      <p>{selectedVariant.name}</p>
                      <p>{(Number((selectedVariant.price) - (selectedVariant.price * (product.discount / 100)))*amount).toLocaleString('vi-VN')} đ</p>
                    </>
                  ):(
                    <p>{(Number((product.price) - (product.price * (product.discount / 100)))*amount).toLocaleString('vi-VN')} đ</p>
                  )
                }
                
              </div>
              {
                user && (
                  <div className='information'>
                    <div>
                      <p>Tới: {user.name}</p>
                      <div className='phone'>
                      <p>Số điện thoại: </p>
                      <div>
                        {
                            user.phone !== null ? (
                              <p>{user.phone}</p>
                            ) : (
                              <p style={{color: '#1677ff', cursor: 'pointer'}} onClick={() => navigate('/information')}>Thay dổi</p>
                            )
                          }
                      </div>
                        
                      </div>
                    </div>
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
                         price: product.price,
                         discount: product.discount
                        };
                 
                       if(!(user.address)){
                         message.error('Vui lòng điền địa chỉ nhận hàng')
                         setIsModalOpen(true);
                       }
                       else if(!(user.phone)){
                         message.error('Vui lòng thêm số điện thoại');
                         setIsModalOpen(true);
                       }
                       else{
                         userOrder(data)
                         .then((response) =>{
                          const data = response.data;
                            if(data.message === 'success'){
                              setAmount(1)
                              message.success('Đặt hàng thành công')
                              setIsModalOpen(false);
                            }
                            else{
                              setAmount(1)
                              message.error('Dặt hàng thất bại')
                              setIsModalOpen(false);
                            }
                          })
                          .catch((error) => {
                            setAmount(1)
                            message.error('Có lỗi xảy ra, vui lòng thử lại!');
                            setIsModalOpen(false);
                          })
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