import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { message } from "antd";

export default function AdminService(){
    const apiUrl = process.env.REACT_APP_API_URL_ADMIN;
    const {token} = AuthUser();
    const [orders, setOrders] = useState([]);

    const getAllOrder = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/getOrder`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setOrders(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }, []);

    useEffect(() => {
        const fetchAllOrder = async() => {
            try{
                const dataOrder= await getAllOrder()
                setOrders(dataOrder);
            }
            catch(error){
                throw error
            }
        }
        fetchAllOrder();
    }, [getAllOrder])

    const updateOrder = async(condition, id) => {
        try{
            const response = await axios.post(`${apiUrl}/updateOrder`, 
                {
                    id: id,
                    condition: condition
                },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.data.message === 'Đã giao'){
                message.success('Xác nhận đơn hàng thành công')
            }
            else if(response.data.message === 'Đã hủy'){
                message.success('Hủy đơn hàng thành công')
            }
            else{
                message.error('Lỗi xác nhận đơn hàng')
            }
            const dataOrder= await getAllOrder()
            setOrders(dataOrder);
            //  getAllOrder()
        }
        catch(error){
            throw error
        }
    }
    return{
        updateOrder,
        orders
    }
}