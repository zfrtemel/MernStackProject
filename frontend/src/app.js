import React from 'react'
import './index.css'
import { Dashboard } from './Pages/Dashboard'
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const App = () => {
    return (
        <Router>
            <div className='flex flex-col mx-48'>
                {/* <Header /> */}
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </Router>
    )
}
