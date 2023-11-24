import './App.css';
import Authentication from './components/Authentication';
import CashRegister from './components/CashRegister';
import { useState } from 'react';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const authToken = sessionStorage.getItem('authToken')

  const handleAuthentication = () => {
    setIsAuthenticated(!isAuthenticated)
  }

  return (
    sessionStorage.getItem("isAuthenticated")
      ? <CashRegister authToken={authToken} handleAuthentication={handleAuthentication} />
      : <Authentication handleAuthentication={handleAuthentication} />
  );
}

export default App;
