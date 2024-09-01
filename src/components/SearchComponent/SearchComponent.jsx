import {WrapperSearch} from "./style"


const SearchComponent = () => {
    

    const handleButton = (value) => {
        console.log("Sending search data 2:", value);
        // Thực hiện gọi API hoặc xử lý dữ liệu
    };
    return(
        <div>
           <WrapperSearch onSearch={handleButton} name="Search" style={{borderRadius: "20px", height: "60px"}} placeholder="Search" enterButton="Search" size="large"/>
        </div>
    )
}

export default SearchComponent 