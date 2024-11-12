import React from 'react';
import './App.css';
import NavLeft from './Components/NavLeft';
import MainSection from './Components/MainSection';

const App = () => {
  return (
    <div className="app flex w-screen min-h-screen bg-gray-900 text-white">
      <NavLeft />
      <MainSection />
    </div>
  );
};

export default App;

