import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Create from './views/Create';





function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/create' element={<Create/>}/>


      </Routes>
    </div>
  );
}

export default App;