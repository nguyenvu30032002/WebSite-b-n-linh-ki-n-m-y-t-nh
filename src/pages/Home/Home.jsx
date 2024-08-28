import React from "react";
import Header from "../../parts/Header/Header";
import AnimatedImage from "../../parts/Slider/Slider";
import { AnimatedImageWrapper, WrapperHeader } from "./style";
import Main from "../../parts/Main/Main";
import Footer from "../../parts/Footer/Footer";



const Home = () => {
    return(
        <div>
            <WrapperHeader>
                <Header/>
            </WrapperHeader>
           
           <AnimatedImageWrapper>
                <AnimatedImage />
            </AnimatedImageWrapper>
            <Main/>
            <Footer/>
        </div>
    )
}

export default Home;