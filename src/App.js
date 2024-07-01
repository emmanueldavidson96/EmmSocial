import './App.css';
import {
  Outlet, 
  Navigate, 
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import { Home, Register, Login, ResetPassword, Profile } from './pages';
import { useSelector } from 'react-redux';

function Layout(){
  const {user} = useSelector((state) => state.user);
  const location = useLocation()
  console.log(user)

  return user?.token ? (
    <Outlet />
  ): (
    <Navigate to="/login" state={{from: location}} replace />
  )
}

function App() {
  const { theme } = useSelector((state) => state.theme);
  
  return (    <div className="w-screen min-h-[100vh] bg-blue-800" data-theme={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/profile/:id" element={<Profile/>}/>
        </Route>

        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
    </div>
  );
}

export default App;
