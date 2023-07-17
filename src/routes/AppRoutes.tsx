import React from 'react'
import { Routes, Route } from 'react-router-dom'
import pageRoutes from './pageRoutes'
import NoPageFound from '../presentation/screens/NoPageFound'
import Auth from '../presentation/screens/Auth'
import Home from '../presentation/screens/Home'

const AppRoutes= () => {
  return (
    <Routes>
      <Route path={pageRoutes.AUTH} element={<Auth />} />
      <Route path={pageRoutes.HOME} element={<Home />} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  )
}

export default AppRoutes