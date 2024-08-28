import React from "react";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { WapperHeader } from "./style";
import LogoComponent from "../../components/LogoComponent/LogoComponent";
import InformationComponent from "../../components/InformationComponent/InformationComponent.tsx";
import CartComponent from "../../components/CartComponent/CartComponent.jsx";


const Header = () => {
    return(
        <WapperHeader>
            <LogoComponent/>
            <SearchComponent/>
            <InformationComponent/>
            <CartComponent/>
        
        </WapperHeader>
    )
}

export default Header