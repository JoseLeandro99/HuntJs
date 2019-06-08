import React from 'react';
import './style.css'

import Header from './components/header'
import Main from './pages/main'

import Routes from './routes'

const App = () => (
  <div className="app">
    <Header/>
    <Routes/>
  </div>
)

export default App;
