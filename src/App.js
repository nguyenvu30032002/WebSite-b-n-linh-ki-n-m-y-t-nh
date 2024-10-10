import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Information from './pages/Information/Information';
import Order from './pages/Order/Order';
import Administrator from './pages/Administrator/Administrator';
import ChangPassword from './pages/ChangePassword/ChangPassword';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthUser from './services/AuthUser';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthUserWrapper />
            </BrowserRouter>
        </div>
    );
}

const AuthUserWrapper = () => {
    const { getToken } = AuthUser();
    const isAuthenticated = getToken();
    return (
        <Routes>
                <>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgotpassword' element={<ForgotPassword/>} />
                    <Route path='/' element={<Home />} />
                </>

            {/* Các route khác chỉ cho phép người dùng đã đăng nhập */}
            {isAuthenticated !== null && (
                <>
                    <Route path='/information' element={<Information />} />
                    <Route path='/order' element={<Order />} />
                    <Route path='/administrator' element={<Administrator />} />
                    <Route path='/changePassword' element={<ChangPassword />} />
                    <Route path='/product/id/:id/name/:name' element={<Product />} />
                    <Route path='/cart' element={<Cart />} />
                </>
            )}
        </Routes>
    );
};

export default App;
