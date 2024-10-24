

import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import "./App.css"

import ChatPage from './Pages/ChatPage';  // Match the file name exactly



function App() {
  return (
    <div className='App'>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ='/chat' element ={<ChatPage />} />
      </Routes> 
    </div>
   
  );
}

export default App;
