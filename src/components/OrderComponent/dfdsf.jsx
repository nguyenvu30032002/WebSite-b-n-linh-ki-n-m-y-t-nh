
{order.order_detail.map((detail) => (
    <div className='orderDetail' key={detail.id}>
      <div className='imgProduct'>
        <img src={detail.created_by_product.image} alt="product" />
      </div>
      <div style={{flexDirection: 'column', margin: '0 0 0 10px'}}>
        <div className='nameProduct'>
          <p>{detail.created_by_product.name}</p>
        </div>
        <div className='amount'>
          <span>
            x <span style={{fontWeight: '500'}}>{detail.amount}</span> 
            {detail.variant && <span style={{fontWeight: '400', margin: ' 0 0 0 5px'}}>({detail.variant})</span>}
          </span>

          {/* Kiểm tra và render giá trị cho variants */}
          {detail.created_by_product.variants && detail.created_by_product.variants.length > 0 ? (
            detail.created_by_product.variants.map((vsrt) => 
              vsrt.name === detail.variant && (
                <div className='price' key={vsrt.id}>
                  <p className='newPrice'>
                    {Number(vsrt.price - (vsrt.price * detail.created_by_product.discount) / 100).toLocaleString('vi-VN')}đ
                  </p>
                  {detail.created_by_product.discount !== 0 && (
                    <p className='oldPrice'>{Number(vsrt.price).toLocaleString('vi-VN')}đ</p>
                  )}
                </div>
              )
            )
          ) : (
            <div className='price'>
              <p className='newPrice'>
                {Number(detail.created_by_product.price - (detail.created_by_product.price * detail.created_by_product.discount) / 100).toLocaleString('vi-VN')}đ
              </p>
              {detail.created_by_product.discount !== 0 && (
                <p className='oldPrice'>{Number(detail.created_by_product.price).toLocaleString('vi-VN')}đ</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ))}