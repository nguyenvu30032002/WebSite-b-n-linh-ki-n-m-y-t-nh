import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            try{
                const response = await axios.get(`${apiUrl}/product/getAll`);
                const products = response.data
                setProducts(products)
            }catch(error) {
                console.error('Error fetching products:', error);
                throw error
            }
        }
        fetchProducts();
    }, [])
    return {
        products
    }
}   