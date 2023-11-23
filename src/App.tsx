import Base from './Views/Base/Base'
import Logon from './Views/Base/Logon'
import Home from './Views/Home'
import SignUp from './Views/Base/SignUp'
import './App.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import RequireAuth from './Views/Authenticator/RequireAuth'
import useAuth from './hooks/useAuth'
function App() {
const {Auth,setAuth} = useAuth();
  return (
    <Routes>
      <Route path='/auth' element={<Base />}>
        <Route path='/auth/login' element={<Logon />} />
        <Route path='/auth/signup' element={<SignUp />} />
      </Route>
      <Route path='/home' element={<RequireAuth Auth={Auth} setAuth={setAuth}/>}>
        <Route path='/home/' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
