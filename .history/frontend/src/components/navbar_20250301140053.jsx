import { React } from 'react'
import { Link } from "react-router"
import { useAuthStore } from '../store/authStore'


const Navbar = () => {
    const { user } = useAuthStore();
    console.log("User:", user);

    return (
        <nav className="bg-[#252422] flex justify-between items-center text-[#FFFCF2] px-4 md:px-12 py-4 md:py-6 ">
            <Link to={"/"}>
                <label className="font-semibold tracking-wider md:text-lg lg:text-xl cursor-pointer">FavLib</label>
            </Link>

            {user ? (
                <div className="flex items-center space-x-5 md:text-lg">
                    <Link to={"/add-book"}>Add Book
                        <p>Add Book</p>
                    </Link>

                    <p>Logout({user.username})</p>
                </div>
            ) : (
                <div className="flex items-center space-x-5 md:text-lg">
                    <Link to={"/addbook"}>Add Book</Link>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/signup"}>
                        <button className="bg-[#403D39] px-3 py-2">Sign up</button></Link>
                </div>
            )}
        </nav>

    )
}

export default Navbar