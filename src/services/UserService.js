import AuthUser from "./AuthUser";
import axios from "axios";
import { message } from "antd"; 
import { useCallback, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

export default function UserService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const {token} = AuthUser();
    const [orders, setOrders] = useState([]);
    // const dispatch = useDispatch();
    const [user, setUser] = useState('');


  const getUser = useCallback(async() => {
    try{
      if(token){
        const response = await axios.get(`${apiUrl}/me`,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
        });
        setUser(response.data)
        return response.data;
      }
    }catch(error){
      throw error
    }
  },[token, apiUrl]) 

  useEffect(() => {
    getUser();
  }, [getUser]);

//////////////////////////////////////// ORDER ////////////////////////////////////////////////////////

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
         return response
          
      } catch (err) {
          throw err
      }
  }, [token, apiUrl])

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

  ////////////////////////////// CART  ///////////////////////////////

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
      
      
      return response
    }
    catch(error){
      throw error
    }
  }, [])


  const getCart = useCallback(async() => {
    try {
      const user = await getUser()
      if (user) {
        const response = await axios.get(`${apiUrl}/getAllCart/${user.id}`, {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });
      return response.data
      }
  } catch (error) {
      throw error;
  } 
  }, [getUser, apiUrl, token]);



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
// }, [getCart])
  

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
//////////////////////////////////////////////// COMMENT ////////////////////////////////////////

    const createComment = useCallback(async(data) => {
      try{
        
        const response = await axios.post(`${apiUrl}/createComment`,
          data,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        });
        return response
      }catch(error){
        throw error
      }
    }, [token, apiUrl])


    const getAllComments = useCallback(async(data) => {
      const { product_id, user_id } = data;
      try{
        const response = await axios.get(`${apiUrl}/comments/getAll/${product_id}`,
         { params: { user_id },
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response.data
      }catch(error){
        throw error
      }
    },[apiUrl])

/////////////////////////////////////////// FAVOURITE ////////////////////////////////////////////////////////////////////

    const createFavourite = useCallback(async(data) => {
      const { product_id, user_id } = data;
      try{
        const response = await axios.post(`${apiUrl}/createFavourite`,
          {
            product_id, user_id
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            }
          })
          return response
      }catch(error){
        throw error
      }
    },[apiUrl,token])

    const getAllFavourite = useCallback(async(user) => {
     
      try{
        const response = await axios.get(`${apiUrl}/getAllFavourite/${user}`,
         {
          headers: {
            "Content-Type": "application/json",
          }
        });
        return response.data
      }catch(error){
        throw error
      }
    },[apiUrl])

    const deleteFavourite = useCallback(async(data) => {
      const { product_id, user_id } = data;
      try{
        const response = await axios.delete(`${apiUrl}/deleteFavourite/${user_id}/${product_id}`,
          {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        });
        return response.data
      }catch(error){
        throw error
      }
    },[apiUrl,token])

    return {
      user,
      userOrder,
      orders,
      updateCondition,
      userCart,
      carts,
      updateCart,
      orderCart,
      getCart,
      deleteCart,
      createComment,
      getAllComments,
      createFavourite,
      getAllFavourite,
      deleteFavourite
    };
}
