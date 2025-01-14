import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/Action";
import {WrapperSearch} from "./style"


const SearchComponent = () => {
    const dispatch = useDispatch();
    const handleButton = (value) => {
        dispatch(setSearchTerm(value));  // Gửi action setSearchTerm để cập nhật state
    };
    return(
        <div>
           <WrapperSearch 
            onSearch={handleButton}
            // name="Search" 
            // style={{borderRadius: "20px", height: "60px"}} 
            placeholder="Search" 
            enterButton="Search" 
            size="large"/>
        </div>
    )
}

export default SearchComponent 