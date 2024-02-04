import React from 'react';
import logo from './logo.svg';
import './App.css';
import Class from './components/Class';
import { Link, Route, Routes, useNavigate} from 'react-router-dom';
import Gamma from './components/Gamma';



function App() {

  const navigate = useNavigate();
  

  return (
    <div className="App">
      <nav className='navbar'>
        <Link to='/'>
          <img src='Manufac.png' alt='' className='logo-img' />
        </Link>
      </nav>
      <hr/>
    <div className='button-set'>
      <button className='class-set' onClick={() => navigate('/class')}>Class-Table</button>
      <button className='gamma-set' onClick={() => navigate('/gamma')}>Gamma-Table</button>
    </div>

    <Routes>
      <Route path='/class' element= {<Class />} />
      <Route path='/gamma' element= {<Gamma />} />
    </Routes>
    </div>
  );
}

export default App;
