import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap CSS
import Landing from './pages/common/Landing';
import './App.css'
import SignUp from './pages/common/Signup';
import Login from './pages/common/Login';
import VerifyOTP from './pages/common/VerifyOTP';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div><Landing></Landing></div>
      <SignUp></SignUp>
      <Login></Login>      
      <VerifyOTP></VerifyOTP>
    </>
  )
}

export default App
