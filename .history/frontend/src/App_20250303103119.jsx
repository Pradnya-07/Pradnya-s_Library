import { Route, Routes } from "react-router"
import { useState, useEffect } from 'react'
import Homepage from './pages/homepage'
import Loginpage from './pages/login'
import Signuppage from './pages/signup'
import Navbar from "./components/navbar"
import Addbook from "./pages/addbook"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore";
import RedirectAuthenticatedUser from "./providers/RedirectAuthenticatedUsers"
import RedirectUnauthenticatedUser from "./providers/RedirectUnauthenticatedUsers"
import Footer from "./components/footer"

function App() {

  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<RedirectAuthenticatedUser>
          <Loginpage />
        </RedirectAuthenticatedUser>} />
        <Route path={"/signup"} element={<RedirectAuthenticatedUser>
          <Signuppage />
        </RedirectAuthenticatedUser>} />
        <Route path={"/add-book"} element={<RedirectUnauthenticatedUser>
          <Addbook />
        </RedirectUnauthenticatedUser>} />
        <Route path="/search" element={<searchpage />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
