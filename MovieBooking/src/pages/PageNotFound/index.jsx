import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate(); // Initialize the hook
  const handleHomeClick = () => {
    navigate('/'); // Navigates to the root/home path
  };
  return (
   <div className="not-found-container">
      <div className="star-background"></div> {/* For the stars */}
      <h1 className="oops-message">Oops! Page Not Found</h1>
      <div className="error-code-container">
        <span className="number">4</span>
        <div className="astronaut-container">
          <div className="astronaut"></div>
        </div>
        <span className="number">4</span>
      </div>
      <p className="location-message">The Page couldn't be found or Not Exists</p>
     <button className="back-button" onClick={handleHomeClick}>Back to Home Page</button>
    </div>
  )
}

export default PageNotFound