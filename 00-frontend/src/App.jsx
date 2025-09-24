import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <>
      <SignedOut>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </SignedOut>
      <SignedIn>
        <Routes>
          <Route path='/' element={<AuthPage />} />
        </Routes>
      </SignedIn>
    </>
  )
}

export default App