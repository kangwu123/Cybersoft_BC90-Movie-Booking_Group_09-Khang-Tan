import React from 'react'

const PageNotFound = () => {
  return (
   <div className="not-found-container">
      <div className="star-background"></div> {/* For the stars */}
      <h1 className="oops-message">OOPS! LOOKS LIKE YOU'RE ACESS THIS PAGE NOT HAVE EXISTS !</h1>
      <div className="error-code-container">
        <span className="number">4</span>
        <div className="astronaut-container">
          <div className="astronaut"></div>
        </div>
        <span className="number">4</span>
      </div>
      <p className="location-message">THE LOCATION PAGE COULDN'T BE FOUND</p>
      <button className="back-button">BACK TO HOME PAGE</button>
    </div>
  )
}

export default PageNotFound