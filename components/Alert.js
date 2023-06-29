import React from 'react'
import Link from 'next/link'

function Alert({message,color , url , action }) {
  return (
    <div className='d-flex'>
            <div className={` alert ${color} alert-dismissible text-center  fade show justify-content-center w-100`} role="alert">
             {message}
             <Link className='text-decoration-none' href={url ===undefined ? "#":url } passHref >
            <button type="button" className="btn-close" onClick={ action ===undefined ? ()=>{} : ()=>action(false)} data-bs-dismiss="alert" aria-label="Close" ></button>
             </Link> 
            </div>
      
    </div>
  )
}

export default Alert
