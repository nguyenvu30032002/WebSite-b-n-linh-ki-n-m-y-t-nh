import React, { useState } from 'react';
import { Product, ProductOutOfStock, Wrapper, WrapperArrange, WrapperCondition, WrapperConditionOutOfStock, WrapperOrigin, WrapperOriginOutOfStock, WrapperPaginate, WrapperPrice, WrapperPriceOutOfStock, WrapperProduct } from './style';
import img from '../../assets/images/Product/man-hinh-gaming-asus-vy249hf-24-inch_2.webp';
import { Button, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faArrowUpWideShort, faPercent } from '@fortawesome/free-solid-svg-icons';

const ArticleComponent = () => {
  // Danh sách 10 sản phẩm mẫu
  const products = [
    { id: 1, name: 'Màn hình Gaming ASUS VY249HF-R 24 inch', origin: 'USA', brand: 'Asus', newPrice: 999999999, oldPrice: 1199999999, sold: '100+', inventory: '0', img: img, },
    { id: 2, name: 'Laptop Gaming ASUS TUF A15', origin: 'USA', brand: 'Asus', newPrice: 29999999, oldPrice: 32999999, sold: '200+', inventory: '50+', img: img,  },
    { id: 3, name: 'Chuột Gaming Logitech G102', origin: 'China', brand: 'Logitech', newPrice: 499000, oldPrice: 599000, sold: '300+', inventory: '200+', img: img, },
    { id: 4, name: 'Bàn phím cơ Corsair K70 RGB', origin: 'USA', brand: 'Corsair', newPrice: 2999000, oldPrice: 3499000, sold: '150+', inventory: '75+', img: img, },
    { id: 5, name: 'Tai nghe SteelSeries Arctis 7', origin: 'USA', brand: 'SteelSeries', newPrice: 3999000, oldPrice: 4299000, sold: '120+', inventory: '60+', img: img, },
    { id: 6, name: 'Màn hình LG UltraWide 34WP500', origin: 'Korea', brand: 'LG', newPrice: 7999000, oldPrice: 8999000, sold: '90+', inventory: '30+', img: img, },
    { id: 7, name: 'Case máy tính NZXT H510', origin: 'USA', brand: 'NZXT', newPrice: 2499000, oldPrice: 2999000, sold: '80+', inventory: '40+', img: img, },
    { id: 8, name: 'Card đồ họa MSI RTX 3080', origin: 'Taiwan', brand: 'MSI', newPrice: 29999000, oldPrice: 32999000, sold: '60+', inventory: '25+', img: img, },
    { id: 9, name: 'SSD Samsung 970 EVO Plus 1TB', origin: 'Korea', brand: 'Samsung', newPrice: 3199000, oldPrice: 3499000, sold: '150+', inventory: '100+', img: img, variants : true },
    { id: 10, name: 'Nguồn Corsair RM750x', origin: 'USA', brand: 'Corsair', newPrice: 2999000, oldPrice: 3199000, sold: '70+', inventory: '35+', img: img, }
  ];

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
    navigate(`/product/id/${product.id}/name/${encodeURIComponent(product.name)}`, { state: { product } });
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
              <p className='discountProduct'>-5%</p>
              <img src={img} alt={product.name} />
              <p className='nameProduct'>{product.name}</p>
              <WrapperOrigin>
                <p>{product.origin}</p>
                <p>{product.brand}</p>
              </WrapperOrigin>
              <WrapperPrice>
                <div className='newPrice'>
                  <p>{(product.newPrice).toLocaleString('vi-VN')}</p>
                  <p>đ</p>
                </div>
        
                <div className='oldPrice'>
                  <p>{(product.oldPrice).toLocaleString('vi-VN')}</p>
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
              <p className='discountProduct'>-5%</p>
              <img src={img} alt={product.name} />
              <p className='nameProduct'>{product.name}</p>
              <WrapperOriginOutOfStock>
                <p>{product.origin}</p>
                <p>{product.brand}</p>
              </WrapperOriginOutOfStock>
              <WrapperPriceOutOfStock>
                <div className='newPrice'>
                  <p>{product.newPrice}</p>
                  <p>đ</p>
                </div>
        
                <div className='oldPrice'>
                  <p>{product.oldPrice}</p>
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
