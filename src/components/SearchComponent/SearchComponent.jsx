import ProductService from "../../services/ProductService";
import {WrapperSearch} from "./style"


const SearchComponent = () => {
    const {getAllProduct} = ProductService();

    const handleButton = (value) => {
       getAllProduct(value)
    };
    return(
        <div>
           <WrapperSearch onSearch={handleButton} name="Search" style={{borderRadius: "20px", height: "60px"}} placeholder="Search" enterButton="Search" size="large"/>
        </div>
    )
}

export default SearchComponent 