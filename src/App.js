import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppNavbar from './component/layouts/navbar';
import LeadApplication from './component/interview_task/LeadApplication';
import Login from './component/interview_task/Login'

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Login />} />  

        <Route path='/home' element={<LeadApplication />}>
      
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
