import React from 'react'
import Link from 'next/link'

function Alert({message,color , url }) {
  return (
    <div className='d-flex'>
            <div className={` alert ${color} alert-dismissible text-center fw-bold fade show justify-content-center w-100`} role="alert">
             {message}
             <Link className='text-decoration-none' href={url ===undefined ? "#":url }>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" ></button>
             </Link> 
            </div>
      
    </div>
  )
}

export default Alert
