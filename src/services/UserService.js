import AuthUser from "./AuthUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function UserService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const {token} = AuthUser();    // const dispatch = useDispatch();
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

  const updateUser = async (id, data) => {
    try {
      const response = await axios.post(`${apiUrl}/update/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      });
      return response;
    } catch (error) {
      throw error
    }
  };

  const changePassword = useCallback(async(id, data) =>{
    try{
      const response = await axios.post(`${apiUrl}/change_password/${id}`, 
        data,
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

    const getOrder = useCallback(async(user) => {
      try {
          const response = await axios.get(`${apiUrl}/getAllOrder/${user}`, {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
              }
          });
          return response.data;
      } catch (error) {
          throw error;
      }}, [apiUrl,token])


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
       return response
    }
    catch(error){
      throw error
    }
  }

  ////////////////////////////// CART  ///////////////////////////////

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
  }, [apiUrl, token])


  const getCart = useCallback(async(user) => {
    try {
     
        const response = await axios.get(`${apiUrl}/getAllCart/${user}`, {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });
      return response.data
  } catch (error) {
      throw error;
  } 
  }, [apiUrl, token]);

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
     
      return response
  }
  catch(error){
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
      return response;
      
  } catch (err) {
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
    
      return response
    }
    catch(error){
      throw error
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

    //////////////////////////////////////// CHAT MESSAGE /////////////////////////////////////////////////////////////////////

    const messageUser = useCallback(async(data) => {
      try{
        const response = await axios.post(`${apiUrl}/messages`,
          data,
          {
            
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            }
          })
          return response
      }
      catch(error){
        throw error
      }
    })

    const getMessageUser = useCallback(async(id) => {
      try{
        const response = await axios.get(`${apiUrl}/getMessage/${id}`,
          {
            
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            }
          })
          return response.data
      }catch(error)
      {
        throw error
      }
    }, [apiUrl,token])

    const readMessage = useCallback(async(id) => {
      try{
        const response = await axios.get(`${apiUrl}/readMessage/${id}`,
          {
            
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            }
          })
          return response
      }
      catch(error){
        throw error
      }
    })

    return {
      getUser,
      user,
      updateUser,
      changePassword,
      userOrder,
      getOrder,
      updateCondition,
      userCart,
      updateCart,
      orderCart,
      getCart,
      deleteCart,
      createComment,
      getAllComments,
      createFavourite,
      getAllFavourite,
      deleteFavourite,
      messageUser,
      getMessageUser,
      readMessage
    };
}
