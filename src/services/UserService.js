import AuthUser from "./AuthUser";
import axios from "axios";
import { message } from "antd"; 
import { useCallback, useEffect, useState } from "react";

export default function UserService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const {token, getUser} = AuthUser();
    
    const userOrder = async(order) => {
        try {
            const response = await axios.post(
                `${apiUrl}/order`, 
                order,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    }
                }
            );
            message.success(<>Đặt hàng thành công <br />Vui lòng kiểm tra đơn hàng của bạn</>)
            return response;
            
        } catch (err) {
            message.error(<>Đặt hàng thất bại <br />Vui lòng thử lại</>)
            throw err
            
        }
    }

    const getOrder = async() => {
        try {
            const user = getUser();
        if (user && user.id !== null) { // Kiểm tra nếu user không phải null
            const response = await axios.get(`${apiUrl}/getAllOrder/${user.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.data;
        } else {
            throw new Error("User không tồn tại");
        }
        } catch (error) {
            throw error;
        }
    }

    const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrder();
        setOrders(fetchedOrders); // Cập nhật state với đơn hàng đã lấy
      } catch (error) {
        throw error;
      }
    };
    fetchOrders();
  }, []); // Chạy lại nếu getOrder thay đổi

  ////////////////////////////////////////////////////////////////////////

  const updateCondition = async(condition, idOrder) => {
    try{
      const response = await axios.post(
        `${apiUrl}/condition/${idOrder}`, 
        {condition: condition},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        if(response.data.message === "success"){
          message.success("Xác nhận thành công")
          const updatedOrders  = await getOrder();
          // setOrders(updatedOrders)
        }
        else{
          message.error("Lỗi xác nhận")
          const updatedOrders  = await getOrder();
          // setOrders(updatedOrders)
        }
        return response.data
    }
    catch(error){
      throw error
    }
  }

  /////////////////////////////////////////////////////////////


  const [isLoading, setIsLoading] = useState(false);

  const getCart = useCallback(async() => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/getAllCart/${getUser().id}`, {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });
      return response.data
  } catch (error) {
      throw error;
  } finally {
    setIsLoading(false); // Đảm bảo được gọi dù có lỗi xảy ra hay không
  }
}, []);

// const [carts,  setCarts] = useState([]);

// const fetchCart = useCallback(async () => {
//   try {
//     const fetchedCart = await getCart();
//     setCarts(fetchedCart);
//   } catch (error) {
//     throw error
//   }
// }, [getCart]);

// useEffect(() => {
//   fetchCart();
// }, [fetchCart,getCart]);

// useEffect(() =>{
//   const fetchCart = async() => {
//     try{
//       const fetchedCart = await getCart();
//       setCarts(fetchedCart)
//     }
//     catch(error){
//       throw error
//     }
//   };
//   fetchCart();
// }, [getCart,carts])
  

  const userCart = async(cart) => {
    setIsLoading(true)
    try{
      const response = await axios.post(
        `${apiUrl}/cart`, 
        cart,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        }
      );
      
      message.success(<>Thêm vào giỏ hàng thành công<br/> Vui lòng kiểm tra giỏ hàng của bạn </>)
      // fetchCart()
      return response
    }
    catch(error){
      message.error(<>Thêm vào giỏ hàng thất bại <br />Vui lòng thử lại</>)
      throw error
    }finally {
      setIsLoading(false); // Đảm bảo được gọi dù có lỗi xảy ra hay không
    }
  }



const updateCart = async(id, value) => {
    setIsLoading(true)
  try{
    const response = await axios.post(
      `${apiUrl}/updateCart/${id}`, 
      {amount: value},
      {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
          }
      });
     
        message.success("Cập nhật đơn hàng thành công")
        // const updatedCart = await getCart();
        // setCarts(updatedCart);
        // fetchCart()
      
      return response.data
  }
  catch(error){
    message.error("Cập nhật đơn hàng thất bại")
    throw error
  }finally {
    setIsLoading(false); // Đảm bảo được gọi dù có lỗi xảy ra hay không
  }
}

const orderCart = async(orderCart) => {
  setIsLoading(true)
  try {
      const response = await axios.post(
          `${apiUrl}/orderCart`, 
          { orders: orderCart },
          {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` 
              }
          }
      );
      if(response.data.message === 'success'){
        message.success(<>Đặt hàng thành công <br />Vui lòng kiểm tra đơn hàng của bạn</>)
      }
      // const updatedCart = await getCart();
      // setCarts(updatedCart);
      // fetchCart()
      return response;
      
  } catch (err) {
      message.error(<>Đặt hàng thất bại <br />Vui lòng thử lại</>)
      throw err
  }finally {
    setIsLoading(false); // Đảm bảo được gọi dù có lỗi xảy ra hay không
  }
}

const deleteCart = async(checkedList) => {
    try{
      const response = await axios.post(
        `${apiUrl}/deleteCart`, 
          { id_cart: checkedList },
          {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` 
              }
          }
      );
      message.success('Xóa sản phẩm khỏi giỏ hàng thành công')
      const updatedCart = await getCart();
      // setCarts(updatedCart)
      return response
    }
    catch(error){
      message.error(<>Xóa sản phẩm khỏi giỏ hàng thất bại <br/> Vui lòng thử lại</>)
    }
}

    return {
      userOrder,
      orders,
      updateCondition,
      userCart,
      // carts,
      updateCart,
      orderCart,
      getCart,
      deleteCart,
      // fetchCart
    };
}
