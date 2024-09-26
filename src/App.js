
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


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/information' element={<Information/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/administrator' element={<Administrator/>}/>
          <Route path='/changePassword' element={<ChangPassword/>}/>
          <Route path='/product/id/:id/name/:name' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
