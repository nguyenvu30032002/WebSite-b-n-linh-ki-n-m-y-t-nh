import React from "react";
import Header from "../../parts/Header/Header";
import AnimatedImage from "../../parts/Slider/Slider";
import { AnimatedImageWrapper, Wrapper, WrapperHeader } from "./style";
import Main from "../../parts/Main/Main";
import Footer from "../../parts/Footer/Footer";
import MessageUserComponent from "../../components/Message/MessageUserComponent";



const Home = () => {
    return(
        <>
        <Wrapper>
            <WrapperHeader>
                <Header/>
            </WrapperHeader>
           <AnimatedImageWrapper>
                <AnimatedImage />
            </AnimatedImageWrapper>
            <Main/>
            <Footer/>
        </Wrapper>
        <MessageUserComponent/>
        </>
    )
}

export default Home;