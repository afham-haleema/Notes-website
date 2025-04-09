import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth';
import Notes from './Components/Notes';
import Details from './Components/Details';


function App() {
  

  return (
   
    <Router>
      <div className='App'>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>
    </div>
    </Router>
    
    
  );
}

export default App;
