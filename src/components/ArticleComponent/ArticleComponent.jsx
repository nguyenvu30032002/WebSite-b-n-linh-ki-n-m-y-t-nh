import React, { useState } from 'react';
import { Product, Wrapper, WrapperCondition, WrapperOrigin, WrapperPaginate, WrapperPrice, WrapperProduct } from './style';
import img from '../../assets/images/Product/man-hinh-gaming-asus-vy249hf-24-inch_2.webp';
import { Pagination } from 'antd';

const ArticleComponent = () => {
  // Danh sách 10 sản phẩm mẫu
  const products = [
    { id: 1, name: 'Màn hình Gaming ASUS VY249HF-R 24 inch', origin: 'USA', brand: 'Asus', newPrice: '999.999.999', oldPrice: '1.199.999.999', sold: '100+', inventory: '0' },
    { id: 2, name: 'Laptop Gaming ASUS TUF A15', origin: 'USA', brand: 'Asus', newPrice: '29.999.999', oldPrice: '32.999.999', sold: '200+', inventory: '50+' },
    { id: 3, name: 'Chuột Gaming Logitech G102', origin: 'China', brand: 'Logitech', newPrice: '499.000', oldPrice: '599.000', sold: '300+', inventory: '200+' },
    { id: 4, name: 'Bàn phím cơ Corsair K70 RGB', origin: 'USA', brand: 'Corsair', newPrice: '2.999.000', oldPrice: '3.499.000', sold: '150+', inventory: '75+' },
    { id: 5, name: 'Tai nghe SteelSeries Arctis 7', origin: 'USA', brand: 'SteelSeries', newPrice: '3.999.000', oldPrice: '4.299.000', sold: '120+', inventory: '60+' },
    { id: 6, name: 'Màn hình LG UltraWide 34WP500', origin: 'Korea', brand: 'LG', newPrice: '7.999.000', oldPrice: '8.999.000', sold: '90+', inventory: '30+' },
    { id: 7, name: 'Case máy tính NZXT H510', origin: 'USA', brand: 'NZXT', newPrice: '2.499.000', oldPrice: '2.999.000', sold: '80+', inventory: '40+' },
    { id: 8, name: 'Card đồ họa MSI RTX 3080', origin: 'Taiwan', brand: 'MSI', newPrice: '29.999.000', oldPrice: '32.999.000', sold: '60+', inventory: '25+' },
    { id: 9, name: 'SSD Samsung 970 EVO Plus 1TB', origin: 'Korea', brand: 'Samsung', newPrice: '3.199.000', oldPrice: '3.499.000', sold: '150+', inventory: '100+' },
    { id: 10, name: 'Nguồn Corsair RM750x', origin: 'USA', brand: 'Corsair', newPrice: '2.999.000', oldPrice: '3.199.000', sold: '70+', inventory: '35+' }
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

  return (
    <Wrapper>
      <WrapperProduct>
        {currentItems.map(product => (
          <Product key={product.id}>
            <p className='discountProduct'>-5%</p>
            <img src={img} alt={product.name} />
            <p className='nameProduct'>{product.name}</p>
            <WrapperOrigin>
              <p>{product.origin}</p>
              <p>{product.brand}</p>
            </WrapperOrigin>
            <WrapperPrice>
              <div className='newPrice'>
                <p>{product.newPrice}</p>
                <p>đ</p>
              </div>

              <div className='oldPrice'>
                <p>{product.oldPrice}</p>
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
