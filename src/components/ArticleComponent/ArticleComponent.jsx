import React, { useState } from 'react';
import { Product, ProductOutOfStock, Wrapper, WrapperArrange, WrapperCondition, WrapperConditionOutOfStock, WrapperOrigin, WrapperOriginOutOfStock, WrapperPaginate, WrapperPrice, WrapperPriceOutOfStock, WrapperProduct } from './style';
import { Button, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faArrowUpWideShort, faPercent } from '@fortawesome/free-solid-svg-icons';
import AuthUser from '../../services/AuthUser';
import ProductService from '../../services/ProductService';

const ArticleComponent = () => {
  const {getToken} = AuthUser();
  const {products} = ProductService();
  // Trạng thái trang hiện tại và số sản phẩm hiển thị trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Tính toán các sản phẩm hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm xử lý sự kiện thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();
  const handleClick = (product) => {
    if(getToken()){
      navigate(`/product/id/${product.id}/name/${encodeURIComponent(product.name)}`, { state: { product } });
    }
    else{
      navigate('/login')
    }
  }

  ////////////////////////////////////

   // State để lưu trạng thái của nút đang được nhấn
   const [selectedSort, setSelectedSort] = useState(null);
   // Hàm xử lý khi người dùng nhấn vào một nút
  const handleSortClick = (sortType) => {
    setSelectedSort(sortType);
    // Logic khác khi nhấn vào nút (ví dụ: gọi API để lấy sản phẩm sắp xếp)
  };
  return (
    <Wrapper>
      <WrapperArrange>
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
          product.inventory !== '0' ? (
            <Product onClick={() => handleClick(product)} key={product.id}>
              <p className='discountProduct'>-{(product.discount).toLocaleString('vi-VN')}%</p>
              <img src={product.image} alt={product.name} />
              <p className='nameProduct'>{product.name}</p>
              <WrapperOrigin>
                <p>{product.origin}</p>
                <p>{product.brand}</p>
              </WrapperOrigin>
              <WrapperPrice>
                <div className='newPrice'>
                  <p>{Number(product.price * product.discount).toLocaleString('vi-VN')}</p>
                  <p>đ</p>
                </div>
        
                <div className='oldPrice'>
                  <p>{Number(product.price).toLocaleString('vi-VN')}</p>
                  <p>đ</p>
                </div>
              </WrapperPrice>
        
              <WrapperCondition>
                <div className="soldProduct">
                  <p>Đã bán:</p>
                  <p>{product.sold}</p>
                </div>
                <div className="inventoryProduct">
                  <p>Kho:</p>
                  <p>{product.inventory}</p>
                </div>
              </WrapperCondition>
            </Product>
          ) : (
            <ProductOutOfStock key={product.id}>
                <p className='OutOfStock'>Hết hàng</p>
                <p className='discountProduct'>-{(product.discount).toLocaleString('vi-VN')}%</p>
                <img src={product.image} alt={product.name} />
                <p className='nameProduct'>{product.name}</p>
              <WrapperOriginOutOfStock>
                <p>{product.origin}</p>
                <p>{product.brand}</p>
              </WrapperOriginOutOfStock>
              <WrapperPriceOutOfStock>
                <div className='newPrice'>
                  <p>{(product.price * product.discount).toLocaleString('vi-VN')}</p>
                  <p>đ</p>
                </div>
        
                <div className='oldPrice'>
                  <p>{product.price.toLocaleString('vi-VN')}</p>
                  <p>đ</p>
                </div>
              </WrapperPriceOutOfStock>
        
              <WrapperConditionOutOfStock>
                <div className="soldProduct">
                  <p>Đã bán:</p>
                  <p>{product.sold}</p>
                </div>
                <div className="inventoryProduct">
                  <p>Kho:</p>
                  <p>{product.inventory}</p>
                </div>
              </WrapperConditionOutOfStock>
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
