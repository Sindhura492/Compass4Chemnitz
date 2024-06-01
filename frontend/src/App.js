import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home'
import About from './components/About';
import Create from './views/Create';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;