import axios from "axios";
import { useCallback } from "react";

export default function ProductService() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const getAllProduct = useCallback(async (data) => {
        try {
            const response = await axios.get(`${apiUrl}/product/getAll`, {
                params: { search: data }, // Truyền tham số tìm kiếm
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }, [apiUrl]); 

    // const getProduct = useCallback(async(id_product) => {
    //     try{
    //         const response = await axios.get(`${apiUrl}/product/getOne/${id_product}`,{
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //         return response.data
    //     }catch(error) {
    //         throw error
    //     }
    // }, [apiUrl])

    const getProductSimilar = useCallback(async(product) => {
        try{
            const response = await axios.get(`${apiUrl}/product/similar`,{
                params: { productType: product.productType, id: product.id },
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response.data
        }catch(error) {
            throw error
        }
    }, [apiUrl])

    /////////////////////////////////////////////////////////
    
    const getAllCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/categories/getAll`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }, [apiUrl]); 

    return {
        getAllProduct,
        // getProduct,
        getProductSimilar,
        getAllCategories,
        
    }
}   