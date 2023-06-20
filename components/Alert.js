import React from 'react'

function Alert({message,color}) {
  return (
    <div className='d-flex'>
            <div className={` alert ${color} alert-dismissible text-center fw-bold fade show justify-content-center w-100`} role="alert">
             {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
      
    </div>
  )
}

export default Alert
