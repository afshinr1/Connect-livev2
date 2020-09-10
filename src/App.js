import React, {useState, useEffect} from "react";
import "./App.css";
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {auth } from './Firebase'
import Header from "./components/Header/Header";
function App() {
  const [user, setUser] = useState(null)

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);
        console.log(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleUser = (newUser) => {
    setUser(newUser)
  }
  return (
    <div className='App'>
    
      <Router>
      <Header user={user} handleUser={handleUser}/>
      <Route exact path="/" render={(props) => <Home {...props} user={user} />} />
      <Route  path="/about" render={(props) => <About {...props} user={user}/>} />
      <Route  path="/contact" render={(props) => <Contact {...props} handleUser={handleUser} user={user}/>} />
      </Router>
    </div>
  );
}

export default App;
