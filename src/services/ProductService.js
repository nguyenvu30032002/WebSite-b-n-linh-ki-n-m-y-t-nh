import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function ProductService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    // useEffect(() => {
    //     const fetchProducts = async() => {
    //         try{
    //             console.log(searchTerm)
    //             const response = await axios.get(`${apiUrl}/product/getAll`);
    //             const products = response.data
    //             setProducts(products)
    //         }catch(error) {
    //             throw error
    //         }
    //     }
    //     fetchProducts();
    // }, [])

    const getAllProduct = useCallback(async (data) => {
        try {
            console.log('afss', data)
            const response = await axios.get(`${apiUrl}/product/getAll`, {
                params: { search: data }, // Truyền tham số tìm kiếm
                headers: {
                    "Content-Type": "application/json",
                },
            });
             // Cập nhật danh sách sản phẩm
             console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }, [apiUrl]); 

    /////////////////////////////////////////////////////////
    
    useEffect(() => {
        const fetchCategories = async() => {
            try{
                const response = await axios.get(`${apiUrl}/categories/getAll`,)
                const categories = response.data
                setCategories(categories)
            }
            catch(error){
                throw error
            }
        }
        fetchCategories();
    }, [])
    return {
        getAllProduct,
        products,
        categories,
    }
}   