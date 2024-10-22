import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { message } from "antd";

export default function AdminService(){
    const apiUrl = process.env.REACT_APP_API_URL_ADMIN;
    const {token} = AuthUser();
    const [orders, setOrders] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])

///////////// ADMIN ///////////////////////////////////////

    const createAdmin = async(values) => {
        try{
            const response = await axios.post(`${apiUrl}/createAdmin`, 
            {
                email: values.email,
                password: values.password,
                name: values.name,
                phone: values.phone,
                gender: values.gender,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response;
        }

        catch(error){
            throw error
        }
    }

    const getAdmin = useCallback(async () => {
        try{
            const response = await axios.get(`${apiUrl}/getAdmin`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            setAdmins(response.data)
            return response.data
        }
        catch(error){
            throw error
        }
    }, [])

    const deleteAdmin = async(selectedRowKeys) =>{
        try{
            const response = await axios.delete(`${apiUrl}/deleteAdmin`,
                {    data: { selectedRowKeys }, 
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (response.data.message === 'success') { // Giả sử server trả về một thuộc tính 'success'
                message.success('Xóa người dùng thành công');
            } else {
                message.error('Xóa người dùng thất bại'); // Nếu có lỗi từ server
            }
        }
        catch(error){
            throw error
        }
    }


    useEffect(() => {
        const fetchAdmin = async() => {
            try{
                const dataAdmin = await getAdmin()
                setAdmins(dataAdmin)
            }
            catch(error){
                throw error
            }
        }
        fetchAdmin()
    }, [getAdmin])


//////////////////////////////////// USER ////////////////////////////

const getUser = useCallback(async () => {
    try{
        const response = await axios.get(`${apiUrl}/getUser`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        setUsers(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}, [])


useEffect(() => {
    const fetchUser = async() => {
        try{
            const dataUser = await getUser()
            setUsers(dataUser)
        }
        catch(error){
            throw error
        }
    }
    fetchUser()
}, [getUser])


////////////////////// PRODUCT ///////////////////////////////

const getProduct = useCallback(async () => {
    try{
        const response = await axios.get(`${apiUrl}/getProduct`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        setProducts(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}, [])


useEffect(() => {
    const fetchProduct = async() => {
        try{
            const dataProduct = await getProduct()
            setProducts(dataProduct)
        }
        catch(error){
            throw error
        }
    }
    fetchProduct()
}, [getProduct])


////////////////////////// CATWGORIES ////////////////////

const getCategories = useCallback(async () => {
    try{
        const response = await axios.get(`${apiUrl}/getCategories`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        setCategories(response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}, [])


useEffect(() => {
    const fetchCategories = async() => {
        try{
            const dataCategories = await getCategories()
            setCategories(dataCategories)
        }
        catch(error){
            throw error
        }
    }
    fetchCategories()
}, [getCategories])



///////////////////////// ORDER ///////////////////////////


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
        createAdmin,
        admins,
        deleteAdmin,
        users,
        products,
        categories,
        updateOrder,
        orders
    }
}