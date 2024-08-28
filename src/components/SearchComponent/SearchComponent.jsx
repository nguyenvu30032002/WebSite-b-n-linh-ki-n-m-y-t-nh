import React from "react";
import {WrapperSearch} from "./style"


const SearchComponent = () => {
    return(
        <div>
            <WrapperSearch style={{borderRadius: "20px", height: "60px"}} placeholder="Search" enterButton="Search" size="large"/>
        </div>
    )
}

export default SearchComponent 