import React from 'react';

import './App.css';
import Navbar from './Components/Navbar';
import Likes from './Components/Likes';
function App() {
  return (
    <div className="App">
      {/* Here Navbar and Likes are functions */}
     <Navbar/>
     <Likes/>
    </div>
  );
}

export default App;
