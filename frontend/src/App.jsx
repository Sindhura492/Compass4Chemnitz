import reaact from "react"
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound"
import Login from "./components/Login/Login"
import Home from "./components/Home"
import Categories from "./components/Categories/Categories"
import UserAccount from "./components/UserAccount/UserAccount"
import Favourites from "./components/Favourites/Favourites"


function Logout(){
  localStorage.clear()
  return <Navigate to='/login'/>
}


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/categories' element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
          <Route path='/user' element={<ProtectedRoute><UserAccount /></ProtectedRoute>} />
          <Route path='/favourite' element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
          <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
