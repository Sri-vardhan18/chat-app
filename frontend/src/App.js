

import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';

import ChatPage from './Pages/ChatPage';  // Match the file name exactly



function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
      
        <Route path ='/chat' element ={<ChatPage />} />
      </Routes> 
    </>
   
  );
}

export default App;
