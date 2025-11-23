import React from 'react'
import HomeHeader from "./_components/Header/index.jsx";
import Footer from "./_components/Footer/index.jsx";
import { Outlet } from 'react-router-dom'
const HomeTemplate = () => {
  return (
    <div>
      <HomeHeader />

      <div className="pt-3">
        <Outlet />
      </div>

      <Footer />
    </div>

  )
}

export default HomeTemplate