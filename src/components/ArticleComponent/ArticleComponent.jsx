  import React, { useCallback, useEffect, useState } from 'react';
  import { Product, ProductOutOfStock, ToolTipSpan, Wrapper, WrapperArrange, WrapperCondition, WrapperConditionOutOfStock, WrapperPaginate, WrapperPrice, WrapperPriceOutOfStock, WrapperProduct, WrapperRate, WrapperRateOutOfStock } from './style';
  import { Button, message, Pagination, Rate, Tooltip } from 'antd';
  import { useNavigate } from 'react-router-dom';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faArrowDownWideShort, faArrowUpWideShort, faPercent } from '@fortawesome/free-solid-svg-icons';
  import ProductService from '../../services/ProductService';
  import { FilterOutlined, HeartFilled } from '@ant-design/icons';
  import { useDispatch, useSelector } from 'react-redux';
  import { setSearchTerm } from '../../store/Action';
import UserService from '../../services/UserService';

  const ArticleComponent = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [favourite, setFavourite] = useState([])
    const {getAllProduct, getAllVariants} = ProductService();
    const {user, createFavourite, getAllFavourite, deleteFavourite} = UserService();
    const [variants, setVariants] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState(null);
    const searchTerm = useSelector((state) => state.searchTerm);  
    
    const fetchProducts = useCallback(async() => {
      try{
          const data = await getAllProduct(searchTerm)
          setProducts(data)
      }
      catch(error)
      {
          throw error
      }
  }, [getAllProduct,searchTerm])

  useEffect(() => {
  fetchProducts(); 
  }, [fetchProducts]);

    // Trạng thái trang hiện tại và số sản phẩm hiển thị trên mỗi trang
    const itemsPerPage = 6;
    // Tính toán các sản phẩm hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    // Hàm xử lý sự kiện thay đổi trang
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

    const navigate = useNavigate();
    const handleClick = (product) => {
        window.scrollTo(0, 0);
        localStorage.setItem('redirectAfterLogin', `/product/id/${product.id}/name/${encodeURIComponent(product.name)}`);
        navigate(`/product/id/${product.id}/name/${encodeURIComponent(product.name)}`, { state: { product } });
        
    }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSortClick = (sortType) => {
      setSelectedSort((prevSortType) => {
          const newSortType = prevSortType === sortType ? null : sortType;
          if (newSortType) {
              dispatch(setSearchTerm(newSortType));
          } else {
              dispatch(setSearchTerm(''));
          }

          return newSortType;
      });
  };

    const fetchVariants = useCallback(async() => {
      try{
          const variants = await getAllVariants()
          setVariants(variants)
      }
      catch(error){
          throw error
      }
    },[getAllVariants])

    useEffect(() => {
      fetchVariants()
    },[fetchVariants]) 

    const text = () => {
      return [
        ...new Map(variants.map((variant) => [variant.name, variant])).values(),
      ].map((variant) => (
        <ToolTipSpan onClick={handleVariants} key={variant.id}>
          {variant.name}
        </ToolTipSpan>
      ));
    };

    const handleVariants = (e) => {
      dispatch(setSearchTerm(e.target.innerText));
    }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  
  const handleHeart = (product) => {
    if (user) {
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
      const data = await getAllFavourite(user.id)
      setFavourite(data)
    }
    catch(error){
      throw error
    }
  },[getAllFavourite, user.id])

  useEffect(() => {
    if(user){
      
      fetchFavourite()
    }
  }, [fetchFavourite, user])

    return (
      <Wrapper>
        <WrapperArrange>
          <Tooltip trigger={'click'} color='white' placement="bottom" title={text}>
            <FilterOutlined />
          </Tooltip>
          Sắp xếp theo:      
          <Button
            onClick={() => handleSortClick('desc')}
            className={selectedSort === 'desc' ? 'active' : ''}
            >
            <FontAwesomeIcon icon={faArrowDownWideShort} /> Giá cao đến thấp
          </Button>

          <Button
              onClick={() => handleSortClick('asc')}
              className={selectedSort === 'asc' ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faArrowUpWideShort} /> Giá thấp đến cao
          </Button>

          <Button
            onClick={() => handleSortClick('discount')}
            className={selectedSort === 'discount' ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faPercent} /> Khuyến mại hót
          </Button>
        </WrapperArrange>
        <WrapperProduct>
          {currentItems.map(product => (
            product.inventory !== 0 ? (
              <Product key={product.id}>
                
                  {product.discount !== 0 ? (
                    <p className='discountProduct'>-{(product.discount).toLocaleString('vi-VN')}%</p>
                  ) : null}
                  <img onClick={() => handleClick(product)} src={product.image} alt={product.name} />
                  <p onClick={() => handleClick(product)} className='nameProduct' style={{WebkitLineClamp: product.discount !== 0 ? 2 : 3,}}>{product.name}</p>
                  <WrapperPrice onClick={() => handleClick(product)}>
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
                  </WrapperPrice>
                  <WrapperCondition onClick={() => handleClick(product)}>
                    <div className="soldProduct">
                      <p>Đã bán:</p>
                      <p>{product.sold}</p>
                    </div>
                  </WrapperCondition>
                  <WrapperRate>
                  <HeartFilled 
                    style={{ 
                      color: favourite?.map(fav => fav.product_id === product.id && fav.favourite === 1 ? 'red' : undefined).includes('red') 
                        ? 'red' 
                        : undefined 
                    }} 
                    onClick={() => handleHeart(product)} 
                  />
                  {
                        Array.isArray(product.comments) && product.comments.length > 0 ? (
                          <Rate disabled allowHalf defaultValue={product.comments.length > 0 ? product.comments.reduce((acc, curr) => acc + curr.rate, 0) / product.comments.length : 0} />
                        ) : null
                      }
                  </WrapperRate>
              </Product>
            ) : (
              <ProductOutOfStock key={product.id}>
                  <p className='OutOfStock'>Hết hàng</p>
                  {
                  product.discount !== 0 ? (
                    <p className='discountProduct'>-{(product.discount).toLocaleString('vi-VN')}%</p>
                  ) : null
                  }
                  <img src={product.image} alt={product.name} />
                  <p className='nameProduct' style={{WebkitLineClamp: product.discount !== 0 ? 2 : 3,}}>{product.name}</p>
                <WrapperPriceOutOfStock>
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
                </WrapperPriceOutOfStock>
          
                <WrapperConditionOutOfStock>
                  <div className="soldProduct">
                    <p>Đã bán:</p>
                    <p>{product.sold}</p>
                  </div>
                </WrapperConditionOutOfStock>
                     
                    <WrapperRateOutOfStock>
                      <HeartFilled/>
                      {
                        Array.isArray(product.comments) && product.comments.length > 0 ? (
                          <Rate disabled allowHalf defaultValue={product.comments.length > 0 ? product.comments.reduce((acc, curr) => acc + curr.rate, 0) / product.comments.length : 0} />
                        ) : null
                      }  
                    </WrapperRateOutOfStock>             
              </ProductOutOfStock>
            )
          ))}
        </WrapperProduct>

        <WrapperPaginate>
          <Pagination
            current={currentPage}
            total={products.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </WrapperPaginate>
      </Wrapper>
    );
  };

  export default ArticleComponent;
