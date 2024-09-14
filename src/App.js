
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Information from './pages/Information/Information';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/information' element={<Information/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
