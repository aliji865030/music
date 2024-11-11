import React from 'react';
import './App.css';
import NavLeft from './Components/NavLeft';
import MainSection from './Components/MainSection';
import NavRight from './Components/NavRight';

const App = () => {
  return (
    <div className="flex w-screen min-h-screen bg-gray-900 text-white">
      <NavLeft />
      <MainSection />
      <NavRight />
    </div>
  );
};

export default App;

