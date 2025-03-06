import { Route, Routes } from "react-router"
import { useState } from 'react'
import Homepage from './pages/homepage'
import Loginpage from './pages/login'
import Signuppage from './pages/signup'
import Navbar from "./components/navbar"
import Addbook from "./pages/addbook"
import {Toaster} from "react-hot-toast"

function App() {
  const [count, setCount] = useState(0)
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }
  return (
    <>
    <Toaster/>
     <Navbar/>
      <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/login"} element={<Loginpage />} />
          <Route path={"/signup"} element={<Signuppage />} />
          <Route path={"/addbook"} element={<Addbook />} />
    </Routes>
   
    </>
  )
}

export default App
