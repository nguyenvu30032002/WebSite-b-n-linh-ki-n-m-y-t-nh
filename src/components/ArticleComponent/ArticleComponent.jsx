import React, { useCallback, useEffect, useState } from 'react';
import { Product, ProductOutOfStock, ToolTipSpan, Wrapper, WrapperArrange, WrapperCondition, WrapperConditionOutOfStock, WrapperPaginate, WrapperPrice, WrapperPriceOutOfStock, WrapperProduct, WrapperRate, WrapperRateOutOfStock } from './style';
import { Button, Pagination, Rate, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faArrowUpWideShort, faPercent } from '@fortawesome/free-solid-svg-icons';
import ProductService from '../../services/ProductService';
import { FilterOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/Action';

const ArticleComponent = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const {getAllProduct} = ProductService();

  // Trạng thái trang hiện tại và số sản phẩm hiển thị trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
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
fetchProducts(); // Gọi hàm để lấy sản phẩm
}, [fetchProducts]);

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
      navigate(`/product/id/${product.id}/name/${encodeURIComponent(product.name)}`, { state: { product } });
      
  }

////////////////////////////////////////////////////////////////////////////////////////////////////

   const [selectedSort, setSelectedSort] = useState(null);
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
  const { getAllCategories} = ProductService();
  const [categories, setCategories] = useState([])
  const fetchCategories = useCallback(async() => {
    try{
        const categories = await getAllCategories()
        setCategories(categories)
    }
    catch(error){
        throw error
    }
  },[getAllCategories])

  useEffect(() => {
    fetchCategories()
  },[fetchCategories]) 

  const text = () => {
    return categories.map((category) => 
      category.variants.map((variant) => (
        <ToolTipSpan onClick={handleVariants} key={variant.id}>{variant.name}</ToolTipSpan>
      ))
    );
  };

  const handleVariants = (e) => {
    dispatch(setSearchTerm(e.target.innerText));
  }

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
          <FontAwesomeIcon icon={faArrowDownWideShort} /> Cao đến thấp
         </Button>

         <Button
            onClick={() => handleSortClick('asc')}
            className={selectedSort === 'asc' ? 'active' : ''}
         >
          <FontAwesomeIcon icon={faArrowUpWideShort} /> Thấp đến cao
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
                </WrapperPrice>
                 <WrapperCondition onClick={() => handleClick(product)}>
                  <div className="soldProduct">
                    <p>Đã bán:</p>
                    <p>{product.sold}</p>
                  </div>
                </WrapperCondition>
                <WrapperRate>
                  <Rate disabled allowHalf defaultValue={1.5} />
                  <HeartFilled />
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
                <Rate disabled allowHalf defaultValue={1.5} />
                <HeartFilled />
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
