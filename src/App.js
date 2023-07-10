
import './App.css';
import {Routes,Route} from "react-router-dom";
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import RequiresAuth from './components/RequiresAuth';
import ProfilePage from './pages/ProfilePage';
import Bookmarks from './pages/Bookmarks';
import Explore from './pages/Explore';
import { useUsers } from './contexts/UserContext';
import { useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Bookmarks" element={<Bookmarks />}/>
        <Route path="/Explore" element={<Explore />}/>
        <Route path="/Profile/:userName" element={<ProfilePage />}/>
        <Route element={<RequiresAuth />}>
        <Route path="/" element={<Landing />}/>
        <Route path="/Login" element={<LoginPage />}/>
        <Route path="/Signup" element={<SignupPage />}/>
        </Route>
      </Routes>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
