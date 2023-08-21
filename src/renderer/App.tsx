import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import React, { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';
import LoginForm from './components/LoginForm';
import Dashboard from './dashboard';
import './Styles/App.css';

 

export default function App() {

  const [User,SetUser] = useState({
    role:"",
    connected:false
  })
  return (
    <Router>
      <Routes>
        <Route path="/"  element={User.connected ? <Dashboard User={User}/> : <LoginForm SetUser={SetUser}/>} />
        
      </Routes>
    </Router>
  );
}
