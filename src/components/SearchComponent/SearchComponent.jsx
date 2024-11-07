import { useCallback, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import {WrapperSearch} from "./style"
import ArticleComponent from "../ArticleComponent/ArticleComponent";


const SearchComponent = () => {
    const {getAllProduct} = ProductService();
    // const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    //     const fetchProducts = useCallback(async() => {
    //         try{
    //             const data = await getAllProduct(searchTerm)
    //             setProducts(data)
    //         }
    //         catch(error)
    //         {
    //             throw error
    //         }
    //     }, [getAllProduct, searchTerm])

    

    // useEffect(() => {
    //     fetchProducts(); // Gọi hàm để lấy sản phẩm
    // }, [fetchProducts]);

    const handleButton = (value) => {
        getAllProduct(value)
        // console.log(value)
        setSearchTerm(value)
    };
    return(
        <div>
           <WrapperSearch onSearch={handleButton} name="Search" style={{borderRadius: "20px", height: "60px"}} placeholder="Search" enterButton="Search" size="large"/>
        </div>
    )
}

export default SearchComponent 