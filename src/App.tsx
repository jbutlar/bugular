import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import BugForm from './components/BugForm';

const App = () => {
  
  const [ counter, setCounter ] = useState(0);

  function setToValue(value) {
      return () => setCounter(value);
   }
  
  return (
    <>
    <br/><br/>
      <BugForm />          
    </>
  )
}

export default App;
