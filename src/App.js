
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Information from './pages/Information/Information';
import Order from './pages/Order/Order';
import Administrator from './pages/Administrator/Administrator';
import ChangPassword from './pages/ChangePassword/ChangPassword';


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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
