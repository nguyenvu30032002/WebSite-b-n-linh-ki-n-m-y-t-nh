
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Information from './pages/Information/Information';
import Order from './pages/Order/Order';
import Administrator from './pages/Administrator/Administrator';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/information' element={<Information/>}/>
          <Route path='order' element={<Order/>}/>
          <Route path='administrator' element={<Administrator/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
