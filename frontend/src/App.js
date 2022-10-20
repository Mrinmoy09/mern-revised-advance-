import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
    
    <Router>
    <Header></Header>
      <div className='container'>
         <Routes>
           <Route path='/' element={<Dashboard/>}></Route>
           <Route path='/login' element={<Login/>}></Route>
           <Route path='register' element={<Register/>}></Route>
         </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
