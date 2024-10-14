import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductService() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchProducts = async() => {
            try{
                const response = await axios.get(`${apiUrl}/product/getAll`);
                const products = response.data
                setProducts(products)
            }catch(error) {
                throw error
            }
        }
        fetchProducts();
    }, [])

    /////////////////////////////////////////////////////////
    
    useEffect(() => {
        const fetchCategories = async() => {
            try{
                const response = await axios.get(`${apiUrl}/categories/getAll`)
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
        products,
        categories
    }
}   