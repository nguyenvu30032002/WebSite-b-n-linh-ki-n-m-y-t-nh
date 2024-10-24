import AuthUser from "./AuthUser";
import axios from "axios";
import { message } from "antd"; 
import { useCallback, useEffect, useState } from "react";

export default function UserService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const {token, getUser} = AuthUser();

    const [orders, setOrders] = useState([]);
    const userOrder = useCallback(async(order) => {
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
         return response
          
      } catch (err) {
          message.error(<>Đặt hàng thất bại <br />Vui lòng thử lại</>)
          throw err
          
      }
  }, [])

    const getOrder = useCallback(async() => {
      try {
          const user = getUser();
      if (user && user.id !== null) { // Kiểm tra nếu user không phải null
          const response = await axios.get(`${apiUrl}/getAllOrder/${user.id}`, {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
              }
          });
          setOrders(response.data)
          return response.data;
      } 
      } catch (error) {
          throw error;
      }
  }, [])

    

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
  }, [getOrder]); // Chạy lại nếu getOrder thay đổi

  ////////////////////////////////////////////////////////////////////////

  const updateCondition = async(condition, idOrder, product_id) => {
    try{
      console.log(product_id, condition , idOrder)
      const response = await axios.post(
        `${apiUrl}/condition/${idOrder}`, 
        {condition: condition,
          product_id: product_id
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        if(response.data.message === "success"){
          message.success("Xác nhận thành công")
          
        }
        else{
          message.error("Lỗi xác nhận")
        }
        const updatedOrders  = await getOrder();
          setOrders(updatedOrders)
    }
    catch(error){
      throw error
    }
  }

  /////////////////////////////////////////////////////////////

  const [carts,  setCarts] = useState([]);


  const userCart = useCallback(async(cart) => {
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
      return response
    }
    catch(error){
      message.error(<>Thêm vào giỏ hàng thất bại <br />Vui lòng thử lại</>)
      throw error
    }
  }, [])


  const getCart = useCallback(async() => {
    try {
      const user = getUser();
      if (user && user.id !== null) {
        const response = await axios.get(`${apiUrl}/getAllCart/${user.id}`, {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });
      setCarts(response.data)
      return response.data
      }

  } catch (error) {
      throw error;
  } 
}, []);



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

useEffect(() =>{
  const fetchCart = async() => {
    try{
      const fetchedCart = await getCart();
      setCarts(fetchedCart)
    }
    catch(error){
      throw error
    }
  };
  fetchCart();
}, [getCart])
  

const updateCart = async(id, value) => {
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
        const updatedCart = await getCart();
        setCarts(updatedCart);
      
      return response
  }
  catch(error){
    message.error("Cập nhật đơn hàng thất bại")
    throw error
  }
}

const orderCart = async(orderCart) => {
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
      const updatedCart = await getCart();
      setCarts(updatedCart);
      return response;
      
  } catch (err) {
      message.error(<>Đặt hàng thất bại <br />Vui lòng thử lại</>)
      throw err
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
      setCarts(updatedCart)
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
      carts,
      updateCart,
      orderCart,
      getCart,
      deleteCart,
    };
}
