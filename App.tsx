import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { ServiceDetail } from './pages/ServiceDetail';
import { Booking } from './pages/Booking';
import { PaymentResult } from './pages/PaymentResult';
import { Login } from './pages/Login';
import { Orders } from './pages/Orders';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/result" element={<PaymentResult />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;