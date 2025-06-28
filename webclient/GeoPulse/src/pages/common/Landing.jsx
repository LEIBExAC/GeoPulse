import React from 'react'
import Header from '../../components/layout/Header'

export default function Landing() {
  return (
    <>
      <div>
        <Header></Header>
        <div className="container">
          <h1>Welcome to GeoPulse</h1>
          <p>Your one-stop solution for geospatial data visualization and analysis.</p>
          <p>Explore our features and get started with your geospatial projects today!</p>
          </div>
      </div>
    </>
  )
}
