import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Information from './pages/Information/Information';
import Order from './pages/Order/Order';
import Administrator from './pages/Administrator/Administrator';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthUser from './services/AuthUser';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/Store';

function App() {
    return (
        <div className="App">
            <Provider store={store}>  {/* Bọc ứng dụng trong Provider */}
                <BrowserRouter>
                
                    <AuthUserWrapper />
                </BrowserRouter>
            </Provider>
        </div>
    );
}

const AuthUserWrapper = () => {
    const { getToken, user } = AuthUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
          
        }
    }, [user, navigate]);
    return (
        
        <Routes>
            <>
            
                {/* Các route không yêu cầu đăng nhập */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='/' element={<Home />} />
                <Route path='/product/id/:id/name/:name' element={<Product />} />
                {/* Render Home chỉ nếu người dùng không phải là Admin */}
                {/* {(!user || user.role !== 'Admin') ? (
                    <Route path='/' element={<Home />} />
                ) : (
                    <Route path='/administrator' element={<Administrator />} />
                )} */}
            </>

            {/* Các route chỉ cho phép người dùng đã đăng nhập */}
            {getToken() !== null && (
                <>
                    {/* Các route chỉ dành cho Admin */}
                    {user?.role === 'Admin' && (
                        <Route path='/administrator' element={<Administrator />} />
                    )}

                    {/* Các route khác dành cho người dùng đã đăng nhập */}
                    <Route path='/information' element={<Information />} />
                    <Route path='/order' element={<Order />} />
                    <Route path='/changePassword' element={<ChangePassword />} />
                    <Route path='/cart' element={<Cart />} />
                </>
            )}
        </Routes>
    );
};

export default App;
