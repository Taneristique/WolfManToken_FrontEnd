import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Account from './Account'
import Header from './components/Header';
import Footer from './components/Footer'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Header/>
      <Routes>
        <Route index element={<App/>}/>
        <Route path="/" element={<App />} />
        <Route path="/account" element={<Account/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>  
  </React.StrictMode>
);
