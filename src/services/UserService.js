import AuthUser from "./AuthUser";
import axios from "axios";
import { message } from "antd"; 
import { useEffect, useState } from "react";

export default function UserService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const {token, getUser} = AuthUser();
    
    const userOrder = async(order) => {
        try {
            console.log('Order data being sent: ', order);
            const response = await axios.post(
                `${apiUrl}/order`, 
                order, // Gửi dữ liệu order
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Đính kèm token vào header
                    }
                }
            );
            message.success('Đặt hàng thành công')
            return response;
            
        } catch (err) {
            message.error(<>Đặt hàng thất bại <br />Vui lòng thử lại</>)
            throw err
            
        }
    }
    const getOrder = async() => {
        try {
            const response = await axios.get(`${apiUrl}/getAllOrder/${getUser().id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.data
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }

    const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrder(); // Gọi getOrder và lưu kết quả
        setOrders(fetchedOrders); // Cập nhật state với đơn hàng đã lấy
      } catch (error) {
        throw error;
      }
    };
    fetchOrders(); // Gọi hàm fetchOrders khi component mount
  }, []); // Chạy lại nếu getOrder thay đổi

  const updateCondition = async(condition, idOrder) => {
    try{
      const response = await axios.post(
        `${apiUrl}/condition/${idOrder}`, 
        {condition: condition},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Đính kèm token vào header
            }
        });
        if(response.data.message === "success"){
          message.success("Xác nhận thành công")
          const updatedOrders  = await getOrder();
          setOrders(updatedOrders)
        }
        else{
          message.error("Lỗi")
          const updatedOrders  = await getOrder();
          setOrders(updatedOrders)
        }
        return response.data
    }
    catch(error){
      throw error
    }
  }

    return {
      userOrder,
      getOrder,
      orders,
      updateCondition
    };
}
