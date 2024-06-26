import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { gMapKey } from './config';
import { LoadScript } from '@react-google-maps/api';

const App = () => {

  return (
    <LoadScript googleMapsApiKey={gMapKey} libraries={['places']}>
      <Navbar />
      <Main />
    </LoadScript>
  );
};

export default App;

