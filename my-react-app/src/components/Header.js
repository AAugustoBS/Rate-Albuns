import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
const Header = () => {
    const location = useLocation();
    const { token, userName, logout } = useAuth();
    const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register';
    return (
        <header>
            <div id="header-div" className="flex flex-row bg-black h-14 items-center">
                <div className="basis-1/4 text-white"><Link to="/"><h1>Rate Albuns</h1></Link></div>
                <nav className="basis-1/4 ">
                    <ul className="flex gap-12 ">
                        <li className="text-white text-lg "><a className="text-white text-center hover:text-gray-700" href="/about">Artists</a></li>
                        <li className="text-white text-lg"><a className="text-white hover:text-gray-700" href="/contact">Albuns</a></li>
                    </ul>
                </nav>
                <nav className="basis-1/4 ">
                    <div class="relative p-3  rounded-lg w-full max-w-lg">
                        <input type="text" class="rounded-md p-3 w-full" placeholder="Search albuns, artists, songs" />

                        <button type="submit" class="absolute right-6 top-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>

                    </div>
                </nav>
                <nav className="basis-1/4 ">
                    <div className="flex gap-4 justify-end">
                            {!isLoginOrRegisterPage ? (
                                <>
                                    {token ? (
                                        <div className="text-white">Welcome, {userName} 
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
                                            Logout
                                        </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Link to="/register">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Register
                                                </button>
                                            </Link>
                                            <Link to="/login">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    <a href="/login">Login</a>
                                                </button>
                                            </Link>
                                        </>
                                    )}
                                </>
                            ) : null}
                            
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;