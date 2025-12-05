import React from 'react'
import { Outlet } from 'react-router-dom'

const Settings = () => {
  return (
    /* 
        - Manage system settings(e.g.,e.g., notification preferences, security settings)
        - Update user profile information (e.g., update profile picture, change username, change email)
        - Manage system notifications (e.g., enable/disable email notifications)
        - Manage movie Cinema Logo (e.g., upload new logo, change logo size, delete logo, ex: Lotte,BHD,CGV,Megastar,...)
        - Add new Location in google map (e.g., add new cinema location, change location name, delete location)
    */
    <div className="pt-0.5">
        <h1 className="text-3xl font-bold text-black dark:text-amber-600 mb-6">Settings</h1>
        <Outlet />   
    </div>
  )
}

export default Settings