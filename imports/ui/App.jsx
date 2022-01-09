import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { Container } from 'react-bootstrap';
import { Header } from './Header';

export const App = () => {
  return (
    <div className='app'>
      <Header />
      <Container>
        <Routes>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Container>
    </div>
  );
};
