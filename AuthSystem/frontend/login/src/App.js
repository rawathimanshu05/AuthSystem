
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { useState } from 'react';
import Refreshhandler from './Refreshhandler';

function App() {

  const [isauth, setauth] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isauth ? element : <Navigate to="/login" />;
  };


  return (
    <div className="App">
      <Refreshhandler setauth={setauth} />
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
    </Routes>
    </div>
  );
}

export default App;
