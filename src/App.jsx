import {Route, BrowserRouter as Router, Routes, Navigate, Outlet} from 'react-router-dom'
import QuestionPage from './components/pages/questionPage'
import Login from './components/pages/loginPage'
import {auth} from './services/firebase'
import { useState, useEffect } from 'react'
import 'katex/dist/katex.min.css';
import './App.css'
import { AuthProvider } from './components/pages/authContext';
import { useAuth } from './components/pages/authContext';



function PrivateRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/" />;
}

function PublicRoute() {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/balances" />;
}




function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect( ()=> {
    //console.log("authenticated ", authenticated)
    auth.onAuthStateChanged((user)=> {
      //console.log(user)
      if (user) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    })
    }, []
  )

  return ( 
  <AuthProvider>
    <Router>
      <Routes>
        <Route exact path='/' element={<PublicRoute authenticated={authenticated} />}>
          <Route exact path='/' element={<Login />}/>
        </Route>
        <Route exact path='/balances' element={<PrivateRoute authenticated={authenticated} />}>
        <Route exact path='/balances' element={<QuestionPage />}/>
        </Route>
      </Routes>


    </Router>
    
  </AuthProvider>
  )
}

export default App;
