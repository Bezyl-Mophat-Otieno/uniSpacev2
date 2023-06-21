import React from 'react'
import Link from 'next/link'

function AdminNav() {
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;">
  <div className="container-fluid">
    <Link  className="navbar-brand fw-bolder" href="/">uniSpace</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/admin/booking-management">Booking Management</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/admin/club-management">Club Management</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Venue Management
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" href="/admin/venue-management/addVenue">Add Venue</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" href="/admin/venue-management/venues">View Venues</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled" href={'#'}>Reports and Analytics</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

      
    </div>
  )
}

export default AdminNav
